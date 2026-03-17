import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        safe: {
          700: "#0f8f3f",
          600: "#18a64b",
          500: "#24c25a",
          300: "#8de7ab",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-x": {
          "0%,100%": {
            transform: "translateX(-8%) scale(1)",
            opacity: "0.32",
          },
          "50%": {
            transform: "translateX(8%) scale(1.06)",
            opacity: "0.62",
          },
        },
        "float-soft": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-link": {
          "0%,100%": { opacity: "0.6", boxShadow: "0 0 0 rgba(36,194,90,0)" },
          "50%": { opacity: "1", boxShadow: "0 0 18px rgba(36,194,90,0.55)" },
        },
        "link-dot": {
          "0%": { left: "-8px", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { left: "calc(100% - 2px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 520ms ease-out both",
        "card-in": "fade-up 620ms ease-out 120ms both",
        "aurora-x": "aurora-x 9s ease-in-out infinite",
        "float-soft": "float-soft 4.8s ease-in-out infinite",
        "pulse-link": "pulse-link 2.2s ease-in-out infinite",
        "link-dot": "link-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
