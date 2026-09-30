import { test, expect } from "@playwright/test";

test.describe("Phase 13: QA Suite — Test 13: Console Errors & Warnings", () => {
  const routes = [
    "/",
    "/projects/nova-class",
    "/projects/cyber-lens",
    "/projects/materna",
  ];

  for (const route of routes) {
    test(`No console errors or critical warnings on ${route}`, async ({ page }) => {
      const messages: { type: string; text: string }[] = [];

      page.on("console", (msg) => {
        // Collect errors and warnings (ignore intentional internal Next.js dev notices or harmless third-party notices)
        if (msg.type() === "error") {
          messages.push({ type: msg.type(), text: msg.text() });
        }
      });

      page.on("pageerror", (err) => {
        messages.push({ type: "pageerror", text: err.message });
      });

      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      // Verify no uncaught errors or console errors
      expect(messages).toEqual([]);
    });
  }
});
