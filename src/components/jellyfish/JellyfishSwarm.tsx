"use client";

import React, { useMemo } from "react";
import { useWorld } from "@/store/useWorld";
import { TIER_CONFIGS } from "@/lib/quality";
import { Jellyfish } from "./Jellyfish";

export const JellyfishSwarm: React.FC = () => {
  const qualityTier = useWorld((state) => state.qualityTier);
  const count = TIER_CONFIGS[qualityTier].jellyfishCount;

  // Pre-configured distributed swarm positions across deeper zones Z3-Z5
  const swarmData = useMemo(() => {
    return [
      // 1. Z2/Z3 Cyan
      { pos: [-6, -4, -10] as [number, number, number], color: "#22E5FF", glow: "#22E5FF", scale: 0.9, speed: 0.8, offset: 0 },
      // 2. Z3 Electric Blue
      { pos: [7, -9, -12] as [number, number, number], color: "#2D6BFF", glow: "#22E5FF", scale: 1.1, speed: 0.7, offset: 1.2 },
      // 3. Z3 Restrained Magenta (<= 1 in 4)
      { pos: [-8, -13, -14] as [number, number, number], color: "#FF3DC8", glow: "#FF3DC8", scale: 0.85, speed: 0.9, offset: 2.5 },
      // 4. Z3/Z4 Cyan
      { pos: [5, -16, -11] as [number, number, number], color: "#22E5FF", glow: "#22E5FF", scale: 1.2, speed: 0.65, offset: 3.1 },
      // 5. Z4 Blue
      { pos: [-5, -20, -15] as [number, number, number], color: "#2D6BFF", glow: "#2D6BFF", scale: 1.0, speed: 0.75, offset: 4.2 },
      // 6. Z4 Cyan
      { pos: [8, -23, -16] as [number, number, number], color: "#22E5FF", glow: "#22E5FF", scale: 0.95, speed: 0.85, offset: 0.8 },
      // 7. Z4 Restrained Magenta (2nd of 8)
      { pos: [-7, -26, -18] as [number, number, number], color: "#FF3DC8", glow: "#FF3DC8", scale: 0.9, speed: 0.7, offset: 1.9 },
      // 8. Z5 Deep Calm Cyan
      { pos: [4, -28, -14] as [number, number, number], color: "#22E5FF", glow: "#22E5FF", scale: 1.15, speed: 0.6, offset: 2.8 },
    ];
  }, []);

  if (count === 0) return null;

  return (
    <group>
      {swarmData.slice(0, count).map((item, idx) => (
        <Jellyfish
          key={idx}
          initialPosition={item.pos}
          color={item.color}
          glowColor={item.glow}
          scale={item.scale}
          bobSpeed={item.speed}
          pulseOffset={item.offset}
        />
      ))}
    </group>
  );
};
