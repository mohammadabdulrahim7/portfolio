"use client";

import React, { useEffect, useState } from "react";
import { useWorld } from "@/store/useWorld";

export const MotionToggle: React.FC = () => {
  const { motionPreference, setMotionPreference, setQualityTier } = useWorld();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("mar-motion-preference");
      if (stored === "reduced" || stored === "normal") {
        setMotionPreference(stored);
        if (stored === "reduced") setQualityTier(0);
        return;
      }

      // Check system preference
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setMotionPreference("reduced");
        setQualityTier(0);
      }
    } catch {
      // Fallback silently if localStorage is blocked
    }
  }, [setMotionPreference, setQualityTier]);

  const toggleMotion = () => {
    const next = motionPreference === "reduced" ? "normal" : "reduced";
    setMotionPreference(next);
    if (next === "reduced") {
      setQualityTier(0);
      document.documentElement.classList.add("reduced-motion");
    } else {
      setQualityTier(3);
      document.documentElement.classList.remove("reduced-motion");
    }

    try {
      localStorage.setItem("mar-motion-preference", next);
    } catch {
      // Ignore storage errors
    }
  };

  if (!mounted) {
    return null;
  }

  const isReduced = motionPreference === "reduced";

  return (
    <button
      onClick={toggleMotion}
      type="button"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-silver transition-colors cursor-pointer"
      title={isReduced ? "Enable motion animations" : "Disable motion animations"}
      aria-label={`Motion is currently ${isReduced ? "Off" : "On"}. Click to toggle.`}
      aria-pressed={isReduced}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isReduced ? "bg-amber-400" : "bg-neon-cyan animate-pulse"
        }`}
      />
      <span>MOTION: {isReduced ? "OFF" : "ON"}</span>
    </button>
  );
};
