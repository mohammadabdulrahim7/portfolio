import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\2af28b06-3f7e-4dca-9d0b-0c9f422b403b";
const targetUrl = "http://127.0.0.1:4000";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const consoleMessages: string[] = [];

  // 1. Desktop 1440x900 Context
  const dContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const dPage = await dContext.newPage();
  dPage.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  await dPage.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await dPage.locator("canvas").waitFor({ state: "attached", timeout: 15000 });
  await dPage.waitForTimeout(2000); // Wait for WebGL canvas and models to initialize

  // Measure Desktop FPS via raw string evaluate
  const fpsMeasurement = (await dPage.evaluate(`
    new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      function count() {
        frameCount++;
        if (frameCount >= 60) {
          const duration = performance.now() - startTime;
          resolve(Math.round((frameCount * 1000) / duration));
        } else {
          requestAnimationFrame(count);
        }
      }
      requestAnimationFrame(count);
    })
  `)) as number;

  // Capture Phase 1 & 3 Hero
  await dPage.screenshot({ path: path.join(artifactDir, "audit-hero-desktop-1440x900.png") });

  // Scroll to Zone 2 Work / Icebergs using window.scrollTo
  await dPage.evaluate(() => {
    const el = document.getElementById("work-heading") || document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await dPage.waitForTimeout(1000);

  // Hover over first iceberg to trigger real Drei HTML hologram panel
  const novaCard = dPage.locator('[data-testid="iceberg-card-nova-class"]:visible');
  if (await novaCard.count() > 0) {
    await novaCard.hover();
    await dPage.waitForTimeout(600);
  }
  await dPage.screenshot({ path: path.join(artifactDir, "audit-icebergs-desktop-1440x900.png") });

  // Scroll to Zone 3 Skills (Underwater absorption fog & jellyfish)
  await dPage.evaluate(() => {
    const el = document.getElementById("skills-heading") || document.getElementById("skills");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await dPage.waitForTimeout(1000);
  await dPage.screenshot({ path: path.join(artifactDir, "audit-underwater-desktop-1440x900.png") });

  await dContext.close();

  // 2. Mobile 390x844 Context
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mPage = await mContext.newPage();
  mPage.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleMessages.push(`[mobile ${msg.type()}] ${msg.text()}`);
    }
  });

  await mPage.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
  await mPage.locator("canvas").waitFor({ state: "attached", timeout: 15000 });
  await mPage.waitForTimeout(2000);

  // Capture Mobile Hero
  await mPage.screenshot({ path: path.join(artifactDir, "audit-hero-mobile-390x844.png") });

  // Mobile Iceberg Rail
  await mPage.evaluate(() => {
    const el = document.getElementById("work-heading") || document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await mPage.waitForTimeout(800);

  const previewTrigger = mPage.locator('[data-testid="iceberg-card-nova-class"]:visible').getByRole("button", { name: /TAP TO PREVIEW/i });
  if (await previewTrigger.count() > 0) {
    await previewTrigger.click();
    await mPage.waitForTimeout(600);
  }
  await mPage.screenshot({ path: path.join(artifactDir, "audit-icebergs-mobile-390x844.png") });

  await mContext.close();
  await browser.close();

  const auditData = {
    measuredFps: fpsMeasurement,
    consoleWarningsOrErrors: consoleMessages,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(artifactDir, "audit-metrics.json"),
    JSON.stringify(auditData, null, 2)
  );

  console.log("Audit run complete:", auditData);
  process.exit(0);
}

main().catch((err) => {
  console.error("Audit run failed:", err);
  process.exit(1);
});
