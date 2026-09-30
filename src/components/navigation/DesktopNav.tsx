"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { useWorld } from "@/store/useWorld";
import { site } from "@/data/site";

export const DesktopNav: React.FC = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");
  const { activeSection } = useWorld();

  const navItems = [
    { label: "WORK", href: "/#work", id: "work" },
    { label: "SKILLS", href: "/#skills", id: "skills" },
    { label: "JOURNEY", href: "/#journey", id: "journey" },
    { label: "CONTACT", href: "/#contact", id: "contact" },
  ];

  return (
    <header className="hidden md:flex fixed top-6 inset-x-0 z-40 justify-center px-6 pointer-events-none">
      <GlassSurface
        as="nav"
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-full border border-white/20 shadow-2xl backdrop-blur-md"
      >
        {isProjectPage ? (
          <Link
            href="/#work"
            className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neon-cyan hover:text-white transition-colors"
          >
            <span>&larr;</span>
            <span>RETURN TO OCEAN</span>
          </Link>
        ) : (
          <Link
            href="/#home"
            className="font-display font-bold text-base tracking-tighter text-white hover:text-neon-cyan transition-colors"
          >
            MAR<span className="text-neon-cyan">.</span>
          </Link>
        )}

        {!isProjectPage && (
          <ul className="flex items-center gap-6 text-xs font-mono tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`transition-colors py-1 relative ${
                      isActive
                        ? "text-neon-cyan font-bold"
                        : "text-silver-muted hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#22E5FF]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
          {site.resume.available && (
            <a
              href={site.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-silver-muted hover:text-white transition-colors"
            >
              RESUME
            </a>
          )}
          <MotionToggle />
        </div>
      </GlassSurface>
    </header>
  );
};
