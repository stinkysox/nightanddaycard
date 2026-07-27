"use client";

import { useTheme } from "./ThemeProvider";
import { useMemo } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function AtmosphereBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // A beautiful starfield covering 100% of the background height
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: seededRandom(i * 3.1) * 100, // Covers full viewport height
        left: seededRandom(i * 7.7) * 100,
        size: 1 + seededRandom(i * 13.3) * 1.6,
        delay: seededRandom(i * 5.5) * 5,
        duration: 3 + seededRandom(i * 9.9) * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-[1200ms] ease-in-out">
      {/* ── SKY GRADIENTS ── */}
      {/* Dark Mode Sky */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          background: "radial-gradient(circle at 75% 15%, #18153c 0%, #0d0b28 35%, #050414 70%, #020208 100%)",
        }}
      />
      
      {/* Light Mode Sky */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          background: "radial-gradient(circle at 50% 25%, #fff6e8 0%, #fadfb2 30%, #f4cca1 55%, #ecd2b0 80%, #f2e9da 100%)",
        }}
      />

      {/* ── CELESTIAL BODIES ── */}
      {/* The Moon (Dark Mode) */}
      <div
        className="absolute transition-all duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          top: "10%",
          right: "15%",
          width: "120px",
          height: "120px",
          transform: isDark ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
        }}
      >
        {/* Soft atmospheric halo */}
        <div
          className="absolute inset-[-40px] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(235, 240, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Lunar Body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #f4f6fc 0%, #e0e5f5 40%, #c4cbdc 80%, #a2abc0 100%)",
            boxShadow: "0 0 35px 10px rgba(224, 230, 245, 0.4), inset -5px -5px 15px rgba(0,0,0,0.15)",
          }}
        />
        {/* Crescent Shadow Overlay */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: "#18153c",
            transform: "translate(-12px, -10px)",
            opacity: 0.88,
          }}
        />
      </div>

      {/* The Sun (Light Mode) */}
      <div
        className="absolute transition-all duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "8%",
          left: "50%",
          transform: isDark ? "translate(-50%, -40px) scale(0.9)" : "translate(-50%, 0) scale(1)",
          width: "160px",
          height: "160px",
        }}
      >
        {/* Massive warm solar glow */}
        <div
          className="absolute inset-[-80px] rounded-full opacity-40 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(255, 225, 150, 0.3) 0%, rgba(255, 180, 80, 0.1) 50%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
        {/* Solar Body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, #fff9e6 20%, #ffdf9e 55%, #ffa64d 90%, #ff8000 100%)",
            boxShadow: "0 0 50px 15px rgba(255, 215, 120, 0.35)",
          }}
        />
      </div>

      {/* ── STARS (Dark Mode Only, spread throughout the background) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 0.75 : 0 }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* ── FILM GRAIN OVERLAY ── */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}