"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "@/store/useWorld";
import { Rays } from "./Rays";
import { Particles } from "./Particles";
import { Caustics } from "./Caustics";

export const Underwater: React.FC = () => {
  const { scene } = useThree();
  const scrollProgress = useWorld((state) => state.scrollProgress);
  const fogRef = useRef<THREE.FogExp2>(new THREE.FogExp2("#1EA2DC", 0.025));

  // Initialize scene fog once
  React.useEffect(() => {
    scene.fog = fogRef.current;
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  // Color checkpoints across the 5 zones (optical depth absorption)
  const colors = React.useMemo(() => {
    return [
      new THREE.Color("#1EA2DC"), // Z1 Surface (0.0)
      new THREE.Color("#1379B5"), // Z2 Waterline (0.25)
      new THREE.Color("#0C4B7E"), // Z3 Deeper (0.50)
      new THREE.Color("#062445"), // Z4 Deep Ocean (0.75)
      new THREE.Color("#08335C"), // Z5 Calm hold (1.0)
    ];
  }, []);

  useFrame(() => {
    if (!fogRef.current) return;

    // Map scrollProgress (0..1) to color segments
    const p = Math.max(0, Math.min(1, scrollProgress));
    let color: THREE.Color;
    let density: number;

    if (p <= 0.25) {
      const t = p / 0.25;
      color = colors[0].clone().lerp(colors[1], t);
      density = 0.022 + t * 0.01;
    } else if (p <= 0.5) {
      const t = (p - 0.25) / 0.25;
      color = colors[1].clone().lerp(colors[2], t);
      density = 0.032 + t * 0.016;
    } else if (p <= 0.75) {
      const t = (p - 0.5) / 0.25;
      color = colors[2].clone().lerp(colors[3], t);
      density = 0.048 + t * 0.022;
    } else {
      const t = (p - 0.75) / 0.25;
      color = colors[3].clone().lerp(colors[4], t);
      density = 0.07 - t * 0.015;
    }

    fogRef.current.color.copy(color);
    fogRef.current.density = density;
  });

  return (
    <>
      <Rays />
      <Caustics />
      <Particles />
    </>
  );
};
