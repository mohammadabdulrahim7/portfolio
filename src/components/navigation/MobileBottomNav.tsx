"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorld } from "@/store/useWorld";
import { MotionToggle } from "@/components/ui/MotionToggle";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");
  const { activeSection } = useWorld();

  const navItems = [
    {
      id: "home",
      label: "HOME",
      href: "/#home",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "work",
      label: "WORK",
      href: "/#work",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "SKILLS",
      href: "/#skills",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      id: "journey",
      label: "JOURNEY",
      href: "/#journey",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "CONTACT",
      href: "/#contact",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0E4A7A]/40 backdrop-blur-md border-b border-white/10">
        <Link href="/#home" className="font-display font-bold text-sm tracking-tight text-white">
          MAR<span className="text-neon-cyan">.</span>
        </Link>
        <MotionToggle />
      </div>

      {/* Mobile Bottom Glass Nav */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#06162C]/80 backdrop-blur-lg border-t border-white/15 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = !isProjectPage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center w-full h-full min-h-[48px] min-w-[48px] text-[10px] font-mono tracking-wider transition-colors select-none ${
                  isActive
                    ? "text-neon-cyan font-bold"
                    : "text-silver-muted hover:text-white"
                }`}
              >
                <div className={`p-1 rounded-full ${isActive ? "bg-neon-cyan/15 text-neon-cyan" : ""}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
