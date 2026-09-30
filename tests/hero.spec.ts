import { test, expect } from "@playwright/test";

test.describe("Phase 3 — Hero Section", () => {
  test("Test 1: Home loads, hero text is visible immediately", async ({ page }) => {
    await page.goto("/");

    // Verify H1 and exact name
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText("MOHAMMED ABDUL RAHIM");

    // Verify CTAs
    const exploreBtn = page.locator("a[href='#work']", { hasText: "EXPLORE MY WORK" });
    await expect(exploreBtn).toBeVisible();

    const buildBtn = page.locator("a[href='#contact']", { hasText: "LET'S BUILD" });
    await expect(buildBtn).toBeVisible();

    // Verify What I Build strip
    const chip = page.locator("text=AI-POWERED PRODUCTS");
    await expect(chip).toBeVisible();
  });

  test("Test 14: 320px viewport has no horizontal scroll and name does not overflow", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");

    // Verify H1 visibility and bounding box
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const h1Box = await h1.boundingBox();
    expect(h1Box).not.toBeNull();
    if (h1Box) {
      expect(h1Box.width).toBeLessThanOrEqual(320);
    }

    // Verify no horizontal document scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px rounding
  });
});
