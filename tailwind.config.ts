import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0a0e27",
        "royal-black": "#0d0a12",
        "deep-emerald": "#0b3d2e",
        gold: {
          DEFAULT: "#d4af37",
          light: "#f4e5b2",
          dark: "#9c7a1f",
        },
        champagne: "#f7e7ce",
        ivory: "#fffdf5",
        "moonlight": "#e8ecf7",
        pearl: "#faf7f2",
        cream: "#fdf6e9",
        "soft-gold": "#e8c893",
        "rose-gold": "#e0b6a8",
        sandalwood: "#d9b48a",
        maroon: "#5c1a2b",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-playfair)", "serif"],
        script: ["var(--font-vibes)", "cursive"],
        body: ["var(--font-cormorant)", "serif"],
        elegant: ["var(--font-dmserif)", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%) translateY(0)" },
          "100%": { transform: "translateX(10%) translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "blur(40px)" },
          "50%": { opacity: "1", filter: "blur(60px)" },
        },
        "fall": {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(var(--drift, 40px)) rotate(360deg)", opacity: "0.2" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        drift: "drift 30s ease-in-out infinite alternate",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
