"use client";

import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "@/store/useWorld";
import { damp } from "@/lib/scroll";

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const scrollProgress = useWorld((state) => state.scrollProgress);
  const motionPreference = useWorld((state) => state.motionPreference);

  // Target position and rotation vectors
  const targetPos = useRef(new THREE.Vector3(0, 4, 12));
  const targetRotX = useRef(-0.1);

  useFrame((state, delta) => {
    // If reduced motion is requested, hold still at surface
    if (motionPreference === "reduced") {
      camera.position.set(0, 4, 12);
      camera.rotation.set(-0.1, 0, 0);
      return;
    }

    const p = Math.max(0, Math.min(1, scrollProgress));

    // Map 0..1 to depth zones
    // Z1: p=0.0 -> Y=4, Z=12
    // Z2: p=0.25 -> Y=0.5, Z=14
    // Z3: p=0.50 -> Y=-8, Z=16
    // Z4: p=0.75 -> Y=-18, Z=18
    // Z5: p=1.00 -> Y=-22, Z=16
    let targetY: number;
    let targetZ: number;
    let targetTilt: number;

    if (p <= 0.25) {
      const t = p / 0.25;
      targetY = 4 + (0.5 - 4) * t;
      targetZ = 12 + (14 - 12) * t;
      targetTilt = -0.1 + (0.0 - -0.1) * t;
    } else if (p <= 0.5) {
      const t = (p - 0.25) / 0.25;
      targetY = 0.5 + (-8 - 0.5) * t;
      targetZ = 14 + (16 - 14) * t;
      targetTilt = 0.0 + (-0.08 - 0.0) * t;
    } else if (p <= 0.75) {
      const t = (p - 0.5) / 0.25;
      targetY = -8 + (-18 - -8) * t;
      targetZ = 16 + (18 - 16) * t;
      targetTilt = -0.08 + (-0.05 - -0.08) * t;
    } else {
      const t = (p - 0.75) / 0.25;
      targetY = -18 + (-22 - -18) * t;
      targetZ = 18 + (16 - 18) * t;
      targetTilt = -0.05 + (0.05 - -0.05) * t;
    }

    // Gentle pointer parallax on desktop (<= 1.5 degrees ~ 0.026 rad)
    const pointerX = state.pointer.x * 0.4;
    const pointerY = state.pointer.y * 0.2;

    targetPos.current.set(pointerX, targetY + pointerY, targetZ);
    targetRotX.current = targetTilt - pointerY * 0.05;

    // Smooth exponential damping (lambda = 3.5)
    camera.position.x = damp(camera.position.x, targetPos.current.x, 3.5, delta);
    camera.position.y = damp(camera.position.y, targetPos.current.y, 3.5, delta);
    camera.position.z = damp(camera.position.z, targetPos.current.z, 3.5, delta);

    camera.rotation.x = damp(camera.rotation.x, targetRotX.current, 3.5, delta);
    camera.rotation.y = damp(camera.rotation.y, -pointerX * 0.05, 3.5, delta);
  });

  return null;
};
