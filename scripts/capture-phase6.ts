import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const targetUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 - scrolled to #work with iceberg hovered
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await dContext.newPage();
  await dPage.goto(targetUrl, { waitUntil: "networkidle" });
  await dPage.locator("#work-heading").scrollIntoViewIfNeeded();
  await dPage.waitForTimeout(800);

  // Hover over Nova Class iceberg card to show highlight & action
  const novaCard = dPage.locator('[data-testid="iceberg-card-nova-class"]:visible');
  await novaCard.hover();
  await dPage.waitForTimeout(500);

  await dPage.screenshot({ path: path.join(artifactDir, "phase-06-desktop-1440x900.png") });
  await dContext.close();

  // 2. Mobile 390x844 - scrolled to #work with preview opened
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mContext.newPage();
  await mPage.goto(targetUrl, { waitUntil: "networkidle" });
  await mPage.locator("#work-heading").scrollIntoViewIfNeeded();
  await mPage.waitForTimeout(800);

  // Tap preview trigger on mobile card
  const previewTrigger = mPage.locator('[data-testid="iceberg-card-nova-class"]:visible').getByRole("button", { name: /TAP TO PREVIEW/i });
  await previewTrigger.click();
  await mPage.waitForTimeout(500);

  await mPage.screenshot({ path: path.join(artifactDir, "phase-06-mobile-390x844.png") });
  await mContext.close();

  await browser.close();
  console.log("Phase 6 screenshots captured successfully.");
  process.exit(0);
}

main().catch(console.error);
