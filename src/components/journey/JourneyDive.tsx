import React from "react";
import { ladder, waypoints } from "@/data/journey";
import { site } from "@/data/site";
import { GlassSurface } from "@/components/ui/GlassSurface";

export const JourneyDive: React.FC = () => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative min-h-[140svh] px-4 sm:px-8 lg:px-16 py-24 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-neon-blue/30 text-neon-cyan font-mono text-xs font-bold tracking-widest uppercase mb-3">
            ZONE 4 · DEEP OCEAN DIVE
          </div>
          <h2
            id="journey-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-4"
          >
            TRAJECTORY & WAYPOINTS
          </h2>
          <p className="text-silver-muted max-w-2xl text-sm sm:text-base font-body">
            A chronological descent tracing development from foundational engineering toward
            autonomous intelligence and GenAI architecture.
          </p>
        </div>

        {/* Evolutionary Ladder (Ribbon with DIRECTION terminal node) */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-neon-cyan">
              EVOLUTIONARY LADDER
            </p>
            <span className="text-[11px] font-mono text-silver-muted uppercase">
              DESCENT: 01 &rarr; 06
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ladder.map((step, idx) => {
              const isLast = idx === ladder.length - 1;
              return (
                <div
                  key={step}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                    isLast
                      ? "bg-neon-cyan/15 border-neon-cyan text-white shadow-[0_0_20px_rgba(34,229,255,0.2)]"
                      : "bg-white/5 border-white/10 text-silver-muted hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-silver">
                    STEP 0{idx + 1}
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-tight my-2 text-white">
                    {step}
                  </span>
                  {isLast ? (
                    <span className="inline-block self-start px-2 py-0.5 rounded bg-neon-cyan text-cp-bg text-[10px] font-mono uppercase font-black tracking-wider shadow">
                      DIRECTION
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-silver font-semibold uppercase">
                      WAYPOINT
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Waypoints Timeline */}
        <div className="relative border-l-2 border-neon-cyan/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {waypoints.map((wp) => (
            <div key={wp.id} className="relative group">
              {/* Timeline Node Marker */}
              <div
                aria-hidden="true"
                className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#030914] border-2 border-neon-cyan shadow-[0_0_12px_#22E5FF] group-hover:scale-125 transition-transform"
              />

              <GlassSurface
                variant="deep"
                className="p-6 sm:p-8 rounded-2xl border border-white/15 hover:border-neon-cyan/40 transition-all max-w-3xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-white/10 text-neon-cyan border border-white/15">
                    {wp.kind}
                  </span>
                  {wp.date && (
                    <span className="text-xs font-mono text-silver-muted">
                      {wp.date}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white mb-1">
                  {wp.title}
                </h3>

                {wp.organisation && (
                  <p className="text-xs font-mono text-silver-muted mb-3">
                    {wp.organisation}
                  </p>
                )}

                {wp.description && (
                  <p className="text-sm font-body text-silver/85 leading-relaxed">
                    {wp.description}
                  </p>
                )}

                {/* Score display for Education waypoint */}
                {wp.id === "education" && site.education.showScore && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
                    <span className="text-xs font-mono text-silver-muted">
                      Academic Score:
                    </span>
                    <span className="text-xs font-mono font-bold text-neon-cyan px-2 py-0.5 rounded bg-neon-cyan/15 border border-neon-cyan/30">
                      {site.education.score}
                    </span>
                  </div>
                )}
              </GlassSurface>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
