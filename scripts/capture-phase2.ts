import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const targetUrl = "http://localhost:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900 (Nav in action)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(targetUrl, { waitUntil: "networkidle" });
  await desktopPage.screenshot({
    path: path.join(artifactDir, "phase-02-desktop-1440x900.png"),
    fullPage: false,
  });
  await desktopContext.close();

  // 2. Mobile 390x844 (Bottom nav visible)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(targetUrl, { waitUntil: "networkidle" });
  await mobilePage.screenshot({
    path: path.join(artifactDir, "phase-02-mobile-390x844.png"),
    fullPage: false,
  });
  await mobileContext.close();

  await browser.close();
  console.log("Phase 2 screenshots saved.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
