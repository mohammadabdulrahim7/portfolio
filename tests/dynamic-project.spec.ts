import { test, expect } from "@playwright/test";
import { projects } from "@/data/projects";
import sitemap from "@/app/sitemap";

test.describe("Phase 13: QA Suite — Test 15: Dynamic 4th Project Scalability", () => {
  test("Sitemap dynamically generates routes for all projects", () => {
    const map = sitemap();
    expect(map.length).toBe(projects.length + 1); // 1 home + N projects

    for (const project of projects) {
      const found = map.find((entry) => entry.url.includes(`/projects/${project.slug}`));
      expect(found).toBeDefined();
    }
  });

  test("Iceberg field and accessible list dynamically include all projects in data array", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work-heading").scrollIntoViewIfNeeded();

    // Verify all current projects appear in DOM list and cards
    for (const project of projects) {
      const card = page.locator(`[data-testid="iceberg-card-${project.slug}"]:visible`);
      await expect(card).toBeVisible();

      const listLink = page.locator(`#work a[href="/projects/${project.slug}"]:visible`).first();
      await expect(listLink).toBeVisible();
    }
  });
});
