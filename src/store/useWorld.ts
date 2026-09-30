import { create } from "zustand";
import { QualityTier } from "../lib/quality";

export type TransitionState = "idle" | "entering" | "viewing" | "exiting";

interface WorldState {
  // Scroll progress from 0.0 (top/hero) to 1.0 (bottom/contact)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Active section identifier
  activeSection: "home" | "work" | "skills" | "journey" | "contact";
  setActiveSection: (section: "home" | "work" | "skills" | "journey" | "contact") => void;

  // Quality tier (0 to 3)
  qualityTier: QualityTier;
  setQualityTier: (tier: QualityTier) => void;

  // User motion preference
  motionPreference: "normal" | "reduced";
  setMotionPreference: (preference: "normal" | "reduced") => void;

  // Transition state for project view enters/exits
  transitionState: TransitionState;
  setTransitionState: (state: TransitionState) => void;

  // Currently focused / hovered / transition target project slug
  activeProjectSlug: string | null;
  setActiveProjectSlug: (slug: string | null) => void;

  hoveredProjectSlug: string | null;
  setHoveredProjectSlug: (slug: string | null) => void;
}

export const useWorld = create<WorldState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),

  activeSection: "home",
  setActiveSection: (section) => set({ activeSection: section }),

  qualityTier: 3,
  setQualityTier: (tier) => set({ qualityTier: tier }),

  motionPreference: "normal",
  setMotionPreference: (preference) => set({ motionPreference: preference }),

  transitionState: "idle",
  setTransitionState: (state) => set({ transitionState: state }),

  activeProjectSlug: null,
  setActiveProjectSlug: (slug) => set({ activeProjectSlug: slug }),

  hoveredProjectSlug: null,
  setHoveredProjectSlug: (slug) => set({ hoveredProjectSlug: slug }),
}));
