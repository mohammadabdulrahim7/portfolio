import { test, expect } from "@playwright/test";

test.describe("Phase 6: Icebergs + Interaction", () => {
  test("Test 4: Iceberg hover (desktop) reveals hologram or highlight with title", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://127.0.0.1:4000");

    // Scroll to #work section
    const workHeading = page.locator("#work-heading");
    await workHeading.scrollIntoViewIfNeeded();
    await expect(workHeading).toBeVisible();

    // Find visible iceberg card in desktop grid
    const novaCard = page.locator('[data-testid="iceberg-card-nova-class"]:visible');
    await expect(novaCard).toBeVisible();

    // Hover over the card
    await novaCard.hover();

    // Verify title and explore button are visible
    await expect(novaCard.getByRole("heading", { name: "NOVA CLASS" })).toBeVisible();
    const exploreBtn = novaCard.getByRole("link", { name: /EXPLORE PROJECT/i });
    await expect(exploreBtn).toBeVisible();
  });

  test("Test 5: Iceberg tap -> preview -> open (mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://127.0.0.1:4000");

    // Scroll to #work section
    const workHeading = page.locator("#work-heading");
    await workHeading.scrollIntoViewIfNeeded();

    // Find visible iceberg card in mobile snap rail
    const novaCard = page.locator('[data-testid="iceberg-card-nova-class"]:visible');
    await expect(novaCard).toBeVisible();

    // On mobile, tap to preview button should be present initially
    const previewTrigger = novaCard.getByRole("button", { name: /TAP TO PREVIEW/i });
    await expect(previewTrigger).toBeVisible();

    // Before tapping preview, open-project button is not rendered
    const openBtn = novaCard.locator('[data-testid="open-project-btn"]');
    await expect(openBtn).not.toBeVisible();

    // Tap preview trigger
    await previewTrigger.click();

    // Now preview is open and OPEN PROJECT button appears
    await expect(openBtn).toBeVisible();
    await expect(openBtn).toContainText("OPEN PROJECT");

    // Tapping OPEN PROJECT navigates to /projects/nova-class
    await Promise.all([
      page.waitForURL("**/projects/nova-class"),
      openBtn.click(),
    ]);

    expect(page.url()).toContain("/projects/nova-class");
  });

  test("Test 6: Keyboard: Tab to project link -> Enter opens project view", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://127.0.0.1:4000");

    // Scroll to #work section
    const workHeading = page.locator("#work-heading");
    await workHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Focus the first visible project link in the work section
    const firstProjectLink = page.locator('#work a[href="/projects/nova-class"]:visible').first();
    await firstProjectLink.focus();
    await expect(firstProjectLink).toBeFocused();

    // Press Enter to navigate
    await Promise.all([
      page.waitForURL("**/projects/nova-class"),
      page.keyboard.press("Enter"),
    ]);

    expect(page.url()).toContain("/projects/nova-class");
  });
});
