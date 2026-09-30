"use client";

import React, { Component, ErrorInfo, ReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWorld } from "@/store/useWorld";
import { StaticOcean } from "./StaticOcean";

// Lazy-load the R3F Canvas
const OceanCanvas = dynamic(
  () => import("./OceanCanvas").then((mod) => mod.OceanCanvas),
  {
    ssr: false,
    loading: () => <StaticOcean />,
  }
);

// Error Boundary for WebGL initialization and context recovery
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class OceanErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("[WebGL Fallback] Ocean Stage caught error, falling back to static ocean:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <StaticOcean />;
    }
    return this.props.children;
  }
}

export const OceanStage: React.FC = () => {
  const qualityTier = useWorld((state) => state.qualityTier);
  const motionPreference = useWorld((state) => state.motionPreference);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    // Check if user requested reduced motion or tier 0
    if (motionPreference === "reduced" || qualityTier === 0) {
      setShouldLoad3D(false);
      return;
    }

    // Defer 3D canvas mount until after hero DOM paints (short timeout ensures hero first paint)
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setShouldLoad3D(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [motionPreference, qualityTier]);

  return (
    <OceanErrorBoundary>
      {/* Background static ocean is always mounted underneath to prevent any blank flash */}
      <StaticOcean />

      {/* R3F Canvas mounts lazily on capable devices when motion is enabled */}
      {shouldLoad3D && <OceanCanvas />}
    </OceanErrorBoundary>
  );
};
