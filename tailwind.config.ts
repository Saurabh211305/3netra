import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#000000",
        charcoal: "#111111",
        pine: {
          DEFAULT: "#0F3D3A",
          light: "#17534F",
          dark: "#0A2B29",
        },
        clay: {
          DEFAULT: "#B07878",
          light: "#C79A9A",
          dark: "#8F5E5E",
        },
        pearl: "#F9EBE5",
        white: "#FFFFFF",
        grey: {
          soft: "#6B6B6B",
          light: "#E8E8E8",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 6vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.25rem, 4.2vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-3": ["clamp(1.75rem, 2.6vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        scan: "scan 3.2s cubic-bezier(0.65,0,0.35,1) infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        scan: {
          "0%": { transform: "translateY(-4%)" },
          "50%": { transform: "translateY(104%)" },
          "100%": { transform: "translateY(-4%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
