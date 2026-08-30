import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const output = path.resolve("documentation/previews");
const origin = process.env.PREVIEW_ORIGIN ?? "http://127.0.0.1:3000";
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

const goto = async (route) => {
  const response = await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
  if (!response?.ok()) throw new Error(`${route} returned ${response?.status()}`);
  await page.waitForTimeout(350);
};

const loadPageImages = async () => {
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += window.innerHeight * 0.75) {
      window.scrollTo({ top, behavior: "instant" });
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(250);
};

await goto("/design-system/");
const componentIds = [
  "header-navigation",
  "button",
  "typography",
  "color-tokens",
  "icon",
  "image",
  "heritage-card",
  "navigation-item",
  "search-form",
  "heritage-grid",
];

for (const id of componentIds) {
  const locator = page.locator(`[data-doc-component="${id}"]`);
  if ((await locator.count()) !== 1) {
    throw new Error(`Expected one ${id} preview, found ${await locator.count()}`);
  }
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: path.join(output, `${id}.png`) });
}

for (const [route, name] of [
  ["/", "home"],
  ["/heritage/", "heritage"],
  ["/about/", "about"],
]) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto(route);
  await loadPageImages();
  await page.screenshot({ path: path.join(output, `${name}-desktop.png`), fullPage: true });
}

await page.setViewportSize({ width: 390, height: 844 });
await goto("/");
await loadPageImages();
await page.screenshot({ path: path.join(output, "home-mobile.png"), fullPage: true });

const menuButton = page.getByRole("button", { name: /open navigation/i });
await menuButton.click();
await page.locator('#site-navigation[data-open="true"]').waitFor({ timeout: 2000 });
const firstMenuLink = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link").first();
if (!(await firstMenuLink.evaluate((element) => element === document.activeElement))) {
  throw new Error("Opening navigation did not move focus into the menu");
}
await page.keyboard.press("Escape");
if ((await page.locator("#site-navigation").getAttribute("data-open")) !== "false") {
  throw new Error("Escape did not close mobile navigation");
}

await goto("/heritage/");
const input = page.getByRole("searchbox", { name: /search/i });
await input.fill("BOLINAO");
if ((await page.locator("article").count()) !== 4) {
  throw new Error("Case-insensitive Bolinao search did not return four records");
}
await input.fill("not-a-place");
if (!(await page.getByText(/No heritage places match/i).isVisible())) {
  throw new Error("No-result state did not appear");
}
await page.getByRole("button", { name: "Clear filters" }).click();
if ((await page.locator("article").count()) !== 12) {
  throw new Error("Clearing search did not restore the first 12 records");
}
await page.screenshot({ path: path.join(output, "heritage-mobile.png"), fullPage: true });

await page.emulateMedia({ reducedMotion: "reduce" });
await goto("/");
if ((await page.locator("[data-reveal]").first().evaluate((element) => getComputedStyle(element).opacity)) !== "1") {
  throw new Error("Reduced-motion content is not immediately visible");
}

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ["/", "/heritage/", "/about/"]) {
    await goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    if (overflow) throw new Error(`Horizontal overflow detected on ${route} at ${width}px`);
  }
}

await browser.close();
if (consoleErrors.length) throw new Error(`Console errors:\n${consoleErrors.join("\n")}`);
console.log("Component previews and responsive interaction checks completed.");
