import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Load a minimal HTML page with Three.js and GLTFExporter
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script type="importmap">
          {
            "imports": {
              "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
              "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
          }
        </script>
      </head>
      <body>
        <script type="module">
          import * as THREE from 'three';
          import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

          window.THREE = THREE;
          window.GLTFExporter = GLTFExporter;
          window.isReady = true;
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction(() => (window as unknown as { isReady?: boolean }).isReady === true, { timeout: 30000 });

  // Generate Iceberg GLB using string evaluation (no tsx transpilation interference)
  const icebergCode = `
    (async () => {
      const THREE = window.THREE;
      const GLTFExporter = window.GLTFExporter;

      function seededNoise(seed, x, y, z) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 19.19) * 43758.5453;
        return n - Math.floor(n);
      }

      const geometry = new THREE.IcosahedronGeometry(1, 3);
      const positions = geometry.getAttribute("position");
      const colors = new Float32Array(positions.count * 3);
      const seed = 42;
      const verticalStretch = 1.6;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        const broad = seededNoise(seed, x * 0.7, y, z * 0.7);
        const chip = seededNoise(seed + 3.7, x * 2.8, y * 2.8, z * 2.8);
        const faceBias = 0.68 + broad * 0.52 + chip * 0.16;
        const asymmetric = 0.8 + seededNoise(seed + 9.1, x + 1.3, 0, z - 0.8) * 0.44;
        const above = y > 0 ? 1.0 + broad * 0.75 : 0.42 + broad * 0.3;

        positions.setXYZ(i, x * faceBias * asymmetric, y * faceBias * verticalStretch * above, z * faceBias);

        const displacedY = y * above;
        const colorOffset = i * 3;
        if (displacedY > 0.35) {
          const shade = 0.85 + chip * 0.15;
          colors[colorOffset] = shade;
          colors[colorOffset + 1] = shade * 1.01;
          colors[colorOffset + 2] = 1.0;
        } else if (displacedY < -0.1) {
          const depth = Math.min((-displacedY - 0.1) * 0.85, 0.6);
          colors[colorOffset] = 0.28 - depth * 0.14;
          colors[colorOffset + 1] = 0.75 - depth * 0.16;
          colors[colorOffset + 2] = 0.95 - depth * 0.05;
        } else {
          colors[colorOffset] = 0.48 + chip * 0.1;
          colors[colorOffset + 1] = 0.84 + chip * 0.1;
          colors[colorOffset + 2] = 0.98;
        }
      }

      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xd6effc,
        vertexColors: true,
        roughness: 0.22,
        metalness: 0.05,
        transmission: 0.35,
        thickness: 1.2,
        ior: 1.31,
        clearcoat: 0.25,
        clearcoatRoughness: 0.25,
        emissive: 0x052a42,
        emissiveIntensity: 0.22,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = "GlacialIceberg";

      const exporter = new GLTFExporter();
      return new Promise((resolve, reject) => {
        exporter.parse(
          mesh,
          (result) => {
            const blob = new Blob([result], { type: "application/octet-stream" });
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result.split(",")[1];
              resolve(base64);
            };
            reader.readAsDataURL(blob);
          },
          reject,
          { binary: true }
        );
      });
    })()
  `;

  const icebergBase64 = (await page.evaluate(icebergCode)) as string;
  const icebergPath = path.join(process.cwd(), "public", "models", "iceberg.glb");
  fs.writeFileSync(icebergPath, Buffer.from(icebergBase64, "base64"));
  console.log(`Generated iceberg.glb: ${fs.statSync(icebergPath).size} bytes`);

  await browser.close();
  console.log("All 3D models generated successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Model generation failed:", err);
  process.exit(1);
});
