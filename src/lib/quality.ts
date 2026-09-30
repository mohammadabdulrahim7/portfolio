export type QualityTier = 0 | 1 | 2 | 3;

export interface QualityConfig {
  tier: QualityTier;
  target: string;
  dprCap: number;
  whalesCount: number;
  jellyfishCount: number;
  particlesCount: number;
  enableRipple: boolean;
  enablePostFX: boolean;
  iceMaterial: "physical" | "standard" | "low-poly" | "css-svg";
}

export const TIER_CONFIGS: Record<QualityTier, QualityConfig> = {
  3: {
    tier: 3,
    target: "Desktop, capable GPU",
    dprCap: 1.75,
    whalesCount: 2,
    jellyfishCount: 8,
    particlesCount: 600,
    enableRipple: true,
    enablePostFX: true,
    iceMaterial: "physical",
  },
  2: {
    tier: 2,
    target: "Desktop, modest GPU",
    dprCap: 1.5,
    whalesCount: 1,
    jellyfishCount: 5,
    particlesCount: 300,
    enableRipple: true,
    enablePostFX: false,
    iceMaterial: "standard",
  },
  1: {
    tier: 1,
    target: "Mobile / weak GPU",
    dprCap: 1.0,
    whalesCount: 1,
    jellyfishCount: 3,
    particlesCount: 120,
    enableRipple: false,
    enablePostFX: false,
    iceMaterial: "low-poly",
  },
  0: {
    tier: 0,
    target: "Static fallback / reduced motion / no WebGL2",
    dprCap: 1.0,
    whalesCount: 0,
    jellyfishCount: 0,
    particlesCount: 0,
    enableRipple: false,
    enablePostFX: false,
    iceMaterial: "css-svg",
  },
};
