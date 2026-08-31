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

const captureContext = async (name, locators, padding = 20) => {
  const items = Array.isArray(locators) ? locators : [locators];
  const boxes = [];
  for (const locator of items) {
    if ((await locator.count()) !== 1) {
      throw new Error(`Expected one locator for ${name}, found ${await locator.count()}`);
    }
    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();
    if (!box) throw new Error(`Could not measure ${name}`);
    boxes.push(box);
  }

  const documentSize = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
  }));
  const left = Math.max(0, Math.min(...boxes.map((box) => box.x)) - padding);
  const top = Math.max(0, Math.min(...boxes.map((box) => box.y)) - padding);
  const right = Math.min(documentSize.width, Math.max(...boxes.map((box) => box.x + box.width)) + padding);
  const bottom = Math.min(documentSize.height, Math.max(...boxes.map((box) => box.y + box.height)) + padding);

  await page.screenshot({
    animations: "disabled",
    path: path.join(output, `${name}.png`),
    clip: { x: left, y: top, width: right - left, height: bottom - top },
  });
};

// Every manual preview below is captured from a real production route and from
// the exact place where the documented component is used.
await goto("/heritage/");
await loadPageImages();

const archiveHeading = page.getByRole("heading", { name: /Places that carry our stories/i });
const searchForm = page.locator('[data-doc-component="search-form"]');
const categoryFilter = page.locator('[role="group"][aria-label="Filter by heritage class"]');
const firstCard = page.locator("article").first();
const thirdCard = page.locator("article").nth(2);

await captureContext(
  "header-navigation",
  [page.locator('[data-doc-component="header-navigation"]'), archiveHeading.locator("xpath=..")],
  0,
);
await captureContext("typography", archiveHeading.locator("xpath=.."), 28);
await captureContext("search-form", searchForm, 24);
await captureContext("category-filter", categoryFilter, 24);
await captureContext("heritage-card", firstCard, 18);
await captureContext("heritage-grid", [searchForm.locator("xpath=.."), firstCard, thirdCard], 24);

await goto("/");
await loadPageImages();

const primaryCta = page.getByRole("link", { name: /Explore Pangasinan Heritage/i });
const lighthouseHeading = page.getByRole("heading", { name: /Cape Bolinao Lighthouse/i });
const experienceTrack = page.locator('[aria-label="Ways to experience Pangasinan"]');
const cinematicHero = page.locator('section[aria-label="Welcome to Pangasinan"]');
const experienceSection = page.locator('section[aria-labelledby="experiences-heading"]');
const siteFooter = page.locator("footer");
const footerDiscoverLinks = siteFooter.getByRole("heading", { name: "DISCOVER" }).locator("xpath=..");

await captureContext("button", primaryCta.locator("xpath=.."), 28);
await captureContext("icon", experienceTrack.locator("xpath=.."), 20);
await captureContext("image", lighthouseHeading.locator("xpath=../.."), 0);
await captureContext("cinematic-hero", cinematicHero, 0);
await captureContext("experience-carousel", experienceSection, 0);
await captureContext("site-footer", siteFooter, 0);
await captureContext("transition-link", footerDiscoverLinks, 24);

// Capture the real route-transition curtain while a production navigation link
// is changing from the home route to the heritage archive.
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page
  .locator('header nav[aria-label="Primary navigation"]')
  .getByRole("link", { name: "Heritage", exact: true })
  .click({ noWaitAfter: true });
await page.locator('[data-phase="covering"]').waitFor({ timeout: 2000 });
await page.waitForTimeout(230);
await page.screenshot({
  animations: "allow",
  path: path.join(output, "motion-provider.png"),
});
await page.waitForTimeout(900);

await goto("/heritage/hundred-island/");
await loadPageImages();
const relatedSection = page.getByText("Continue Exploring", { exact: true }).locator("xpath=../..");
await captureContext("related-heritage", relatedSection, 0);

await goto("/about/");
await loadPageImages();
const classificationSection = page.getByText("HERITAGE CLASSIFICATIONS", { exact: true }).locator("xpath=..");
await captureContext("color-tokens", classificationSection, 0);

await page.setViewportSize({ width: 900, height: 900 });
await goto("/heritage/");
await page.getByRole("button", { name: /open navigation/i }).click();
await page.locator('#site-navigation[data-open="true"]').waitFor({ timeout: 2000 });
await captureContext(
  "navigation-item",
  page.locator('#site-navigation nav[aria-label="Primary navigation"]'),
  24,
);

for (const [route, name] of [
  ["/", "home"],
  ["/heritage/", "heritage"],
  ["/about/", "about"],
]) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto(route);
  await loadPageImages();
  await page.screenshot({ path: path.join(output, `${name}-desktop-viewport.png`) });
  await page.screenshot({ path: path.join(output, `${name}-desktop.png`), fullPage: true });
}

await page.setViewportSize({ width: 390, height: 844 });
await goto("/");
await loadPageImages();
await page.screenshot({ path: path.join(output, "home-mobile-viewport.png") });
await page.screenshot({ path: path.join(output, "home-mobile.png"), fullPage: true });

const menuButton = page.getByRole("button", { name: /open navigation/i });
await menuButton.click();
await page.locator('#site-navigation[data-open="true"]').waitFor({ timeout: 2000 });
await page.waitForTimeout(250);
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
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({ path: path.join(output, "heritage-mobile-viewport.png") });
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
