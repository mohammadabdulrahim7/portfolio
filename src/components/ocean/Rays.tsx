"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Rays: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
      groupRef.current.position.x = Math.sin(t * 0.2) * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -8]}>
      {/* Several additive angled planes simulating volumetric light shafts */}
      {[-6, -2, 2, 6].map((xOffset, i) => (
        <mesh
          key={i}
          position={[xOffset, -5, i * -2]}
          rotation={[0.2, 0.1, -0.25]}
        >
          <planeGeometry args={[3, 20]} />
          <meshBasicMaterial
            color="#22E5FF"
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};
