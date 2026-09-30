import React from "react";

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = "main",
  label = "Skip to main content",
}) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-neon-cyan focus:text-cp-bg focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white transition-all"
    >
      {label}
    </a>
  );
};
