import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const baseUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 - #skills
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await dContext.newPage();
  await dPage.goto(`${baseUrl}/#skills`, { waitUntil: "networkidle" });
  await dPage.locator("#skills-heading").scrollIntoViewIfNeeded();
  await dPage.waitForTimeout(800);
  await dPage.screenshot({ path: path.join(artifactDir, "phase-08-desktop-1440x900.png") });

  // 2. Mobile 390x844 - #skills
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mContext.newPage();
  await mPage.goto(`${baseUrl}/#skills`, { waitUntil: "networkidle" });
  await mPage.locator("#skills-heading").scrollIntoViewIfNeeded();
  await mPage.waitForTimeout(800);
  await mPage.screenshot({ path: path.join(artifactDir, "phase-08-mobile-390x844.png") });

  await dContext.close();
  await mContext.close();
  await browser.close();
  console.log("Phase 8 screenshots captured successfully.");
  process.exit(0);
}

main().catch(console.error);
