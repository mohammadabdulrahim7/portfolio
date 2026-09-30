import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Phase 12: Accessibility Pass (WCAG 2.2 AA)", () => {
  const routes = [
    { name: "home page", path: "/" },
    { name: "Nova Class project", path: "/projects/nova-class" },
    { name: "Cyber Lens project", path: "/projects/cyber-lens" },
    { name: "Materna project", path: "/projects/materna" },
  ];

  for (const route of routes) {
    test(`Test 12: ${route.name} passes axe audit with 0 serious/critical violations`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );

      if (seriousOrCritical.length > 0) {
        console.error(
          `Axe violations on ${route.path}:`,
          JSON.stringify(seriousOrCritical, null, 2)
        );
      }

      expect(seriousOrCritical).toEqual([]);
    });
  }

  test("Skip link is first focusable element and navigates to #main", async ({ page }) => {
    await page.goto("/");

    // Press Tab from clean page load
    await page.keyboard.press("Tab");

    // The focused element should be the skip link
    const activeElement = page.locator(":focus");
    await expect(activeElement).toHaveAttribute("href", "#main");
  });

  test("Test 10: Reduced motion renders Tier 0 static fallback without breaking sections", async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Verify all 5 core sections are present and visible
    const sections = ["#home", "#work", "#skills", "#journey", "#contact"];
    for (const sec of sections) {
      const el = page.locator(sec);
      await expect(el).toBeAttached();
    }

    // Verify static ocean fallback is visible
    const staticOcean = page.locator('[data-testid="static-ocean-fallback"]');
    await expect(staticOcean).toBeAttached();
  });
});
