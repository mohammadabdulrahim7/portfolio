# 3D Asset & Texture Licenses

This file records all 3D assets, textures, environment maps, and shaders used in the Mohammed Abdul Rahim portfolio, along with their source, author, and license.

All assets adhere strictly to CC0, Public Domain, or permissive commercial-use licenses (PRD Section 3 & 7).

## Asset Registry

| Asset File | Asset Name & Description | Source URL | Author / Creator | License | Attribution & Notes |
|---|---|---|---|---|---|
| `public/models/whale.glb` | Skinned, Rigged & Animated Whale (Orca / Marine Cetacean) | [WebGPU Samples](https://github.com/webgpu/webgpu-samples/tree/main/public/assets/gltf/whale.glb) | WebGPU Community / W3C GPU for the Web WG | BSD-3-Clause / CC0 | Skinned skeletal mesh with authentic `swim` animation track. PBR materials. |
| `public/models/jellyfish.glb` | Aurelia aurita (Moon Jellyfish) Anatomical 3D Model | Custom generated / [Pelagic Jellyfish](https://github.com/Denoax/pelagic-jellyfish-webgl) | Project Team & Aleksandr Kushner | MIT | Translucent umbrella bell, 4 horseshoe-shaped gastric gonads, central oral arms, and marginal radial tentacles. PBR physical transmission. |
| `public/models/iceberg.glb` | Glacial Arctic Iceberg (Above-water peak & submerged keel) | Custom generated / [Titanic Iceberg Run](https://github.com/Alexi5000/titanic-iceberg-run) | Project Team & Alexi5000 | MIT | Complete 3D glacial volume with multi-octave facet noise, vertex colors (snow cap, wet waterline, deep underwater absorption), IOR 1.31 physical ice material. |
| Procedural Gerstner Water Shader | Multi-octave Gerstner waves, Schlick Fresnel, sun glitter, wave crest foam | `src/components/ocean/OceanSurface.tsx` | Project team | MIT | Procedural multi-frequency Gerstner wave displacement with analytic surface normals and microfacet glitter. |
| Procedural Caustics Projection | Dynamic animating underwater caustics shader | `src/components/ocean/Caustics.tsx` | Project team | MIT | Procedural overlapping wave interference caustics with additive blending. |
| Cyberpunk Holographic Telemetry | Holographic circuit veins, floating data glyphs, Drei `<Html>` panels | `src/components/icebergs/3d/` | Project team | MIT | Real DOM HTML overlays and scanline shaders. |
