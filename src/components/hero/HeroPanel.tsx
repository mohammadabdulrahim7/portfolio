import React from "react";
import { Button } from "@/components/ui/Button";
import { OfferStrip } from "./OfferStrip";
import { site } from "@/data/site";

export const HeroPanel: React.FC = () => {
  return (
    <div className="navy-scrim w-full max-w-2xl p-6 sm:p-10 text-left border border-white/20">
      <div className="space-y-4">
        {/* Micro-label */}
        <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/25 text-neon-cyan text-xs font-mono font-bold tracking-widest uppercase">
          {site.role}
        </div>

        {/* H1 Name */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white leading-[1.08] break-words drop-shadow-sm">
          {site.name}
        </h1>

        {/* Statement */}
        <p className="text-base sm:text-lg lg:text-xl font-bold font-display uppercase text-silver tracking-tight">
          {site.statement}
        </p>

        {/* Concept statement */}
        <p className="text-xs sm:text-sm text-silver/85 leading-relaxed font-body font-medium max-w-xl">
          {site.concept}
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            asAnchor
            href="#work"
            variant="primary"
            size="md"
            className="w-full sm:w-auto text-xs sm:text-sm font-bold tracking-wider"
          >
            EXPLORE MY WORK &darr;
          </Button>
          <Button
            asAnchor
            href="#contact"
            variant="outline"
            size="md"
            className="w-full sm:w-auto text-xs sm:text-sm font-bold tracking-wider !border-white/40 !text-white hover:!bg-white/10"
          >
            LET&apos;S BUILD
          </Button>

          {/* Tertiary Resume actions: hidden until resume.available per PRD 2.2 & 8.2 */}
          {site.resume.available && (
            <div className="flex items-center gap-2 pt-1 text-xs font-mono">
              <a
                href={site.resume.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:underline font-semibold"
              >
                VIEW RESUME
              </a>
              <span className="text-silver/40">·</span>
              <a
                href={site.resume.path}
                download
                className="text-neon-cyan hover:underline font-semibold"
              >
                DOWNLOAD RESUME
              </a>
            </div>
          )}
        </div>

        {/* WHAT I BUILD Strip */}
        <div className="pt-2 border-t border-white/15">
          <OfferStrip />
        </div>
      </div>
    </div>
  );
};
