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

await page.goto("http://127.0.0.1:3000/design-system/", { waitUntil: "domcontentloaded" });

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
  await locator.screenshot({ path: path.join(output, `${id}.png`) });
}

await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
await page.locator('html[data-motion="ready"]').waitFor({ timeout: 5000 });
await page.locator('[data-phase="idle"]').waitFor({ timeout: 5000 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
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

const manifesto = page.locator("#province-story");
await manifesto.scrollIntoViewIfNeeded();
await page.waitForTimeout(750);
if ((await manifesto.getAttribute("data-visible")) !== "true") {
  throw new Error("Homepage scroll reveal did not activate");
}

const parallaxImage = page.locator("[data-parallax='42']");
const parallaxTop = await parallaxImage.evaluate((element) => window.scrollY + element.getBoundingClientRect().top - window.innerHeight * 0.65);
await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), parallaxTop);
await page.waitForTimeout(150);
const parallaxBefore = await parallaxImage.evaluate((element) => getComputedStyle(element).getPropertyValue("--parallax-y"));
await page.evaluate(() => window.scrollBy({ top: 280, behavior: "instant" }));
await page.waitForTimeout(150);
const parallaxAfter = await parallaxImage.evaluate((element) => getComputedStyle(element).getPropertyValue("--parallax-y"));
if (parallaxBefore === parallaxAfter) throw new Error("Homepage parallax value did not update");

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(150);
await page.evaluate(() => window.scrollTo({ top: 220, behavior: "instant" }));
await page.waitForTimeout(180);
if ((await page.locator("header").getAttribute("data-hidden")) !== "true") {
  throw new Error("Header did not hide while scrolling down");
}
await page.evaluate(() => window.scrollTo({ top: 100, behavior: "instant" }));
await page.waitForTimeout(180);
if ((await page.locator("header").getAttribute("data-hidden")) !== "false") {
  throw new Error("Header did not return while scrolling up");
}

const carousel = page.getByRole("region", { name: "Ways to experience Pangasinan" });
await carousel.scrollIntoViewIfNeeded();
const beforeScroll = await carousel.evaluate((element) => element.scrollLeft);
await page.getByRole("button", { name: "Next experience" }).click();
await page.waitForTimeout(700);
const afterScroll = await carousel.evaluate((element) => element.scrollLeft);
if (afterScroll <= beforeScroll) throw new Error("Experience carousel did not advance");
await carousel.focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(700);
if ((await carousel.locator('[data-active="true"]').getAttribute("data-active")) !== "true") {
  throw new Error("Experience carousel did not expose an active slide");
}
await page.getByRole("button", { name: "Next experience" }).click();
await page.waitForTimeout(700);
if (!(await page.getByRole("button", { name: "Next experience" }).isDisabled())) {
  throw new Error("Experience carousel did not stop at its final boundary");
}

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(180);
const desktopMenuButton = page.getByRole("button", { name: "Open navigation menu" });
await desktopMenuButton.click();
await page.waitForTimeout(750);
if ((await page.locator("#site-navigation").getAttribute("data-open")) !== "true") {
  throw new Error("Desktop navigation curtain did not open");
}
if ((await page.evaluate(() => document.body.style.overflow)) !== "hidden") {
  throw new Error("Opening navigation did not lock page scrolling");
}
const desktopMenuLinks = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link");
await desktopMenuLinks.last().focus();
if (!(await page.getByText("Pangasinan Provincial Capitol", { exact: true }).isVisible())) {
  throw new Error("Navigation preview did not change on focus");
}
await desktopMenuLinks.last().focus();
await page.keyboard.press("Tab");
if (!(await page.locator("#menu-toggle").evaluate((element) => element === document.activeElement))) {
  throw new Error("Navigation focus trap did not wrap to the menu toggle");
}
await page.keyboard.press("Escape");
await page.waitForTimeout(750);
if ((await page.locator("#site-navigation").getAttribute("data-open")) !== "false") {
  throw new Error("Desktop navigation did not close with Escape");
}

await page.getByRole("link", { name: "Explore places" }).click();
if ((await page.locator("[data-phase]").getAttribute("data-phase")) !== "covering") {
  throw new Error("Route transition curtain did not cover the page");
}
await page.waitForURL("**/heritage/", { timeout: 5000 });
await page.locator('[data-phase="idle"]').waitFor({ timeout: 5000 });

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
await page.reload({ waitUntil: "domcontentloaded" });
await page.locator('html[data-motion="ready"]').waitFor({ timeout: 5000 });
if ((await page.locator("[data-phase]").evaluate((element) => getComputedStyle(element).display)) !== "none") {
  throw new Error("Reduced motion did not disable the route curtain");
}
if ((await page.locator("[data-reveal]").first().evaluate((element) => getComputedStyle(element).opacity)) !== "1") {
  throw new Error("Reduced-motion content is not immediately visible");
}
await page.emulateMedia({ reducedMotion: "no-preference" });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded" });
await page.locator('html[data-motion="ready"]').waitFor({ timeout: 5000 });
await page.locator('[data-phase="idle"]').waitFor({ timeout: 5000 });
await page.screenshot({ path: path.join(output, "home-mobile.png") });
const menuButton = page.getByRole("button", { name: "Open navigation menu" });
await menuButton.click();
await page.locator('#site-navigation[data-open="true"]').waitFor({ timeout: 2000 });
if (!(await page.getByRole("navigation", { name: "Primary navigation" }).isVisible())) {
  throw new Error("Mobile navigation did not open");
}
await page.keyboard.press("Escape");
if (await page.getByRole("navigation", { name: "Primary navigation" }).isVisible()) {
  throw new Error("Mobile navigation did not close with Escape");
}

await page.goto("http://127.0.0.1:3000/heritage/", { waitUntil: "domcontentloaded" });
await page.locator('html[data-motion="ready"]').waitFor({ timeout: 5000 });
await page.locator('[data-phase="idle"]').waitFor({ timeout: 5000 });
const input = page.getByRole("searchbox", { name: "Search the collection" });
await input.fill("BOLINAO");
if ((await page.locator("[data-doc-component='heritage-grid'] article").count()) !== 2) {
  throw new Error("Case-insensitive Bolinao search did not return two cards");
}
const filteredReveal = page.locator("[data-doc-component='heritage-grid'] [data-reveal]").first();
await filteredReveal.scrollIntoViewIfNeeded();
await page.waitForTimeout(750);
if ((await filteredReveal.getAttribute("data-visible")) !== "true") {
  throw new Error("Filtered heritage cards were not registered for reveal motion");
}
if ((await filteredReveal.locator("[data-loaded]").getAttribute("data-loaded")) !== "true") {
  throw new Error("Filtered heritage card image did not finish loading");
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
  for (const route of ["/", "/heritage/"]) {
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) throw new Error(`Horizontal overflow detected on ${route} at ${width}px`);
  }
}

await browser.close();
console.log("Component previews and responsive interaction checks completed.");
