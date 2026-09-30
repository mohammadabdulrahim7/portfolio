"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

interface JellyfishProps {
  initialPosition: [number, number, number];
  color?: string;
  glowColor?: string;
  scale?: number;
  bobSpeed?: number;
  pulseOffset?: number;
}

export const Jellyfish: React.FC<JellyfishProps> = ({
  initialPosition,
  color = "#22E5FF",
  glowColor = "#22E5FF",
  scale = 1.0,
  bobSpeed = 0.8,
  pulseOffset = 0,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Load real anatomical Aurelia aurita GLB
  const { scene } = useGLTF("/models/jellyfish.glb");
  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(scene) as THREE.Group;
    // Apply tint color to physical transmission materials
    c.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshPhysicalMaterial;
          if (mat.emissive) {
            mat.emissive.set(glowColor);
          }
          if (mat.color && !mat.vertexColors) {
            mat.color.set(color);
          }
          mesh.material = mat;
        }
      }
    });
    return c;
  }, [scene, color, glowColor]);

  useFrame((state) => {
    if (!rootRef.current || !modelRef.current) return;
    const t = state.clock.getElapsedTime() * bobSpeed + pulseOffset;

    // Asymmetric fluid propulsion pulse
    const pulsePhase = Math.sin(t * 1.8);
    const contraction = Math.max(0, pulsePhase);
    const pulseScaleY = 1.0 + contraction * 0.28;
    const pulseScaleXZ = 1.0 - contraction * 0.18;

    modelRef.current.scale.set(pulseScaleXZ, pulseScaleY, pulseScaleXZ);

    // Natural fluid vertical bobbing drift
    rootRef.current.position.y = initialPosition[1] + Math.sin(t * 0.5) * 1.4;
    rootRef.current.position.x = initialPosition[0] + Math.cos(t * 0.25) * 0.7;
    rootRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={rootRef} position={initialPosition} scale={scale}>
      <group ref={modelRef}>
        {/* Real Anatomical Aurelia Aurita 3D Jellyfish GLB */}
        <primitive object={clone} />
      </group>
    </group>
  );
};

// Preload the GLB model
useGLTF.preload("/models/jellyfish.glb");
