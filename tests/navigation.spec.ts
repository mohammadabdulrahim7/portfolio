import { test, expect } from "@playwright/test";

test.describe("Phase 2 — Navigation System", () => {
  test("Test 2: Desktop nav anchors scroll and update active indicator", async ({ page }) => {
    // Only run on desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();

    const sections = ["work", "skills", "journey", "contact"];
    for (const sectionId of sections) {
      const link = nav.locator(`a[href="/#${sectionId}"]`);
      await expect(link).toBeVisible();
      await link.click();

      // Verify that the target section is in the viewport
      const sectionEl = page.locator(`#${sectionId}`);
      await expect(sectionEl).toBeInViewport({ timeout: 5000 });

      // Verify active indicator or aria-current
      await expect(link).toHaveAttribute("aria-current", "true");
    }
  });

  test("Test 3: Mobile bottom nav has 5 items with >= 48px touch targets and navigates", async ({ page }) => {
    // Only run on mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const mobileNav = page.locator("nav[aria-label='Mobile Navigation']");
    await expect(mobileNav).toBeVisible();

    const items = mobileNav.locator("a");
    await expect(items).toHaveCount(5);

    // Verify touch target sizes >= 48px
    for (let i = 0; i < 5; i++) {
      const item = items.nth(i);
      const box = await item.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(48);
        expect(box.height).toBeGreaterThanOrEqual(48);
      }
    }

    // Verify navigation on mobile
    const workLink = items.nth(1); // WORK
    await workLink.click();
    const workSection = page.locator("#work");
    await expect(workSection).toBeInViewport({ timeout: 5000 });
  });

  test("Project route displays Return to Ocean in navbar", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/projects/nova-class");

    const returnLink = page.locator("header nav a", { hasText: "RETURN TO OCEAN" });
    await expect(returnLink).toBeVisible();
  });
});
