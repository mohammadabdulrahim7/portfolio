"use client";

import React, { useState } from "react";
import { site } from "@/data/site";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Button } from "@/components/ui/Button";

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (!site.links.email) return;
    try {
      await navigator.clipboard.writeText(site.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const hasEmail = Boolean(site.links.email);
  const hasLinkedIn = Boolean(site.links.linkedin);
  const hasGitHub = Boolean(site.links.github);
  const hasResume = site.resume.available;

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-[100svh] flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-24 pb-24 md:pb-12 z-10"
    >
      <div className="max-w-4xl mx-auto w-full my-auto">
        <GlassSurface
          variant="deep"
          className="p-8 sm:p-12 md:p-16 rounded-3xl border border-white/20 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle cyan glow inside card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-neon-cyan/15 blur-3xl"
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan font-mono text-xs font-bold tracking-widest uppercase">
              ZONE 5 · CALM DEEP WATERS
            </div>

            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-white"
            >
              LET&apos;S BUILD SOMETHING REAL.
            </h2>

            <p className="text-base sm:text-lg text-silver/90 font-body max-w-xl mx-auto">
              Available for profitable freelance projects, collaborations, and research opportunities.
            </p>

            <p className="text-xs sm:text-sm font-mono text-neon-cyan tracking-wider">
              Have a problem worth building? Let&apos;s talk.
            </p>

            {/* Primary Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasEmail ? (
                <>
                  <Button
                    asAnchor
                    href={`mailto:${site.links.email}?subject=Project%20enquiry`}
                    variant="cyber"
                    size="lg"
                    className="w-full sm:w-auto font-bold tracking-wider"
                  >
                    START A CONVERSATION &rarr;
                  </Button>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-silver transition-colors cursor-pointer"
                  >
                    {copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
                  </button>
                </>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-silver-muted max-w-md mx-auto">
                  Direct email communication link will appear once verified by the owner.
                </div>
              )}
            </div>

            {/* Accessible Live Region for Copy Feedback */}
            <div aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard." : ""}
            </div>

            {/* Secondary Link Actions (PRD Section 2.1: null links are omitted) */}
            {(hasLinkedIn || hasGitHub || hasResume) && (
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
                {hasLinkedIn && (
                  <a
                    href={site.links.linkedin!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-silver hover:text-neon-cyan transition-colors"
                  >
                    LINKEDIN &rarr;
                  </a>
                )}
                {hasGitHub && (
                  <a
                    href={site.links.github!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-silver hover:text-neon-cyan transition-colors"
                  >
                    GITHUB &rarr;
                  </a>
                )}
                {hasResume && (
                  <>
                    <a
                      href={site.resume.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-silver hover:text-neon-cyan transition-colors"
                    >
                      VIEW RESUME
                    </a>
                    <a
                      href={site.resume.path}
                      download
                      className="text-silver hover:text-neon-cyan transition-colors"
                    >
                      DOWNLOAD RESUME
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </GlassSurface>
      </div>

      {/* Footer Row */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-silver-muted border-t border-white/10">
        <p className="tracking-wider uppercase">
          &copy; 2026 MOHAMMED ABDUL RAHIM. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[11px] text-silver-muted/80">
          Built with Next.js, React Three Fiber &amp; Tailwind CSS.
        </p>
        <a
          href="#home"
          className="hover:text-neon-cyan transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          <span>Back to surface</span>
          <span>&uarr;</span>
        </a>
      </div>
    </footer>
  );
};
