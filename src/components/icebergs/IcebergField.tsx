import React from "react";
import { projects } from "@/data/projects";
import { IcebergCard } from "./IcebergCard";

export const IcebergField: React.FC = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative min-h-[120svh] px-4 sm:px-8 lg:px-16 py-24 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan font-mono text-xs font-bold tracking-widest uppercase mb-3">
            ZONE 2 · THE WATERLINE
          </div>
          <h2
            id="work-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-4"
          >
            PROJECT ICEBERGS
          </h2>
          <p className="text-silver-muted max-w-2xl text-sm sm:text-base font-body">
            What is visible on the surface is only a fraction of what was engineered beneath.
            Select an iceberg to dive into its architecture.
          </p>
        </div>

        {/* Desktop Dynamic Grid Composition */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {projects.map((project) => (
            <IcebergCard
              key={project.id}
              project={project}
              featured={project.id === "nova-class"}
            />
          ))}
        </div>

        {/* Mobile Snap-scrolling Rail */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 -mx-4 px-4 scrollbar-none">
            {projects.map((project) => (
              <div
                key={project.id}
                className="snap-center shrink-0 w-[85vw] max-w-sm"
              >
                <IcebergCard project={project} />
              </div>
            ))}
          </div>
          <p className="text-center font-mono text-[11px] text-silver mt-2">
            &larr; Swipe to view all projects &rarr;
          </p>
        </div>

        {/* Mandatory Semantic Accessible Project List (PRD Section 8.3 & 10) */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="sr-only">All Projects (Accessible Directory)</h3>
          <ul className="space-y-3" role="list">
            {projects.map((proj) => (
              <li
                key={proj.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-cyan/30 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-neon-cyan uppercase mr-3">
                    [{proj.category}]
                  </span>
                  <a
                    href={`/projects/${proj.slug}`}
                    className="font-display font-bold text-white hover:text-neon-cyan text-sm sm:text-base uppercase"
                  >
                    {proj.title}
                  </a>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center gap-3">
                  {proj.contentStatus === "placeholder" ? (
                    <span className="text-[11px] font-mono text-amber-300">
                      Case study in progress
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-silver-muted">
                      {proj.techStack.slice(0, 3).join(" · ")}
                    </span>
                  )}
                  <a
                    href={`/projects/${proj.slug}`}
                    className="text-xs font-mono text-neon-cyan underline sm:no-underline sm:hover:underline"
                  >
                    View &rarr;
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
