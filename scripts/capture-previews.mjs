import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const output = path.resolve("documentation/previews");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage({
  colorScheme: "light",
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
  viewport: { width: 1440, height: 1000 },
});

await page.goto("http://127.0.0.1:3000/design-system/", { waitUntil: "networkidle" });

const componentIds = [
  "button",
  "typography",
  "color-tokens",
  "icon",
  "image",
  "heritage-card",
  "navigation-item",
  "search-form",
  "heritage-grid",
  "header-navigation",
];

for (const id of componentIds) {
  const locator = page.locator(`[data-doc-component="${id}"]`);
  if ((await locator.count()) !== 1) {
    throw new Error(`Expected one ${id} preview, found ${await locator.count()}`);
  }
  await locator.screenshot({ path: path.join(output, `${id}.png`) });
}

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(output, "home-desktop.png") });

if (!(await page.locator("section[aria-label='Welcome to Pangasinan']").isVisible())) {
  throw new Error("Homepage hero is not visible");
}
if ((await page.locator("main > section").count()) !== 7) {
  throw new Error("Homepage editorial section structure is incomplete");
}
if ((await page.locator("section[aria-labelledby='experiences-heading'] a").count()) !== 4) {
  throw new Error("Experience collection did not render four cards");
}

await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" });
await page.emulateMedia({ reducedMotion: "no-preference" });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(output, "home-mobile.png") });
const menuButton = page.getByRole("button", { name: "Open navigation menu" });
await menuButton.click();
if (!(await page.getByRole("navigation", { name: "Primary navigation" }).isVisible())) {
  throw new Error("Mobile navigation did not open");
}
await page.keyboard.press("Escape");
if (await page.getByRole("navigation", { name: "Primary navigation" }).isVisible()) {
  throw new Error("Mobile navigation did not close with Escape");
}

await page.goto("http://127.0.0.1:3000/heritage/", { waitUntil: "networkidle" });
const input = page.getByRole("searchbox", { name: "Search the collection" });
await input.fill("BOLINAO");
if ((await page.locator("[data-doc-component='heritage-grid'] article").count()) !== 2) {
  throw new Error("Case-insensitive Bolinao search did not return two cards");
}
await input.fill("not-a-place");
if (!(await page.getByRole("heading", { name: "No destinations match “not-a-place”" }).isVisible())) {
  throw new Error("No-result state did not appear");
}
await page.getByRole("button", { name: "Clear search" }).click();
if ((await page.locator("[data-doc-component='heritage-grid'] article").count()) !== 6) {
  throw new Error("Clearing search did not restore all cards");
}
await page.screenshot({ path: path.join(output, "heritage-mobile.png"), fullPage: true });

for (const width of [320, 375, 430, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://127.0.0.1:3000/heritage/", { waitUntil: "domcontentloaded" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  if (overflow) throw new Error(`Horizontal overflow detected at ${width}px`);
}

await browser.close();
console.log("Component previews and responsive interaction checks completed.");
