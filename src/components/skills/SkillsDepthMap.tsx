"use client";

import React, { useState } from "react";
import { skills } from "@/data/skills";
import { SkillCategory, SkillLevel } from "@/data/types";
import { GlassSurface } from "@/components/ui/GlassSurface";

export const SkillsDepthMap: React.FC = () => {
  const categories: SkillCategory[] = [
    "AI / Data",
    "Development",
    "Backend / Data",
    "AI Automation / Tools",
  ];

  // Mobile accordion state (all expanded by default for full accessibility)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "AI / Data": true,
    Development: true,
    "Backend / Data": true,
    "AI Automation / Tools": true,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderDepthRings = (level: SkillLevel) => {
    return (
      <div
        role="img"
        className="flex items-center gap-1.5"
        aria-label={`Proficiency: Level ${level} of 3 (Intermediate)`}
        title={`Level ${level} of 3: Intermediate practical proficiency`}
      >
        {[1, 2, 3].map((ring) => (
          <span
            key={ring}
            className={`w-2 h-2 rounded-full border transition-all ${
              ring <= level
                ? "bg-neon-cyan border-neon-cyan shadow-[0_0_8px_#22E5FF]"
                : "border-white/20 bg-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative min-h-[120svh] px-4 sm:px-8 lg:px-16 py-24 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 sm:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-900/40 border border-neon-cyan/30 text-neon-cyan font-mono text-xs font-bold tracking-widest uppercase mb-3">
            ZONE 3 · DEEPER WATER
          </div>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-4"
          >
            SKILLS DEPTH MAP
          </h2>
          <p className="text-silver-muted max-w-2xl text-sm sm:text-base font-body">
            A qualitative depth mapping of core technical proficiencies. Each indicator reflects
            foundational, intermediate, and advanced practical competencies. No synthetic percentages.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs font-mono text-silver-muted">
          <span className="uppercase text-white font-semibold">Scale:</span>
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              <span className="w-2 h-2 rounded-full border border-white/20" />
              <span className="w-2 h-2 rounded-full border border-white/20" />
            </span>
            <span>1 Foundational</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              <span className="w-2 h-2 rounded-full border border-white/20" />
            </span>
            <span>2 Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
              <span className="w-2 h-2 rounded-full bg-neon-cyan" />
            </span>
            <span>3 Advanced</span>
          </div>
        </div>

        {/* Categories Grid (2x2 on desktop, accordion/stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const isExpanded = expandedCategories[category];

            return (
              <GlassSurface
                key={category}
                variant="deep"
                className="p-5 sm:p-6 md:p-8 rounded-2xl border border-white/15 hover:border-neon-cyan/40 transition-all duration-300"
              >
                {/* Header with mobile tap accordion toggle */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between pb-3 border-b border-white/10 text-left focus:outline-none md:cursor-default"
                >
                  <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                    {category}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neon-cyan">
                      {categorySkills.length} SKILLS
                    </span>
                    <span className="md:hidden text-silver-muted font-mono text-xs">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </div>
                </button>

                {/* Skills List */}
                <div
                  className={`mt-4 space-y-2.5 transition-all duration-300 ${
                    isExpanded ? "block" : "hidden md:block"
                  }`}
                >
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all"
                    >
                      <span className="text-sm font-body font-medium text-silver">
                        {skill.name}
                      </span>
                      {renderDepthRings(skill.level)}
                    </div>
                  ))}
                </div>
              </GlassSurface>
            );
          })}
        </div>
      </div>
    </section>
  );
};
