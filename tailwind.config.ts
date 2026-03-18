import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070506",
        wine: "#661726",
        garnet: "#8f1d31",
        merlot: "#261014",
        champagne: "#d7c097",
        ivory: "#f4ece3",
        mist: "#d9cfc4",
        slate: "#9f9486"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      boxShadow: {
        premium: "0 28px 70px rgba(0, 0, 0, 0.42)",
        soft: "0 12px 30px rgba(0, 0, 0, 0.22)",
        glow: "0 0 0 1px rgba(215, 192, 151, 0.16), 0 24px 60px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        }
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        pulseSoft: "pulseSoft 3.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
