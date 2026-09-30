import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const baseUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 - Nova Class
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await dContext.newPage();
  await dPage.goto(`${baseUrl}/projects/nova-class`, { waitUntil: "networkidle" });
  await dPage.waitForTimeout(600);
  await dPage.screenshot({ path: path.join(artifactDir, "phase-07-nova-desktop-1440x900.png") });

  // 2. Mobile 390x844 - Nova Class
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mContext.newPage();
  await mPage.goto(`${baseUrl}/projects/nova-class`, { waitUntil: "networkidle" });
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(artifactDir, "phase-07-nova-mobile-390x844.png") });

  // 3. Desktop 1440x900 - Materna (safety notice above fold)
  await dPage.goto(`${baseUrl}/projects/materna`, { waitUntil: "networkidle" });
  await dPage.waitForTimeout(600);
  await dPage.screenshot({ path: path.join(artifactDir, "phase-07-materna-desktop-1440x900.png") });

  // 4. Mobile 390x844 - Materna (safety notice above fold)
  await mPage.goto(`${baseUrl}/projects/materna`, { waitUntil: "networkidle" });
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(artifactDir, "phase-07-materna-mobile-390x844.png") });

  await dContext.close();
  await mContext.close();
  await browser.close();
  console.log("Phase 7 screenshots captured successfully.");
  process.exit(0);
}

main().catch(console.error);
