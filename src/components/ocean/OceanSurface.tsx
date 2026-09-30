"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld } from "@/store/useWorld";

export const OceanSurface: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { qualityTier, motionPreference } = useWorld();
  const { camera, raycaster } = useThree();

  // Ring buffer for max 8 active ripples: [x, y, age]
  const ripplesRef = useRef<Array<{ x: number; y: number; age: number }>>(
    Array.from({ length: 8 }, () => ({ x: 0, y: 0, age: -1 }))
  );
  const rippleIndexRef = useRef(0);
  const lastRippleTimeRef = useRef(0);

  // Custom photorealistic water shader material uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSurfaceColor: { value: new THREE.Color("#1EA2DC") },
      uDeepColor: { value: new THREE.Color("#072D52") },
      uSunColor: { value: new THREE.Color("#FFE2B8") },
      uSunDir: { value: new THREE.Vector3(12.0, 18.0, -15.0).normalize() },
      uRipples: {
        value: Array.from({ length: 8 }, () => new THREE.Vector3(0, 0, -1)),
      },
    }),
    []
  );

  const customShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uRipples[8];
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vFoam;

        // Gerstner Wave generator function
        vec3 gerstnerWave(vec2 dir, float steepness, float wavelength, vec3 pos, float time, inout vec3 tangent, inout vec3 binormal) {
          float k = 2.0 * 3.14159265 / wavelength;
          float c = sqrt(9.8 / k);
          vec2 d = normalize(dir);
          float f = k * (dot(d, pos.xy) - c * time * 0.7);
          float a = steepness / k;

          tangent += vec3(
            -d.x * d.x * (steepness * sin(f)),
            -d.x * d.y * (steepness * sin(f)),
            d.x * (steepness * cos(f))
          );
          binormal += vec3(
            -d.x * d.y * (steepness * sin(f)),
            -d.y * d.y * (steepness * sin(f)),
            d.y * (steepness * cos(f))
          );

          return vec3(
            d.x * (a * cos(f)),
            d.y * (a * cos(f)),
            a * sin(f)
          );
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          vec3 tangent = vec3(1.0, 0.0, 0.0);
          vec3 binormal = vec3(0.0, 1.0, 0.0);

          // Sum 4 realistic multi-frequency Gerstner waves
          vec3 waveOffset = vec3(0.0);
          waveOffset += gerstnerWave(vec2(1.0, 0.3), 0.18, 14.0, pos, uTime, tangent, binormal);
          waveOffset += gerstnerWave(vec2(0.6, 0.8), 0.12, 7.5, pos, uTime * 1.1, tangent, binormal);
          waveOffset += gerstnerWave(vec2(-0.4, 0.9), 0.08, 4.2, pos, uTime * 1.3, tangent, binormal);
          waveOffset += gerstnerWave(vec2(0.8, -0.5), 0.05, 2.1, pos, uTime * 1.6, tangent, binormal);

          pos.z += waveOffset.z;
          pos.xy += waveOffset.xy;

          // Interactive cursor ripples (max 8)
          for (int i = 0; i < 8; i++) {
            if (uRipples[i].z >= 0.0 && uRipples[i].z < 2.0) {
              float d = length(pos.xy - uRipples[i].xy);
              float rad = uRipples[i].z * 4.0;
              float decay = 1.0 - (uRipples[i].z / 2.0);
              float ripple = exp(-pow((d - rad) * 1.5, 2.0)) * sin((d - rad) * 5.0);
              pos.z += ripple * 0.16 * decay;
            }
          }

          // Calculate surface normal from wave tangents
          vec3 computedNormal = normalize(cross(binormal, tangent));
          vNormal = normalize(normalMatrix * computedNormal);

          // Foam amount at wave crests
          vFoam = clamp((waveOffset.z - 0.18) * 4.5, 0.0, 1.0);

          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uSurfaceColor;
        uniform vec3 uDeepColor;
        uniform vec3 uSunColor;
        uniform vec3 uSunDir;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying float vFoam;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          vec3 normal = normalize(vNormal);

          // Realistic Fresnel equation (Schlick's approximation for water n=1.333, R0=0.02)
          float R0 = 0.02;
          float NdotV = max(dot(normal, viewDir), 0.0);
          float fresnel = R0 + (1.0 - R0) * pow(1.0 - NdotV, 5.0);

          // Microfacet specular sun glitter (GGX / Blinn-Phong highlight)
          vec3 halfDir = normalize(uSunDir + viewDir);
          float NdotH = max(dot(normal, halfDir), 0.0);
          float specPower = 128.0;
          float sunGlitter = pow(NdotH, specPower) * 2.8;

          // Secondary soft skylight reflection
          float skyReflect = pow(max(dot(normal, vec3(0.0, 1.0, 0.0)), 0.0), 2.0) * 0.25;

          // Water body absorption gradient
          vec3 waterBody = mix(uDeepColor, uSurfaceColor, clamp(NdotV * 0.9 + 0.1, 0.0, 1.0));

          // Combine sky reflection, sun glitter, and water body
          vec3 skyColor = vec3(0.55, 0.78, 0.95);
          vec3 oceanColor = mix(waterBody, skyColor + skyReflect, fresnel) + uSunColor * sunGlitter;

          // Realistic turbulent wave crest foam
          vec3 foamColor = vec3(0.96, 0.98, 1.0);
          vec3 finalColor = mix(oceanColor, foamColor, vFoam * 0.75);

          gl_FragColor = vec4(finalColor, 0.92);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [uniforms]);

  // Pointer move handler for cursor ripple (fine pointer, tier >= 2, normal motion)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || qualityTier < 2 || motionPreference === "reduced") return;

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastRippleTimeRef.current < 120) return; // Throttled to max ~8 ripples/sec

      const ndc = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(ndc, camera);
      if (meshRef.current) {
        const intersects = raycaster.intersectObject(meshRef.current);
        if (intersects.length > 0 && intersects[0].point) {
          const pt = intersects[0].point;
          const localX = pt.x;
          const localY = -pt.z;

          const idx = rippleIndexRef.current;
          ripplesRef.current[idx] = { x: localX, y: localY, age: 0 };
          rippleIndexRef.current = (idx + 1) % 8;
          lastRippleTimeRef.current = now;
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [camera, qualityTier, motionPreference, raycaster]);

  useFrame((state, delta) => {
    if (customShader) {
      customShader.uniforms.uTime.value = state.clock.getElapsedTime();

      // Update ripple ages
      const rippleVectors = customShader.uniforms.uRipples.value;
      for (let i = 0; i < 8; i++) {
        const r = ripplesRef.current[i];
        if (r.age >= 0) {
          r.age += delta;
          if (r.age > 2.0) {
            r.age = -1; // Inactive
          }
        }
        rippleVectors[i].set(r.x, r.y, r.age);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      material={customShader}
    >
      <planeGeometry args={[140, 140, 96, 96]} />
    </mesh>
  );
};
