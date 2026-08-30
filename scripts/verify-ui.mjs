import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const output = path.resolve("tmp/ui-verification");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage({
  colorScheme: "light",
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
  viewport: { width: 1440, height: 1000 },
});

const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

const routes = [
  "/",
  "/heritage/",
  "/about/",
  "/heritage/hundred-island/",
  "/heritage/alaminos-city-hall/",
];
const screenshots = [
  ["/", "home"],
  ["/heritage/", "heritage"],
  ["/about/", "about"],
  ["/heritage/hundred-island/", "detail-image"],
  ["/heritage/alaminos-city-hall/", "detail-text"],
];
const viewports = [
  { width: 320, height: 760 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  await page.setViewportSize(viewport);
  for (const route of routes) {
    const response = await page.goto(`http://127.0.0.1:3000${route}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(250);
    if (!response?.ok()) throw new Error(`${route} returned ${response?.status()}`);
    const overflow = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    if (overflow.scroll > overflow.client) {
      throw new Error(`${route} overflows at ${viewport.width}px: ${overflow.scroll}px`);
    }
  }
}

for (const [route, name] of screenshots) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += window.innerHeight * 0.75) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(output, `${name}-desktop.png`), fullPage: true });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(500);
await page.evaluate(async () => {
  for (let top = 0; top < document.documentElement.scrollHeight; top += 350) {
    window.scrollTo({ top, behavior: "instant" });
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
});
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(output, "home-mobile.png"), fullPage: true });

await page.goto("http://127.0.0.1:3000/heritage/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(500);
const search = page.getByRole("searchbox", { name: /search/i });
await search.fill("Bolinao");
if ((await page.locator("article").count()) !== 4) {
  throw new Error("Bolinao search should return four records");
}
await search.fill("not-a-place");
await page.getByRole("button", { name: "Clear filters" }).click();
if ((await page.locator("article").count()) !== 12) {
  throw new Error("Clearing search should restore the first 12 records");
}

await page.getByRole("button", { name: "Natural Heritage", exact: true }).click();
const naturalCount = await page.locator("article").count();
if (naturalCount < 1 || naturalCount >= 12) {
  throw new Error("Natural Heritage filter did not narrow the collection");
}
await page.getByRole("button", { name: "All", exact: true }).click();

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(300);
await page.getByRole("button", { name: /open navigation/i }).click();
await page.waitForTimeout(250);
const firstMenuLink = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link").first();
if (!(await firstMenuLink.evaluate((element) => element === document.activeElement))) {
  throw new Error("Opening the mobile navigation did not move focus into the dialog");
}
await page.keyboard.press("Escape");
if ((await page.locator("#site-navigation").getAttribute("data-open")) !== "false") {
  throw new Error("Escape did not close the mobile navigation");
}

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(250);
if ((await page.locator("[data-reveal]").first().evaluate((element) => getComputedStyle(element).opacity)) !== "1") {
  throw new Error("Reduced motion did not leave reveal content visible");
}
await page.emulateMedia({ reducedMotion: "no-preference" });

await browser.close();
if (consoleErrors.length) throw new Error(`Console errors:\n${consoleErrors.join("\n")}`);
console.log("UI verification completed without route, overflow, interaction, or console errors.");
