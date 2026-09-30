"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { calculateWhaleTrajectory } from "./useWhalePath";

interface WhaleProps {
  lane?: number;
  scale?: number;
  jumpOffset?: number;
}

export const Whale: React.FC<WhaleProps> = ({
  lane = 0,
  scale = 1.0,
  jumpOffset = 0,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const splashRef = useRef<THREE.Points>(null);

  // Load real GLB model (skinned, rigged, animated)
  const { scene, animations } = useGLTF("/models/whale.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, rootRef);

  useEffect(() => {
    // Play the authentic skeletal swim animation
    if (actions && actions["swim"]) {
      actions["swim"].reset().fadeIn(0.3).play();
    }
    return () => {
      if (actions && actions["swim"]) {
        actions["swim"].fadeOut(0.3);
      }
    };
  }, [actions]);

  // Surface breach water splash particles
  const splashParticles = useMemo(() => {
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.0;
      pos[i * 3 + 1] = Math.random() * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!rootRef.current) return;
    const time = state.clock.getElapsedTime();
    const { position, rotation } = calculateWhaleTrajectory(lane, time, jumpOffset);

    rootRef.current.position.copy(position);
    rootRef.current.rotation.copy(rotation);

    // Surface breach water splash active when whale breaches near water surface (y > -0.5)
    if (splashRef.current) {
      const isSurfacing = position.y > -0.5;
      splashRef.current.visible = isSurfacing;
      if (isSurfacing) {
        splashRef.current.rotation.y += 0.08;
      }
    }
  });

  return (
    <group ref={rootRef} scale={scale * 0.9}>
      {/* Real Skinned Animated 3D Whale GLB */}
      <primitive object={clone} rotation={[0, Math.PI / 2, 0]} />

      {/* Surface Breach Water Splash & Foam Wake */}
      <points ref={splashRef} geometry={splashParticles} position={[0, 0.5, 0]} visible={false}>
        <pointsMaterial
          color="#E0F4FF"
          size={0.18}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// Preload the GLB model
useGLTF.preload("/models/whale.glb");
