"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Sun: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      // Subtle natural afternoon drift
      lightRef.current.position.x = 12 + Math.sin(t * 0.08) * 1.2;
      lightRef.current.position.y = 18 + Math.cos(t * 0.08) * 0.4;
    }
    if (coronaRef.current) {
      const s = 1.0 + Math.sin(t * 1.2) * 0.04;
      coronaRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[12, 18, -15]}>
      {/* Warm Afternoon Sun Light */}
      <directionalLight
        ref={lightRef}
        color="#FFE5BC"
        intensity={2.6}
        castShadow={false}
      />
      {/* Natural Hemisphere Ambient Fill (Sky blue above, warm ocean bounce below) */}
      <hemisphereLight
        color="#7AC2EB"
        groundColor="#0B3E68"
        intensity={1.1}
      />

      {/* Realistic Afternoon Sun Disc with Soft Atmospheric Corona */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#FFF4DF" />
      </mesh>

      {/* Outer Atmospheric Corona Halo */}
      <mesh ref={coronaRef} position={[0, 0, -0.2]}>
        <ringGeometry args={[2.2, 5.2, 32]} />
        <meshBasicMaterial
          color="#FFD699"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
