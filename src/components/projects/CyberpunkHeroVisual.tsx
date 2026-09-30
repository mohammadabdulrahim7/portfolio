import React from "react";

interface CyberpunkHeroVisualProps {
  accent: "cyan" | "magenta" | "blue";
  title: string;
}

export const CyberpunkHeroVisual: React.FC<CyberpunkHeroVisualProps> = ({ accent, title }) => {
  const accentHex = {
    cyan: "#22E5FF",
    magenta: "#FF3DC8",
    blue: "#2D6BFF",
  }[accent];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-56 sm:h-72 rounded-2xl bg-[#030914] border border-white/10 overflow-hidden flex items-center justify-center select-none shadow-2xl"
      style={{
        boxShadow: `inset 0 0 60px rgba(3, 11, 20, 0.9), 0 0 30px ${accentHex}20`,
      }}
    >
      {/* Background isometric grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, ${accentHex}40 1px, transparent 1px), linear-gradient(to bottom, ${accentHex}40 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Cyberpunk circular radar / schematic nodes */}
      <svg
        className="w-48 h-48 sm:w-60 sm:h-60 opacity-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Outer dashed targeting ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke={accentHex}
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.6"
        />

        {/* Concentric telemetry rings */}
        <circle cx="100" cy="100" r="60" stroke={accentHex} strokeWidth="1" opacity="0.3" />
        <circle cx="100" cy="100" r="35" stroke={accentHex} strokeWidth="1.5" opacity="0.8" />

        {/* Crosshair telemetry lines */}
        <line x1="15" y1="100" x2="185" y2="100" stroke={accentHex} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <line x1="100" y1="15" x2="100" y2="185" stroke={accentHex} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

        {/* Diagonal sensor markers */}
        <polygon
          points="100,50 145,100 100,150 55,100"
          stroke={accentHex}
          strokeWidth="1.2"
          fill={`${accentHex}10`}
          opacity="0.85"
        />

        {/* Core node */}
        <circle cx="100" cy="100" r="6" fill={accentHex} />
      </svg>

      {/* Stylized corner brackets */}
      <div
        className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2"
        style={{ borderColor: accentHex }}
      />
      <div
        className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2"
        style={{ borderColor: accentHex }}
      />
      <div
        className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2"
        style={{ borderColor: accentHex }}
      />
      <div
        className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2"
        style={{ borderColor: accentHex }}
      />

      {/* Top micro telemetry label */}
      <div className="absolute top-3 left-8 text-[10px] font-mono tracking-widest text-silver-muted uppercase">
        ARCH_SYS // {title}
      </div>

      {/* Bottom scanning telemetry bar */}
      <div className="absolute bottom-3 right-8 flex items-center gap-2 text-[9px] font-mono text-silver-muted tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentHex }} />
        <span>SYS_STATUS: ACTIVE</span>
      </div>
    </div>
  );
};
