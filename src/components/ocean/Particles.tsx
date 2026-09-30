"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "@/store/useWorld";
import { TIER_CONFIGS } from "@/lib/quality";

export const Particles: React.FC = () => {
  const qualityTier = useWorld((state) => state.qualityTier);
  const count = TIER_CONFIGS[qualityTier].particlesCount;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate deterministic particles within bounds [x: -25..25, y: 5..-40, z: -25..10]
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 600; i++) {
      data.push({
        x: (Math.random() - 0.5) * 50,
        y: Math.random() * -35 + 2,
        z: (Math.random() - 0.5) * 40 - 5,
        speed: 0.15 + Math.random() * 0.25,
        scale: 0.04 + Math.random() * 0.08,
        driftOffset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || count === 0) return;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      // Gentle vertical and horizontal drifting
      const currentY = p.y + Math.sin(t * p.speed + p.driftOffset) * 0.6;
      const currentX = p.x + Math.cos(t * p.speed * 0.5 + p.driftOffset) * 0.4;

      dummy.position.set(currentX, currentY, p.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#22E5FF"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
