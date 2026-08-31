import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const output = path.resolve("tmp/ui-verification");
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
    const response = await page.goto(`${origin}${route}`, {
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
  await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
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

for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const carousel = page.locator('[aria-label="Ways to experience Pangasinan"]');
  const previous = page.getByRole("button", { name: "Previous experience" });
  const next = page.getByRole("button", { name: "Next experience" });
  await carousel.scrollIntoViewIfNeeded();
  const forwardPositions = [await carousel.evaluate((element) => element.scrollLeft)];
  let steps = 0;

  while (!(await next.isDisabled()) && steps < 6) {
    await next.click();
    await page.waitForTimeout(850);
    const position = await carousel.evaluate((element) => element.scrollLeft);
    if (position <= forwardPositions.at(-1) + 20) {
      throw new Error(`Carousel next control made only a tiny movement at ${width}px`);
    }
    forwardPositions.push(position);
    steps += 1;
  }

  if (steps < 1 || !(await next.isDisabled())) {
    throw new Error(`Carousel did not reach a stable final stop at ${width}px`);
  }

  const finalPosition = forwardPositions.at(-1);
  await previous.click();
  await page.waitForTimeout(850);
  const backwardPosition = await carousel.evaluate((element) => element.scrollLeft);
  if (backwardPosition >= finalPosition - 20) {
    throw new Error(`Carousel previous control made only a tiny movement at ${width}px`);
  }
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
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

await page.goto(`${origin}/heritage/`, { waitUntil: "domcontentloaded" });
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

const showMore = page.getByRole("button", { name: /show more/i });
while (await showMore.isVisible().catch(() => false)) {
  await showMore.click();
}
if ((await page.locator("article").count()) !== 41) {
  throw new Error("The complete heritage collection should render 41 cards");
}
if ((await page.locator("article img").count()) !== 41) {
  throw new Error("Every heritage card should contain a photograph");
}
await page.evaluate(async () => {
  for (let top = 0; top < document.documentElement.scrollHeight; top += window.innerHeight * 0.75) {
    window.scrollTo({ top, behavior: "instant" });
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
});
await page.waitForTimeout(500);
const brokenImages = await page.locator("article img").evaluateAll((images) =>
  images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.alt),
);
if (brokenImages.length) {
  throw new Error(`Heritage card images failed to load: ${brokenImages.join(", ")}`);
}

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

await page.getByRole("button", { name: /open navigation/i }).click();
await page.setViewportSize({ width: 1024, height: 900 });
await page.waitForTimeout(100);
if ((await page.locator("#site-navigation").getAttribute("data-open")) !== "false") {
  throw new Error("Crossing the desktop breakpoint did not close the mobile navigation");
}
if ((await page.evaluate(() => document.body.style.overflow)) === "hidden") {
  throw new Error("Crossing the desktop breakpoint left body scrolling locked");
}

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(250);
if ((await page.locator("[data-reveal]").first().evaluate((element) => getComputedStyle(element).opacity)) !== "1") {
  throw new Error("Reduced motion did not leave reveal content visible");
}
await page.emulateMedia({ reducedMotion: "no-preference" });

await browser.close();
if (consoleErrors.length) throw new Error(`Console errors:\n${consoleErrors.join("\n")}`);
console.log("UI verification completed without route, overflow, interaction, or console errors.");
