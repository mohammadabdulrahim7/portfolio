import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const targetUrl = "http://localhost:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(targetUrl, { waitUntil: "networkidle" });
  const desktopPath = path.join(artifactDir, "phase-01-desktop-1440x900.png");
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log(`Desktop screenshot saved to: ${desktopPath}`);

  // 1b. Desktop Full Page
  const desktopFullPath = path.join(artifactDir, "phase-01-desktop-fullpage.png");
  await desktopPage.screenshot({ path: desktopFullPath, fullPage: true });
  console.log(`Desktop full page saved to: ${desktopFullPath}`);
  await desktopContext.close();

  // 2. Mobile 390x844
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  const mobilePath = path.join(artifactDir, "phase-01-mobile-390x844.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: false });
  console.log(`Mobile screenshot saved to: ${mobilePath}`);

  // 2b. Mobile Full Page
  const mobileFullPath = path.join(artifactDir, "phase-01-mobile-fullpage.png");
  await mobilePage.screenshot({ path: mobileFullPath, fullPage: true });
  console.log(`Mobile full page saved to: ${mobileFullPath}`);
  await mobileContext.close();

  await browser.close();
  console.log("Phase 1 screenshot capture complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
