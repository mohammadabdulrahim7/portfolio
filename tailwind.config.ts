import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          surface: "var(--ocean-surface)",
          light: "var(--ocean-light)",
          mid: "var(--ocean-mid)",
          deep: "var(--ocean-deep)",
          abyss: "var(--ocean-abyss)",
        },
        sun: {
          warm: "var(--sun-warm)",
        },
        neon: {
          cyan: "var(--neon-cyan)",
          blue: "var(--neon-blue)",
          magenta: "var(--neon-magenta)",
        },
        cp: {
          bg: "var(--cp-bg)",
          panel: "var(--cp-panel)",
          line: "var(--cp-line)",
        },
        silver: {
          DEFAULT: "var(--silver)",
          muted: "var(--silver-muted)",
        },
        clay: {
          bg: "var(--clay-bg)",
          ink: "var(--clay-ink)",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
