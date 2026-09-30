import { chromium } from "@playwright/test";
import path from "path";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const baseUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // Reduced motion context (Tier 0 static ocean fallback)
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(baseUrl, { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(600);
  await rmPage.screenshot({ path: path.join(artifactDir, "phase-12-reduced-motion-fallback.png") });

  await rmContext.close();
  await browser.close();
  console.log("Phase 12 reduced motion screenshot captured successfully.");
  process.exit(0);
}

main().catch(console.error);
