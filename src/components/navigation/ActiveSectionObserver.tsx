"use client";

import { useEffect } from "react";
import { useWorld } from "@/store/useWorld";

export const ActiveSectionObserver: React.FC = () => {
  const { setActiveSection, setScrollProgress } = useWorld();

  useEffect(() => {
    // 1. Scroll progress tracker (0 to 1)
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = window.scrollY / totalScroll;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. Active section observer
    const sectionIds: ("home" | "work" | "skills" | "journey" | "contact")[] = [
      "home",
      "work",
      "skills",
      "journey",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as "home" | "work" | "skills" | "journey" | "contact";
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 3. Hash change listener
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") as "home" | "work" | "skills" | "journey" | "contact";
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
      observer.disconnect();
    };
  }, [setActiveSection, setScrollProgress]);

  return null;
};
