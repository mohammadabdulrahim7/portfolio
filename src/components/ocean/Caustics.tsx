"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Caustics: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        // Procedural caustics pattern based on overlapping wave patterns
        float causticsPattern(vec2 p, float t) {
          vec2 p1 = p * 1.8 + vec2(sin(t * 0.8), cos(t * 0.7)) * 0.35;
          vec2 p2 = p * 2.4 - vec2(cos(t * 0.9), sin(t * 0.6)) * 0.4;
          
          float c1 = sin(p1.x * 3.0 + sin(p1.y * 3.0 + t));
          float c2 = cos(p2.y * 3.2 + cos(p2.x * 2.8 - t));
          float intensity = pow(clamp(c1 * c2 + 0.4, 0.0, 1.0), 3.0);
          return intensity;
        }

        void main() {
          float c = causticsPattern(vWorldPos.xz * 0.12, uTime * 0.8);
          vec3 causticsColor = vec3(0.15, 0.85, 1.0) * c * 0.35;
          gl_FragColor = vec4(causticsColor, c * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [uniforms]);

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, -8]}
      material={material}
    >
      <planeGeometry args={[100, 100, 1, 1]} />
    </mesh>
  );
};
