"use client";

import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import Link from "next/link";
import { Project } from "@/data/types";
import { useWorld } from "@/store/useWorld";

interface ProceduralIcebergProps {
  project: Project;
}

export const ProceduralIceberg: React.FC<ProceduralIcebergProps> = ({ project }) => {
  const groupRef = useRef<THREE.Group>(null);
  const foamRef = useRef<THREE.Mesh>(null);
  const glyphsGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const { hoveredProjectSlug, setHoveredProjectSlug, setTransitionState, setActiveProjectSlug } = useWorld();

  const isHighlighted = hovered || focused || hoveredProjectSlug === project.slug;

  const accentHex = useMemo(() => {
    switch (project.iceberg.accent) {
      case "cyan":
        return "#22E5FF";
      case "magenta":
        return "#FF3DC8";
      case "blue":
      default:
        return "#6898FF";
    }
  }, [project.iceberg.accent]);

  // Load real Arctic Glacial Iceberg GLB model
  const { scene } = useGLTF("/models/iceberg.glb");
  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(scene) as THREE.Group;
    return c;
  }, [scene]);

  // Waterline turbulent foam ring geometry at y = 0
  const foamGeometry = useMemo(() => {
    const geo = new THREE.RingGeometry(2.2, 3.4, 32);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  // Floating cyber glyph positions
  const glyphs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.6 + Math.sin(i * 3) * 0.5;
      items.push({
        basePos: [Math.cos(angle) * radius, 0.6 + Math.sin(i * 2) * 1.4, Math.sin(angle) * radius] as [number, number, number],
      });
    }
    return items;
  }, []);

  // Smooth hover tilt & lift lerp
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const basePosY = project.iceberg.position[1];
    const targetY = basePosY + (isHighlighted ? 0.35 : 0);
    const targetRotX = isHighlighted ? -0.05 : 0;
    const targetRotZ = isHighlighted ? 0.04 : 0;

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      6,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      5,
      delta
    );

    // Orbit floating glyphs
    if (glyphsGroupRef.current) {
      glyphsGroupRef.current.rotation.y += delta * 0.3;
    }

    // Waterline foam pulse
    if (foamRef.current) {
      const s = 1.0 + Math.sin(state.clock.getElapsedTime() * 2.0) * 0.05;
      foamRef.current.scale.set(s, 1, s);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredProjectSlug(project.slug);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (hoveredProjectSlug === project.slug) {
      setHoveredProjectSlug(null);
    }
    document.body.style.cursor = "auto";
  };

  const handleNavigate = () => {
    setActiveProjectSlug(project.slug);
    setTransitionState("entering");
  };

  return (
    <group
      ref={groupRef}
      position={project.iceberg.position}
      scale={project.iceberg.scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleNavigate}
    >
      {/* Real Arctic Glacial Iceberg Model with PBR Ice & Submerged Mass */}
      <group scale={[2.5, 3.2, 2.5]} position={[0, -0.2, 0]}>
        <primitive object={clone} />
      </group>

      {/* Waterline Foam Ring where ocean surface breaks against ice */}
      <mesh ref={foamRef} geometry={foamGeometry} position={[0, 0.04, 0]}>
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Holographic Glowing Core */}
      <pointLight
        color={accentHex}
        intensity={isHighlighted ? 1.8 : 0.6}
        distance={7}
        decay={2}
        position={[0, 0, 0]}
      />

      {/* Orbiting floating cyber glyphs */}
      <group ref={glyphsGroupRef}>
        {glyphs.map((g, idx) => (
          <mesh key={idx} position={g.basePos}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial
              color={accentHex}
              transparent
              opacity={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Drei <Html> Hologram Panel: reveals when hovered or focused */}
      {isHighlighted && (
        <Html
          center
          position={[0, 4.4, 0]}
          distanceFactor={14}
          zIndexRange={[100, 0]}
          className="pointer-events-auto select-none"
        >
          <div
            data-testid="iceberg-hologram"
            className="w-64 p-4 rounded-xl bg-[#030B14]/90 backdrop-blur-md border shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
            style={{
              borderColor: accentHex,
              boxShadow: `0 0 25px ${accentHex}40`,
            }}
          >
            {/* Hologram top bracket */}
            <div className="flex items-center justify-between text-[10px] font-mono text-silver-muted mb-1.5 uppercase tracking-widest border-b border-white/10 pb-1">
              <span style={{ color: accentHex }}>ICEBERG 0{project.order}</span>
              <span>{project.category}</span>
            </div>

            {/* Title */}
            <h4 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-1">
              {project.title}
            </h4>

            {/* Short description or placeholder status */}
            <p className="text-xs font-body text-silver-muted mb-3 line-clamp-2">
              {project.contentStatus === "placeholder"
                ? "Full case study in progress."
                : project.shortDescription || "Interactive project architecture."}
            </p>

            {/* Accessible keyboard-focusable DOM link */}
            <Link
              href={`/projects/${project.slug}`}
              onFocus={() => {
                setFocused(true);
                setHoveredProjectSlug(project.slug);
              }}
              onBlur={() => {
                setFocused(false);
                if (hoveredProjectSlug === project.slug) {
                  setHoveredProjectSlug(null);
                }
              }}
              onClick={handleNavigate}
              className="inline-flex items-center justify-between w-full px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                backgroundColor: `${accentHex}20`,
                borderColor: accentHex,
                borderWidth: "1px",
                color: accentHex,
              }}
            >
              <span>EXPLORE &rarr;</span>
              <span className="text-[10px] opacity-75">[ENTER]</span>
            </Link>
          </div>
        </Html>
      )}
    </group>
  );
};

// Preload the GLB model
useGLTF.preload("/models/iceberg.glb");
