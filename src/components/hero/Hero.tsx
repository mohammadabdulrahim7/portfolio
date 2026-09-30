import React from "react";
import { HeroPanel } from "./HeroPanel";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      aria-label="Introduction & Overview"
      className="relative min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20 pb-20 md:pb-12 overflow-hidden"
    >
      {/* Decorative Sun Glow (Atmosphere hint) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 md:right-12 w-96 h-96 rounded-full bg-sun-warm/25 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left-weighted Open Cinematic Typography Panel on Desktop; Centered on Mobile */}
        <div className="lg:col-span-8 flex justify-center lg:justify-start">
          <HeroPanel />
        </div>

        {/* Right Lane Decorative Atmospheric Hint (Desktop Only) */}
        <div
          aria-hidden="true"
          className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-full max-w-xs p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-silver shadow-lg space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-sun-warm/40 flex items-center justify-center text-amber-900 font-mono text-xs font-bold">
              Z1
            </div>
            <p className="font-mono text-xs uppercase tracking-widest font-semibold text-white">
              SURFACE OCEAN
            </p>
            <p className="text-xs text-silver/80 leading-relaxed font-body">
              Warm sunlight reflecting off coastal ripples. Scroll downward to submerge into the iceberg field.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Cue */}
      <div
        aria-hidden="true"
        className="md:hidden flex flex-col items-center justify-center pt-8 text-white/70 animate-bounce"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
          SCROLL TO DIVE
        </span>
        <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
