import { test, expect } from "@playwright/test";

test.describe("Foundation Smoke Tests", () => {
  test("home page loads and displays hero header", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("MOHAMMED ABDUL RAHIM");
  });

  test("skip link exists and points to #main", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator("a[href='#main']");
    await expect(skipLink).toBeAttached();
  });

  test("project dynamic route renders successfully", async ({ page }) => {
    await page.goto("/projects/nova-class");
    await expect(page.locator("h1")).toContainText("NOVA CLASS");
  });
});
