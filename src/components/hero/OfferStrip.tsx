import React from "react";

export const OfferStrip: React.FC = () => {
  const chips = [
    "AI-POWERED PRODUCTS",
    "FULL-STACK WEB PLATFORMS",
    "DATA-DRIVEN TOOLS",
  ];

  return (
    <div className="pt-2">
      <p className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-silver/75 uppercase mb-2">
        WHAT I BUILD
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="px-3 py-1 text-[11px] md:text-xs font-mono font-semibold uppercase tracking-wider rounded-lg bg-white/10 text-silver border border-white/20"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
};
