import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const baseUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Performance Audit
  const dContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await dContext.newPage();

  const startTime = Date.now();
  await dPage.goto(baseUrl, { waitUntil: "networkidle" });
  const dLoadTime = Date.now() - startTime;

  // Measure performance timing marks
  const dMetrics = await dPage.evaluate(() => {
    const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0;

    return {
      fcp: Math.round(fcp),
      domInteractive: Math.round(timing?.domInteractive || 0),
      domComplete: Math.round(timing?.domComplete || 0),
      duration: Math.round(timing?.duration || 0),
    };
  });

  // Verify Hero paints immediately
  const heroHeading = await dPage.locator("h1").innerText();

  // 2. Mobile Performance Audit
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mPage = await mContext.newPage();
  const mStartTime = Date.now();
  await mPage.goto(baseUrl, { waitUntil: "networkidle" });
  const mLoadTime = Date.now() - mStartTime;

  const mMetrics = await mPage.evaluate(() => {
    const timing = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find((e) => e.name === "first-contentful-paint")?.startTime || 0;

    return {
      fcp: Math.round(fcp),
      domInteractive: Math.round(timing?.domInteractive || 0),
      domComplete: Math.round(timing?.domComplete || 0),
      duration: Math.round(timing?.duration || 0),
    };
  });

  await dContext.close();
  await mContext.close();
  await browser.close();

  // 3. Check public folder for 3D external assets
  const publicDir = path.join(process.cwd(), "public");
  let external3dAssetsBytes = 0;
  if (fs.existsSync(publicDir)) {
    const scanDir = (dir: string) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          scanDir(full);
        } else if (/\.(glb|gltf|bin|obj|fbx)$/i.test(file)) {
          external3dAssetsBytes += stat.size;
        }
      }
    };
    scanDir(publicDir);
  }

  const results = {
    heroHeading,
    desktop: {
      loadTimeMs: dLoadTime,
      ...dMetrics,
    },
    mobile: {
      loadTimeMs: mLoadTime,
      ...mMetrics,
    },
    external3dAssetsBytes,
  };

  console.log("=== PERFORMANCE AUDIT RESULTS ===");
  console.log(JSON.stringify(results, null, 2));

  // Write audit results to json
  fs.writeFileSync(
    path.join("C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b", "phase-11-audit.json"),
    JSON.stringify(results, null, 2)
  );

  process.exit(0);
}

main().catch(console.error);
