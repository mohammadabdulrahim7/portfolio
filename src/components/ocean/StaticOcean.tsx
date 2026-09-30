import React from "react";

export const StaticOcean: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      data-testid="static-ocean-fallback"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 5-zone vertical ocean gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #BFE6FF 0%, #2E9BD6 18%, #1F7FBF 40%, #0E4A7A 68%, #072A4F 100%)",
        }}
      />

      {/* Sun glint glow at surface */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FFD9A0]/20 blur-[120px]" />

      {/* Underwater light shafts (additive soft gradients) */}
      <div
        className="absolute top-[20%] left-[-10%] w-[120%] h-[40%] opacity-20 transform -rotate-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, transparent 60%, rgba(255,255,255,0.08) 80%, transparent 100%)",
        }}
      />

      {/* Decorative Whale Silhouette (Far background lane, stylized smooth shape) */}
      <div className="absolute top-[18%] right-[5%] opacity-15 w-72 h-36 hidden md:block">
        <svg viewBox="0 0 200 80" fill="currentColor" className="text-white">
          {/* Whale body, flukes, and flipper */}
          <path d="M10,40 C30,20 80,15 130,25 C160,30 185,45 195,50 C185,55 170,52 155,48 C140,55 110,65 70,62 C40,60 20,52 10,40 Z" />
          <path d="M185,48 C192,42 200,38 200,38 C195,46 195,54 200,60 C194,56 188,52 185,48 Z" />
          <path d="M80,45 C85,58 75,68 70,65 C68,60 72,50 80,45 Z" />
        </svg>
      </div>

      {/* Deep Zone Whale Silhouette (Calm hold in Z4/Z5) */}
      <div className="absolute bottom-[22%] left-[4%] opacity-10 w-80 h-40 hidden lg:block">
        <svg viewBox="0 0 200 80" fill="currentColor" className="text-cyan-200">
          <path d="M190,40 C170,20 120,15 70,25 C40,30 15,45 5,50 C15,55 30,52 45,48 C60,55 90,65 130,62 C160,60 180,52 190,40 Z" />
          <path d="M15,48 C8,42 0,38 0,38 C5,46 5,54 0,60 C6,56 12,52 15,48 Z" />
        </svg>
      </div>

      {/* Bioluminescent Jellyfish Silhouettes in Z3-Z4 */}
      <div className="absolute top-[52%] left-[12%] opacity-30 w-16 h-28 hidden sm:block">
        <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" className="text-neon-cyan">
          {/* Bell */}
          <path d="M10,40 C10,15 50,15 50,40 C45,43 15,43 10,40 Z" fill="rgba(34, 229, 255, 0.25)" strokeWidth="1.5" />
          {/* Tentacles */}
          <path d="M20,42 Q15,70 25,95" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M30,43 Q35,70 30,98" strokeWidth="1.2" />
          <path d="M40,42 Q45,70 35,95" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="absolute top-[64%] right-[15%] opacity-25 w-20 h-32 hidden sm:block">
        <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" className="text-neon-cyan">
          <path d="M10,40 C10,15 50,15 50,40 C45,43 15,43 10,40 Z" fill="rgba(34, 229, 255, 0.2)" strokeWidth="1.5" />
          <path d="M22,42 Q28,70 20,95" strokeWidth="1" />
          <path d="M32,43 Q25,70 32,98" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M38,42 Q32,70 42,95" strokeWidth="1" />
        </svg>
      </div>

      {/* Restrained Magenta accent jellyfish (<= 1 in 4 jellyfish has magenta per PRD 7.4) */}
      <div className="absolute top-[75%] left-[25%] opacity-20 w-14 h-24 hidden md:block">
        <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" className="text-neon-magenta">
          <path d="M12,38 C12,18 48,18 48,38 C42,41 18,41 12,38 Z" fill="rgba(255, 61, 200, 0.2)" strokeWidth="1.5" />
          <path d="M22,40 Q18,65 24,90" strokeWidth="1" />
          <path d="M30,41 Q34,65 30,92" strokeWidth="1.2" />
          <path d="M38,40 Q42,65 36,90" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};
