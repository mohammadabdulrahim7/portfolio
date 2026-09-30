"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/data/types";
import { projects } from "@/data/projects";
import { CyberpunkHeroVisual } from "./CyberpunkHeroVisual";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface ProjectViewProps {
  project: Project;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  const router = useRouter();

  // Esc key listener returns to /#work (PRD Section 8.4 & Test 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/#work");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Find next project in the circular loop
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const accentHex = {
    cyan: "#22E5FF",
    magenta: "#FF3DC8",
    blue: "#2D6BFF",
  }[project.iceberg.accent];

  const accentTextHex = {
    cyan: "#22E5FF",
    magenta: "#FF3DC8",
    blue: "#6898FF",
  }[project.iceberg.accent];

  return (
    <main
      id="main"
      className="min-h-screen bg-[#020712] text-silver font-body px-4 sm:px-8 lg:px-16 py-8 md:py-12 selection:bg-neon-cyan selection:text-cp-bg"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Return Header */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <Link
            href="/#work"
            data-testid="return-ocean-btn"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan/50 text-neon-cyan font-mono text-xs uppercase tracking-wider transition-colors active:scale-95"
          >
            <span>&larr;</span>
            <span>RETURN TO OCEAN</span>
            <span className="hidden sm:inline text-[10px] text-silver font-semibold">[ESC]</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-silver-muted uppercase">
              ICEBERG 0{project.order} / 0{projects.length}
            </span>
          </div>
        </div>

        {/* Safety Notice for Materna: Must render prominently ABOVE THE FOLD on desktop & mobile */}
        {project.notice && (
          <aside
            aria-label="Medical safety notice"
            data-testid="materna-safety-notice"
            className="mb-8 p-4 sm:p-5 rounded-xl bg-amber-950/40 border-2 border-amber-400/80 text-amber-200 shadow-lg animate-in fade-in"
          >
            <div className="flex items-start gap-3">
              <span className="text-amber-400 font-mono text-base sm:text-lg">⚠</span>
              <div>
                <h2 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-1">
                  IMPORTANT SAFETY & PORTFOLIO NOTICE
                </h2>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-100">
                  {project.notice}
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Hero Section */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-widest border font-semibold"
              style={{
                borderColor: `${accentHex}60`,
                backgroundColor: `${accentHex}15`,
                color: accentTextHex,
              }}
            >
              {project.category}
            </span>

            {project.status && (
              <span className="px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-silver-muted">
                {project.status}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white mb-4">
            {project.title}
          </h1>

          {/* Full case study in progress banner for Cyber Lens */}
          {project.contentStatus === "placeholder" && (
            <div
              data-testid="placeholder-banner"
              className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-xs uppercase tracking-wider mb-6"
            >
              Full case study in progress.
            </div>
          )}

          {/* Abstract Cyberpunk Hero Graphic */}
          <div className="mb-6">
            <CyberpunkHeroVisual accent={project.iceberg.accent} title={project.title} />
          </div>

          {project.shortDescription && (
            <p className="text-base sm:text-xl text-silver-muted max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          )}
        </header>

        {/* Main Content Grid: Sticky Desktop Index + Detail Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Desktop Index Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-[11px] font-mono text-neon-cyan tracking-widest uppercase mb-3 border-b border-white/10 pb-2">
                PROJECT INDEX
              </h2>
              <nav aria-label="Project section index">
                <ul className="space-y-2 text-xs font-mono">
                  {project.details.whatItIs && (
                    <li>
                      <a href="#what-it-is" className="text-silver hover:text-neon-cyan transition-colors">
                        01. WHAT IT IS
                      </a>
                    </li>
                  )}
                  {project.details.features.length > 0 && (
                    <li>
                      <a href="#features" className="text-silver hover:text-neon-cyan transition-colors">
                        02. KEY FEATURES
                      </a>
                    </li>
                  )}
                  {project.techStack.length > 0 && (
                    <li>
                      <a href="#tech-stack" className="text-silver hover:text-neon-cyan transition-colors">
                        03. TECH STACK
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="#status-actions" className="text-silver hover:text-neon-cyan transition-colors">
                      04. STATUS & ACTIONS
                    </a>
                  </li>
                  <li>
                    <a href="#next-project" className="text-silver hover:text-neon-cyan transition-colors">
                      05. NEXT PROJECT
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content Details Area */}
          <div className="lg:col-span-9 space-y-10">
            {/* What It Is */}
            {project.details.whatItIs && (
              <section id="what-it-is" aria-labelledby="heading-what-it-is" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2
                    id="heading-what-it-is"
                    className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-3"
                  >
                    {"//"} WHAT IT IS
                  </h2>
                  <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                    {project.details.whatItIs}
                  </p>
                </GlassSurface>
              </section>
            )}

            {/* Problem & Solution (strictly omitted if null) */}
            {project.details.problem && (
              <section id="problem" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2 className="text-xs font-mono text-neon-magenta tracking-widest uppercase mb-3">
                    {"//"} THE PROBLEM
                  </h2>
                  <p className="text-base text-silver leading-relaxed">{project.details.problem}</p>
                </GlassSurface>
              </section>
            )}

            {project.details.solution && (
              <section id="solution" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2 className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-3">
                    {"//"} THE SOLUTION
                  </h2>
                  <p className="text-base text-silver leading-relaxed">{project.details.solution}</p>
                </GlassSurface>
              </section>
            )}

            {/* Key Features Grid */}
            {project.details.features.length > 0 && (
              <section id="features" aria-labelledby="heading-features" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2
                    id="heading-features"
                    className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-4"
                  >
                    {"//"} ARCHITECTURAL FEATURES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.details.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }} />
                        <span className="text-sm font-mono text-silver">{feature}</span>
                      </div>
                    ))}
                  </div>
                </GlassSurface>
              </section>
            )}

            {/* Role & Results (strictly omitted if null) */}
            {project.details.role && (
              <section id="role" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 rounded-2xl border border-white/10">
                  <h2 className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-2">
                    {"//"} MY ROLE
                  </h2>
                  <p className="text-sm text-silver">{project.details.role}</p>
                </GlassSurface>
              </section>
            )}

            {project.details.results && (
              <section id="results" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 rounded-2xl border border-white/10">
                  <h2 className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-2">
                    {"//"} RESULTS & IMPACT
                  </h2>
                  <p className="text-sm text-silver">{project.details.results}</p>
                </GlassSurface>
              </section>
            )}

            {/* Tech Stack Chips */}
            {project.techStack.length > 0 && (
              <section id="tech-stack" aria-labelledby="heading-tech" className="scroll-mt-24">
                <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2
                    id="heading-tech"
                    className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-4"
                  >
                    {"//"} TECHNOLOGY STACK
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#061B30] border border-neon-cyan/30 text-neon-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassSurface>
              </section>
            )}

            {/* Status & Action Links (PRD 2.1: null links are rendered aria-disabled "Coming soon" without fake href) */}
            <section id="status-actions" aria-labelledby="heading-actions" className="scroll-mt-24">
              <GlassSurface variant="deep" className="p-6 sm:p-8 rounded-2xl border border-white/10">
                <h2
                  id="heading-actions"
                  className="text-xs font-mono text-neon-cyan tracking-widest uppercase mb-4"
                >
                  {"//"} CODE & DEPLOYMENT
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  {/* GitHub button / status */}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-neon-cyan text-cp-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                      VIEW ON GITHUB &rarr;
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-silver-muted font-mono text-xs uppercase tracking-wider cursor-not-allowed select-none opacity-60"
                    >
                      GITHUB (COMING SOON)
                    </span>
                  )}

                  {/* Live Demo button / status */}
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-neon-magenta text-cp-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                      LIVE DEMO &rarr;
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-silver-muted font-mono text-xs uppercase tracking-wider cursor-not-allowed select-none opacity-60"
                    >
                      LIVE DEMO (COMING SOON)
                    </span>
                  )}
                </div>
              </GlassSurface>
            </section>

            {/* Next Project Circular Loop (PRD Section 8.5) */}
            <section
              id="next-project"
              aria-labelledby="heading-next-project"
              className="pt-6 border-t border-white/10 scroll-mt-24"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/5 to-[#061B30] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-mono text-silver-muted uppercase tracking-widest">
                    EXPLORE NEXT ICEBERG
                  </span>
                  <h3
                    id="heading-next-project"
                    className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mt-1"
                  >
                    {nextProject.title}
                  </h3>
                  <span className="text-xs font-mono text-neon-cyan uppercase">
                    [{nextProject.category}]
                  </span>
                </div>

                <Link
                  href={`/projects/${nextProject.slug}`}
                  data-testid="next-project-link"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neon-cyan text-cp-bg font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-neon-cyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>NEXT PROJECT</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
