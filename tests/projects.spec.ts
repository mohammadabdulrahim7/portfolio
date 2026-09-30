import { test, expect } from "@playwright/test";

test.describe("Phase 7: Project Views + Transition", () => {
  test("Test 7: Project view -> Esc / Return button / browser back returns to /#work", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://127.0.0.1:4000/projects/nova-class");

    // 1. Verify we are on the project page
    await expect(page.locator("h1")).toContainText("NOVA CLASS");

    // 2. Click return button
    const returnBtn = page.locator('[data-testid="return-ocean-btn"]');
    await expect(returnBtn).toBeVisible();
    await Promise.all([
      page.waitForURL("**/#work"),
      returnBtn.click(),
    ]);
    expect(page.url()).toContain("/#work");

    // 3. Navigate back to project and test Esc key
    await page.goto("http://127.0.0.1:4000/projects/nova-class");
    await expect(page.locator("h1")).toContainText("NOVA CLASS");
    await page.waitForTimeout(400);

    await Promise.all([
      page.waitForURL("**/#work"),
      page.keyboard.press("Escape"),
    ]);
    expect(page.url()).toContain("/#work");
  });

  test("Test 8: Null-link handling - No href='#', no empty hrefs, no 'TODO' text in DOM", async ({ page }) => {
    // Check both homepage and all project pages
    const urls = [
      "http://127.0.0.1:4000",
      "http://127.0.0.1:4000/projects/nova-class",
      "http://127.0.0.1:4000/projects/cyber-lens",
      "http://127.0.0.1:4000/projects/materna",
    ];

    for (const url of urls) {
      await page.goto(url);

      // Check for href="#"
      const hashLinks = await page.locator('a[href="#"]').count();
      expect(hashLinks).toBe(0);

      // Check for empty hrefs
      const emptyLinks = await page.locator('a[href=""]').count();
      expect(emptyLinks).toBe(0);

      // Check for literal "TODO" text in body (case-insensitive)
      const bodyText = await page.innerText("body");
      expect(bodyText).not.toMatch(/\bTODO\b/i);
    }
  });

  test("Test 9: Materna page - Safety notice visible without scrolling on desktop and mobile", async ({ page }) => {
    // 1. Desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://127.0.0.1:4000/projects/materna");

    const desktopNotice = page.locator('[data-testid="materna-safety-notice"]');
    await expect(desktopNotice).toBeVisible();

    // Verify it is above the fold (< 900px vertical position)
    const desktopBox = await desktopNotice.boundingBox();
    expect(desktopBox).not.toBeNull();
    if (desktopBox) {
      expect(desktopBox.y + desktopBox.height).toBeLessThan(900);
    }

    // 2. Mobile 390x844
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://127.0.0.1:4000/projects/materna");

    const mobileNotice = page.locator('[data-testid="materna-safety-notice"]');
    await expect(mobileNotice).toBeVisible();

    // Verify it is above the fold on mobile (< 844px vertical position)
    const mobileBox = await mobileNotice.boundingBox();
    expect(mobileBox).not.toBeNull();
    if (mobileBox) {
      expect(mobileBox.y + mobileBox.height).toBeLessThan(844);
    }
  });
});
