"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useWorld } from "@/store/useWorld";
import { TIER_CONFIGS, QualityTier } from "@/lib/quality";
import { Sun } from "./Sun";
import { OceanSurface } from "./OceanSurface";
import { Underwater } from "./Underwater";
import { CameraRig } from "./CameraRig";
import { Whale } from "@/components/whales/Whale";
import { JellyfishSwarm } from "@/components/jellyfish/JellyfishSwarm";
import { IcebergField3D } from "@/components/icebergs/3d/IcebergField3D";

// Runtime FPS Guard component with warmup guard
const FPSGuard: React.FC = () => {
  const { qualityTier, setQualityTier } = useWorld();
  const frames = useRef(0);
  const lastTime = useRef(0);
  const warmup = useRef(true);
  const hasDropped = useRef(false);

  useFrame(() => {
    const now = performance.now();
    if (warmup.current) {
      lastTime.current = now;
      warmup.current = false;
      return;
    }

    frames.current++;
    const elapsed = now - lastTime.current;

    if (elapsed >= 3000) {
      const avgFps = (frames.current * 1000) / elapsed;
      if (avgFps < 45 && !hasDropped.current && qualityTier > 1) {
        console.warn(`[Performance] FPS dropped to ${avgFps.toFixed(1)}. Lowering quality tier.`);
        setQualityTier((qualityTier - 1) as QualityTier);
        hasDropped.current = true;
      }
      frames.current = 0;
      lastTime.current = now;
    }
  });

  return null;
};

export const OceanCanvas: React.FC = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");
  const qualityTier = useWorld((state) => state.qualityTier);
  const motionPreference = useWorld((state) => state.motionPreference);

  const [tabVisible, setTabVisible] = React.useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const shouldRender = !isProjectPage && tabVisible && qualityTier > 0 && motionPreference !== "reduced";
  const dpr = TIER_CONFIGS[qualityTier].dprCap;
  const whalesCount = TIER_CONFIGS[qualityTier].whalesCount;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 4, 12], fov: 50, near: 0.1, far: 1000 }}
        dpr={dpr}
        frameloop={shouldRender ? "always" : "never"}
        gl={{
          antialias: qualityTier >= 2,
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <FPSGuard />
        <CameraRig />
        <Sun />
        <OceanSurface />
        <Underwater />

        {/* 3D Photorealistic Glacial Icebergs with Cyberpunk Holograms */}
        <IcebergField3D />

        {/* Marine Creatures: Skinned Rigged Whales with breach splash */}
        {whalesCount >= 1 && <Whale lane={0} scale={1.1} jumpOffset={0} />}
        {whalesCount >= 2 && <Whale lane={1} scale={0.95} jumpOffset={0.5} />}

        {/* Marine Creatures: Translucent Bioluminescent Aurelia aurita Jellyfish Swarm */}
        <JellyfishSwarm />
      </Canvas>
    </div>
  );
};
