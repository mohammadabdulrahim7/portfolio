import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const targetUrl = "http://localhost:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 (Ocean Stage rendering)
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await dContext.newPage();
  await dPage.goto(targetUrl, { waitUntil: "networkidle" });
  await dPage.waitForTimeout(1000); // Allow R3F idle load
  await dPage.screenshot({ path: path.join(artifactDir, "phase-04-desktop-1440x900.png") });
  await dContext.close();

  // 2. Mobile 390x844
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mContext.newPage();
  await mPage.goto(targetUrl, { waitUntil: "networkidle" });
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(artifactDir, "phase-04-mobile-390x844.png") });
  await mContext.close();

  await browser.close();
  console.log("Phase 4 screenshots captured.");
  process.exit(0);
}

main().catch(console.error);
