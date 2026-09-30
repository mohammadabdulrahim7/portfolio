"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/types";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { useWorld } from "@/store/useWorld";

interface IcebergCardProps {
  project: Project;
  featured?: boolean;
}

export const IcebergCard: React.FC<IcebergCardProps> = ({ project, featured = false }) => {
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const { hoveredProjectSlug, setHoveredProjectSlug, setActiveProjectSlug, setTransitionState } = useWorld();

  const isCardHovered = hoveredProjectSlug === project.slug;

  const accentColors = {
    cyan: {
      border: "border-neon-cyan/40 hover:border-neon-cyan",
      badge: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
      glow: "hover:shadow-[0_0_30px_rgba(34,229,255,0.2)]",
      btn: "bg-neon-cyan/15 hover:bg-neon-cyan text-neon-cyan hover:text-cp-bg border-neon-cyan/40",
      line: "bg-neon-cyan",
    },
    magenta: {
      border: "border-neon-magenta/40 hover:border-neon-magenta",
      badge: "bg-neon-magenta/15 text-neon-magenta border-neon-magenta/30",
      glow: "hover:shadow-[0_0_30px_rgba(255,61,200,0.2)]",
      btn: "bg-neon-magenta/15 hover:bg-neon-magenta text-neon-magenta hover:text-cp-bg border-neon-magenta/40",
      line: "bg-neon-magenta",
    },
    blue: {
      border: "border-neon-blue/40 hover:border-neon-blue",
      badge: "bg-blue-500/15 text-[#6898FF] border-blue-500/30 font-semibold",
      glow: "hover:shadow-[0_0_30px_rgba(45,107,255,0.25)]",
      btn: "bg-blue-500/15 hover:bg-[#6898FF] text-[#6898FF] hover:text-cp-bg border-blue-500/40",
      line: "bg-neon-blue",
    },
  }[project.iceberg.accent];

  const handleOpenProject = () => {
    setActiveProjectSlug(project.slug);
    setTransitionState("entering");
  };

  return (
    <GlassSurface
      variant="deep"
      data-testid={`iceberg-card-${project.slug}`}
      onMouseEnter={() => setHoveredProjectSlug(project.slug)}
      onMouseLeave={() => {
        if (hoveredProjectSlug === project.slug) {
          setHoveredProjectSlug(null);
        }
      }}
      className={`group p-5 sm:p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
        accentColors.border
      } ${accentColors.glow} ${featured ? "lg:scale-105 z-10" : ""} ${
        isCardHovered ? "border-white/60 shadow-lg" : ""
      }`}
    >
      <div>
        {/* Top bar with category and accent line */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md border ${accentColors.badge}`}
          >
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-silver-muted">
            0{project.order} / 03
          </span>
        </div>

        {/* Iceberg SVG silhouette & cyber wireframe illustration */}
        <div
          aria-hidden="true"
          onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
          className="relative h-40 sm:h-44 mb-5 rounded-xl bg-gradient-to-b from-white/5 to-[#072A4F]/80 border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer md:cursor-default"
        >
          {/* Submerged waterline graphic */}
          <div className="absolute top-1/2 inset-x-0 h-px bg-white/20" />
          <span className="absolute top-[48%] right-2 text-[9px] font-mono text-white/40 uppercase tracking-widest">
            WATERLINE
          </span>

          {/* Iceberg geometric silhouette */}
          <svg
            className="w-32 h-32 sm:w-36 sm:h-36 transition-transform duration-500 group-hover:scale-110"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Above water peak */}
            <polygon
              points="50,15 75,50 25,50"
              className="fill-white/20 stroke-white/50"
              strokeWidth="1.5"
            />
            {/* Submerged mass (larger) */}
            <polygon
              points="25,50 75,50 85,85 50,92 15,85"
              className="fill-cyan-900/40 stroke-cyan-400/40"
              strokeWidth="1.5"
            />
            {/* Circuit veins */}
            <line
              x1="50"
              y1="25"
              x2="50"
              y2="85"
              className={`stroke-current ${
                project.iceberg.accent === "magenta"
                  ? "text-neon-magenta"
                  : project.iceberg.accent === "blue"
                  ? "text-neon-blue"
                  : "text-neon-cyan"
              }`}
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight text-white mb-2 group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>

        {/* Content Status Notice */}
        {project.contentStatus === "placeholder" ? (
          <div className="inline-block px-2.5 py-1 mb-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] uppercase tracking-wider">
            Full case study in progress.
          </div>
        ) : (
          project.shortDescription && (
            <p className="text-sm text-silver-muted font-body mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
          )
        )}

        {/* Safety Notice for Materna */}
        {project.notice && (
          <p className="text-[11px] text-amber-200/80 bg-amber-950/30 p-2.5 rounded border border-amber-500/20 mb-4">
            Notice: {project.notice}
          </p>
        )}

        {/* Tech Stack Chips */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-silver-muted"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-silver-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Area: Desktop Direct Link vs Mobile Tap Preview Button */}
      <div className="pt-2">
        {/* Desktop Direct Link */}
        <div className="hidden md:block">
          <Link
            href={`/projects/${project.slug}`}
            onClick={handleOpenProject}
            onFocus={() => setHoveredProjectSlug(project.slug)}
            onBlur={() => {
              if (hoveredProjectSlug === project.slug) setHoveredProjectSlug(null);
            }}
            className={`w-full inline-flex items-center justify-between px-5 py-3 rounded-xl border font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-[0.98] ${accentColors.btn}`}
          >
            <span>EXPLORE PROJECT</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Mobile: Tap trigger to show preview card, then OPEN PROJECT (PRD 8.3 & Test 5) */}
        <div className="md:hidden">
          {!mobilePreviewOpen ? (
            <button
              type="button"
              onClick={() => setMobilePreviewOpen(true)}
              className="w-full min-h-[48px] inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all active:bg-white/20"
            >
              TAP TO PREVIEW
            </button>
          ) : (
            <div
              data-testid="mobile-iceberg-preview"
              className="p-3 rounded-xl bg-[#030B14]/95 border border-neon-cyan/40 animate-in fade-in slide-in-from-bottom-2 space-y-3"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-silver">
                <span>PREVIEW ARCHITECTURE</span>
                <button
                  type="button"
                  onClick={() => setMobilePreviewOpen(false)}
                  className="text-silver-muted hover:text-white p-1"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-silver-muted">
                {project.shortDescription || "Full architectural case study available."}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                onClick={handleOpenProject}
                data-testid="open-project-btn"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neon-cyan text-cp-bg font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-neon-cyan/20 active:scale-[0.98]"
              >
                <span>OPEN PROJECT</span>
                <span>&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </GlassSurface>
  );
};
