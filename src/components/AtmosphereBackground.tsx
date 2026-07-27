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

  // A natural starfield spread randomly across the viewport
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: seededRandom(i * 3.1) * 100,
        left: seededRandom(i * 7.7) * 100,
        size: 0.7 + seededRandom(i * 13.3) * 1.9,
        delay: seededRandom(i * 5.5) * 6,
        duration: 3 + seededRandom(i * 9.9) * 5,
        // a handful of stars get a sharper "sparkle" cross flare
        sparkle: seededRandom(i * 11.1) > 0.88,
      })),
    [],
  );

  // Gentle ambient clouds for Light Mode depth
  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 12 + seededRandom(i * 4.2) * 28, // upper region of the screen
        left: -10 + seededRandom(i * 8.1) * 110,
        scale: 0.8 + seededRandom(i * 2.3) * 0.7,
        opacity: 0.25 + seededRandom(i * 6.4) * 0.25,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-[1200ms] ease-in-out">
      <style>{`
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(25px) translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.05); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes moon-drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes sun-rotate {
          from { transform: translate(-50%, 0) rotate(0deg); }
          to { transform: translate(-50%, 0) rotate(360deg); }
        }
        @keyframes corona-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }
        .animate-cloud {
          animation: float-cloud 20s ease-in-out infinite;
        }
        .animate-solar-pulse {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        .animate-moon-drift {
          animation: moon-drift 12s ease-in-out infinite;
        }
        .animate-sun-rotate {
          animation: sun-rotate 60s linear infinite;
        }
        .animate-corona-breathe {
          animation: corona-breathe 5s ease-in-out infinite;
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-cloud,
          .animate-solar-pulse,
          .animate-twinkle,
          .animate-moon-drift,
          .animate-sun-rotate,
          .animate-corona-breathe {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── SKY GRADIENTS ── */}
      {/* Dark Mode Sky (Deep Space & Cosmic Glow) */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          background:
            "radial-gradient(circle at 75% 15%, #18143d 0%, #0d0a28 35%, #050314 70%, #010106 100%)",
        }}
      />

      {/* Dark Mode Cosmic Nebula Accent */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{
          opacity: isDark ? 0.4 : 0,
          background:
            "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Light Mode Sky (Warm Dawn / Sunset Atmosphere) */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          background:
            "radial-gradient(circle at 50% 20%, #fffbf2 0%, #fdebd0 25%, #f7d5b1 50%, #edd1b0 75%, #e4ceb4 100%)",
        }}
      />

      {/* Light Mode Horizon Ambient Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{
          opacity: isDark ? 0 : 0.6,
          background:
            "linear-gradient(to top, rgba(255, 237, 213, 0.8) 0%, rgba(254, 215, 170, 0.3) 40%, transparent 100%)",
        }}
      />

      {/* ── LIGHT MODE AMBIENT CLOUDS ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        {clouds.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-full animate-cloud"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `clamp(120px, ${20 * c.scale}vw, ${240 * c.scale}px)`,
              height: `${70 * c.scale}px`,
              opacity: c.opacity,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,245,235,0.4) 50%, transparent 80%)",
              filter: "blur(18px)",
              animationDelay: `${c.id * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── CELESTIAL BODIES ── */}

      {/* ── MOON (Dark Mode) ── */}
      <div
        className="absolute transition-all duration-[1200ms] ease-in-out animate-moon-drift"
        style={{
          opacity: isDark ? 1 : 0,
          top: "8%",
          right: "12%",
          width: "clamp(84px, 16vw, 150px)",
          height: "clamp(84px, 16vw, 150px)",
          transform: isDark
            ? "translateY(0) scale(1)"
            : "translateY(50px) scale(0.85)",
        }}
      >
        {/* Outer atmospheric halo — soft, wide, photographic */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-70%",
            background:
              "radial-gradient(circle, rgba(210, 222, 255, 0.16) 0%, rgba(170, 190, 255, 0.07) 40%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        {/* Inner glow ring, tighter and brighter */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-22%",
            background:
              "radial-gradient(circle, rgba(230, 238, 255, 0.28) 0%, rgba(200, 215, 255, 0.1) 55%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />

        {/* Base lunar disc with realistic multi-tone shading */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #e4e9f2 0%, #c7cedd 22%, #a9b2c4 48%, #838ea3 72%, #5d6579 100%)",
            boxShadow:
              "inset -14px -14px 30px rgba(0,0,0,0.35), inset 6px 6px 18px rgba(255,255,255,0.15), 0 0 30px 4px rgba(190, 200, 225, 0.2)",
          }}
        >
          {/* Maria (dark seas) — irregular, overlapping, muted blue-grey */}
          <div
            className="absolute inset-0 opacity-80 mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 28%, rgba(97,105,128,0.55) 0%, transparent 22%), radial-gradient(circle at 58% 20%, rgba(110,118,138,0.45) 0%, transparent 20%), radial-gradient(circle at 68% 45%, rgba(87,94,114,0.5) 0%, transparent 26%), radial-gradient(circle at 40% 55%, rgba(101,108,128,0.4) 0%, transparent 30%), radial-gradient(circle at 25% 70%, rgba(93,100,120,0.4) 0%, transparent 24%), radial-gradient(circle at 78% 68%, rgba(105,112,132,0.35) 0%, transparent 22%)",
              filter: "blur(2px)",
            }}
          />

          {/* Fine crater speckling for texture at small scale */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.25) 0%, transparent 3%), radial-gradient(circle at 62% 15%, rgba(255,255,255,0.2) 0%, transparent 2.5%), radial-gradient(circle at 80% 55%, rgba(255,255,255,0.18) 0%, transparent 2%), radial-gradient(circle at 45% 78%, rgba(255,255,255,0.2) 0%, transparent 3%), radial-gradient(circle at 15% 82%, rgba(0,0,0,0.2) 0%, transparent 3%), radial-gradient(circle at 88% 30%, rgba(0,0,0,0.18) 0%, transparent 2.5%)",
            }}
          />

          {/* Soft realistic terminator shadow (waxing gibbous look) */}
          <div
            className="absolute inset-[-8%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 80% 22%, rgba(6, 6, 18, 0.97) 0%, rgba(8, 8, 22, 0.9) 30%, rgba(8, 8, 22, 0.55) 48%, rgba(8, 8, 22, 0.1) 62%, transparent 72%)",
              transform: "translate(-6%, -4%)",
            }}
          />

          {/* Rim light on the illuminated edge */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "inset 3px 3px 6px rgba(255,255,255,0.35)",
            }}
          />
        </div>
      </div>

      {/* ── SUN (Light Mode) ── */}
      <div
        className="absolute transition-all duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "6%",
          left: "50%",
          transform: isDark
            ? "translate(-50%, -50px) scale(0.85)"
            : "translate(-50%, 0) scale(1)",
          width: "clamp(90px, 20vw, 160px)",
          height: "clamp(90px, 20vw, 160px)",
        }}
      >
        {/* Massive atmospheric heat aura */}
        <div
          className="absolute rounded-full animate-corona-breathe"
          style={{
            inset: "-90%",
            background:
              "radial-gradient(circle, rgba(255, 235, 175, 0.35) 0%, rgba(255, 195, 110, 0.14) 45%, transparent 75%)",
            filter: "blur(clamp(28px, 6vw, 55px))",
          }}
        />

        {/* Rotating radiant rays — the signature magical touch */}
        <div
          className="absolute animate-sun-rotate"
          style={{
            inset: "-120%",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="rayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,236,180,0.5)" />
                <stop offset="100%" stopColor="rgba(255,236,180,0)" />
              </linearGradient>
            </defs>
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                x="98.5"
                y="0"
                width="3"
                height="90"
                fill="url(#rayGrad)"
                transform={`rotate(${i * 30}, 100, 100)`}
              />
            ))}
          </svg>
        </div>

        {/* Outer corona halo */}
        <div
          className="absolute rounded-full opacity-60"
          style={{
            inset: "-27%",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 220, 140, 0.4) 40%, rgba(255, 170, 70, 0.1) 70%, transparent 100%)",
            filter: "blur(clamp(10px, 3vw, 20px))",
          }}
        />

        {/* Bright core solar body with limb darkening */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #ffffff 0%, #fffbf0 20%, #fff2cf 40%, #fde6b6 62%, #f9be7b 85%, #f2932f 100%)",
            boxShadow:
              "0 0 clamp(30px,7vw,55px) clamp(10px,2.5vw,20px) rgba(253, 224, 71, 0.45), 0 0 clamp(60px,14vw,110px) clamp(20px,5vw,38px) rgba(251, 146, 60, 0.25)",
          }}
        />

        {/* Subtle granulation texture on the disc */}
        <div
          className="absolute inset-0 rounded-full opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 8%), radial-gradient(circle at 60% 55%, rgba(255,255,255,0.4) 0%, transparent 7%), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.35) 0%, transparent 6%), radial-gradient(circle at 45% 75%, rgba(180,110,20,0.3) 0%, transparent 8%)",
          }}
        />
      </div>

      {/* ── STARS (Dark Mode Only) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 0.85 : 0 }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full bg-white"
              style={{ opacity: 0.85 }}
            />
            {s.sparkle && (
              <div
                className="absolute rounded-full"
                style={{
                  inset: `-${s.size * 1.5}px`,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── FILM GRAIN OVERLAY ── */}
      <div
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
