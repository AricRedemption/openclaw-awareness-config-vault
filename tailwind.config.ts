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
        "pulse-link": {
          "0%,100%": { opacity: "0.6", boxShadow: "0 0 0 rgba(36,194,90,0)" },
          "50%": { opacity: "1", boxShadow: "0 0 18px rgba(36,194,90,0.55)" },
        },
      },
      animation: {
        "fade-up": "fade-up 520ms ease-out both",
        "card-in": "fade-up 620ms ease-out 120ms both",
        "pulse-link": "pulse-link 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
