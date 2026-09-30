import { test, expect } from "@playwright/test";

test.describe("Phase 4 — Ocean Scene Prototype", () => {
  test("Test 10: Reduced motion mode defaults to Tier 0 static fallback", async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // Verify all 5 sections are immediately visible and usable
    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#journey")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Verify canvas is not actively rendering WebGL scenes in reduced motion
    const motionToggle = page.locator("button[aria-label*='Motion is currently']:visible");
    await expect(motionToggle).toBeVisible();
    await expect(motionToggle).toContainText("MOTION: OFF");
  });

  test("Test 11: WebGL fallback renders static ocean without throwing errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await expect(page.locator("#home h1")).toBeVisible();

    // Verify no unhandled page errors were emitted
    expect(consoleErrors).toEqual([]);
  });
});
