"use client";

import { useTheme } from "./ThemeProvider";
import { useMemo } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const STAR_TINTS = ["#ffffff", "#cfd8ff", "#ffe9c7"];

// Ported from FairyLights.tsx — each palette defines the comet's gradient and glow colour.
const SHOOTING_STAR_PALETTES = [
  {
    gradient: "rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,1) 100%",
    glow: "rgba(255,255,255,0.9)",
  },
  {
    gradient: "rgba(255,180,40,0) 0%, rgba(255,180,40,0.25) 40%, rgba(255,210,100,1) 100%",
    glow: "rgba(255,190,60,0.95)",
  },
  {
    gradient: "rgba(255,110,30,0) 0%, rgba(255,110,30,0.2) 40%, rgba(255,150,70,1) 100%",
    glow: "rgba(255,120,40,0.9)",
  },
  {
    gradient: "rgba(0,255,120,0) 0%, rgba(0,255,120,0.2) 40%, rgba(120,255,180,1) 100%",
    glow: "rgba(0,255,120,1)",
  },
  {
    gradient: "rgba(80,220,255,0) 0%, rgba(80,220,255,0.2) 40%, rgba(160,240,255,1) 100%",
    glow: "rgba(80,220,255,0.95)",
  },
  {
    gradient: "rgba(180,80,255,0) 0%, rgba(180,80,255,0.2) 40%, rgba(220,160,255,1) 100%",
    glow: "rgba(190,90,255,0.95)",
  },
  {
    gradient: "rgba(255,80,160,0) 0%, rgba(255,80,160,0.2) 40%, rgba(255,160,210,1) 100%",
    glow: "rgba(255,80,160,0.9)",
  },
  {
    gradient: "rgba(60,140,255,0) 0%, rgba(60,140,255,0.2) 40%, rgba(140,200,255,1) 100%",
    glow: "rgba(60,150,255,0.95)",
  },
];

export default function AtmosphereBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Distant starfield — smaller, dimmer, slower: gives the sky real depth.
  const farStars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: seededRandom(i * 2.3) * 60,
        left: seededRandom(i * 6.1) * 100,
        size: 0.5 + seededRandom(i * 9.7) * 0.8,
        delay: seededRandom(i * 4.4) * 8,
        duration: 5 + seededRandom(i * 8.8) * 6,
      })),
    [],
  );

  // Foreground starfield — the original layer, kept for the bright twinkles.
  const nearStars = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        top: seededRandom(i * 3.1) * 68,
        left: seededRandom(i * 7.7) * 100,
        size: 0.9 + seededRandom(i * 13.3) * 1.7,
        delay: seededRandom(i * 5.5) * 6,
        duration: 3 + seededRandom(i * 9.9) * 5,
        sparkle: seededRandom(i * 11.1) > 0.87,
        tint: STAR_TINTS[Math.floor(seededRandom(i * 15.9) * STAR_TINTS.length)],
      })),
    [],
  );

  // Shooting stars — ported from FairyLights.tsx.
  // Uses seededRandom (matching the rest of this file) instead of Math.random().
  // Each star gets a palette, individual length/travel/duration/repeatDelay,
  // and CSS custom properties so a single shared @keyframes handles the motion.
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => {
        const paletteIndex = Math.floor(
          seededRandom(i * 23.5) * SHOOTING_STAR_PALETTES.length,
        );
        const palette = SHOOTING_STAR_PALETTES[paletteIndex];
        const length = Math.round(90 + seededRandom(i * 41.3) * 55); // 90–145 px
        const travel = Math.round(480 + seededRandom(i * 37.7) * 180); // 480–660 px
        const duration = 0.65 + seededRandom(i * 53.1) * 0.45; // 0.65–1.10 s
        const repeatDelay = 9 + seededRandom(i * 61.7) * 9; // 9–18 s
        // Total CSS animation-duration = streak + idle time.
        const cycle = duration + repeatDelay;
        // Staggered initial delay mirrors file 2: i*5 + rand*4
        const delay = i * 5 + seededRandom(i * 29.3) * 4;

        return {
          id: i,
          top: 4 + seededRandom(i * 17.3) * 22,   // 4–26 %
          left: 52 + seededRandom(i * 21.9) * 36,  // 52–88 %
          length,
          travel,
          duration,
          cycle,
          delay,
          gradient: palette.gradient,
          glow: palette.glow,
        };
      }),
    [],
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 12 + seededRandom(i * 4.2) * 28,
        left: -10 + seededRandom(i * 8.1) * 110,
        scale: 0.8 + seededRandom(i * 2.3) * 0.7,
        opacity: 0.25 + seededRandom(i * 6.4) * 0.25,
      })),
    [],
  );

  // Light-mode birds drifting across the upper sky.
  const birds = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: 18 + seededRandom(i * 14.7) * 16,
        scale: 0.7 + seededRandom(i * 5.3) * 0.5,
        delay: i * 7,
        duration: 34 + seededRandom(i * 9.1) * 14,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ contain: "layout style paint" }}
    >
      <style>{`
        /*
         * ── PERFORMANCE NOTES ──
         * This pass only touches compositing hints, not visuals or logic:
         *  - transform functions in every @keyframes below use the 3D form
         *    (translate3d / scale3d) instead of 2D. Mathematically identical
         *    on a flat plane (z is always 0/1), but it makes layer promotion
         *    reliable across older Safari/iOS and Android WebViews, which
         *    sometimes fall back to slow CPU compositing for 2D-only transforms
         *    combined with filter/box-shadow (moon, sun, aurora, stars).
         *  - will-change + backface-visibility are added to every animate-*
         *    class so the browser promotes these to their own GPU layer up
         *    front, instead of promoting/demoting mid-animation (a common
         *    source of first-frame jank).
         *  - will-change is released back to 'auto' under reduced-motion so
         *    idle GPU layers aren't kept around once animation stops.
         */
        @keyframes float-cloud { 0%,100%{ transform: translate3d(0,0,0); } 50%{ transform: translate3d(25px,-10px,0); } }
        @keyframes twinkle-far { 0%,100%{ opacity:.15; } 50%{ opacity:.65; } }
        @keyframes twinkle { 0%,100%{ opacity:.2; transform:scale3d(.85,.85,1); } 50%{ opacity:1; transform:scale3d(1.15,1.15,1); } }
        @keyframes moon-drift { 0%,100%{ transform: translate3d(0,0,0) rotate(0deg); } 50%{ transform: translate3d(0,-10px,0) rotate(1.5deg); } }
        @keyframes sun-rotate { from{ transform: translate3d(-50%,0,0) rotate(0deg); } to{ transform: translate3d(-50%,0,0) rotate(360deg); } }
        @keyframes corona-breathe { 0%,100%{ opacity:.55; transform:scale3d(1,1,1); } 50%{ opacity:.85; transform:scale3d(1.08,1.08,1); } }
        @keyframes aurora-drift-1 { 0%,100%{ transform: translate3d(-4%,0,0); } 50%{ transform: translate3d(4%,-3%,0); } }
        @keyframes aurora-drift-2 { 0%,100%{ transform: translate3d(3%,0,0); } 50%{ transform: translate3d(-5%,2%,0); } }

        /*
         * Shooting-star keyframe — ported from FairyLights.tsx.
         *
         * The animation-duration is set to the FULL cycle (streak + idle) per star,
         * so the keyframe percentages below approximate the opacity timing from file 2:
         *   times: [0, 0.08, 0.82, 1] mapped onto the active streak portion (~7 % of cycle).
         *
         * CSS custom properties on each element supply the per-star travel distance and
         * length (via width), so a single shared @keyframes handles all four comets.
         *
         * rotate(135deg) matches the direction used in FairyLights.
         */
        @keyframes shoot-v2 {
          0%    { transform: translate3d(0,0,0) rotate(135deg); opacity: 0; }
          0.6%  { opacity: 1; }
          6.5%  { transform: translate3d(var(--ss-tx), var(--ss-ty), 0) rotate(135deg); opacity: 1; }
          7.5%  { transform: translate3d(var(--ss-tx), var(--ss-ty), 0) rotate(135deg); opacity: 0; }
          7.51% { transform: translate3d(0,0,0) rotate(135deg); opacity: 0; }
          100%  { transform: translate3d(0,0,0) rotate(135deg); opacity: 0; }
        }

        @keyframes bird-fly { 0%{ transform: translate3d(-10vw,0,0); } 100%{ transform: translate3d(110vw,0,0); } }
        @keyframes bird-flap { 0%,100%{ transform: scale3d(1,1,1); } 50%{ transform: scale3d(1,0.5,1); } }
        @keyframes horizon-shimmer { 0%,100%{ opacity:.6; } 50%{ opacity:.85; } }

        .animate-cloud { animation: float-cloud 20s ease-in-out infinite; will-change: transform; backface-visibility: hidden; }
        .animate-twinkle-far { animation: twinkle-far 6s ease-in-out infinite; will-change: opacity; }
        .animate-twinkle { animation: twinkle 4s ease-in-out infinite; will-change: transform, opacity; backface-visibility: hidden; }
        .animate-moon-drift { animation: moon-drift 12s ease-in-out infinite; will-change: transform; backface-visibility: hidden; }
        .animate-sun-rotate { animation: sun-rotate 60s linear infinite; will-change: transform; backface-visibility: hidden; }
        .animate-corona-breathe { animation: corona-breathe 5s ease-in-out infinite; will-change: transform, opacity; backface-visibility: hidden; }
        .animate-aurora-1 { animation: aurora-drift-1 18s ease-in-out infinite; will-change: transform; backface-visibility: hidden; }
        .animate-aurora-2 { animation: aurora-drift-2 22s ease-in-out infinite; will-change: transform; backface-visibility: hidden; }
        .animate-shoot-v2 { animation: shoot-v2 linear infinite; will-change: transform, opacity; backface-visibility: hidden; }
        .animate-bird { animation: bird-fly linear infinite; will-change: transform; backface-visibility: hidden; }
        .animate-bird-wing { animation: bird-flap 0.5s ease-in-out infinite; transform-origin: center; will-change: transform; }
        .animate-horizon { animation: horizon-shimmer 8s ease-in-out infinite; will-change: opacity; }

        @media (prefers-reduced-motion: reduce) {
          .animate-cloud, .animate-twinkle-far, .animate-twinkle, .animate-moon-drift,
          .animate-sun-rotate, .animate-corona-breathe, .animate-aurora-1, .animate-aurora-2,
          .animate-shoot-v2, .animate-bird, .animate-bird-wing, .animate-horizon {
            animation: none !important;
            will-change: auto !important;
          }
        }
      `}</style>

      {/* ── SKY GRADIENTS ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          background:
            "radial-gradient(circle at 75% 15%, #1c1745 0%, #100c30 32%, #070518 66%, #020109 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{
          opacity: isDark ? 0.45 : 0,
          background:
            "radial-gradient(circle at 80% 20%, rgba(129,140,248,0.16) 0%, rgba(192,132,252,0.09) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Aurora ribbons — dark mode only, drifting slowly for a "living sky" */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{ opacity: isDark ? 0.55 : 0, mixBlendMode: "screen", willChange: "opacity" }}
      >
        <div
          className="absolute animate-aurora-1"
          style={{
            top: "6%",
            left: "-10%",
            width: "70%",
            height: "34%",
            background:
              "radial-gradient(ellipse at center, rgba(94,234,212,0.22) 0%, rgba(94,234,212,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute animate-aurora-2"
          style={{
            top: "16%",
            right: "-15%",
            width: "60%",
            height: "30%",
            background:
              "radial-gradient(ellipse at center, rgba(196,181,253,0.2) 0%, rgba(196,181,253,0) 70%)",
            filter: "blur(44px)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          background:
            "radial-gradient(circle at 50% 20%, #fffbf2 0%, #fdebd0 25%, #f7d5b1 50%, #edd1b0 75%, #e4ceb4 100%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{
          opacity: isDark ? 0 : 0.6,
          background:
            "linear-gradient(to top, rgba(255,237,213,0.8) 0%, rgba(254,215,170,0.3) 40%, transparent 100%)",
        }}
      />

      {/* ── LIGHT MODE CLOUDS ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{ opacity: isDark ? 0 : 1, contain: "layout style" }}
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

      {/* ── LIGHT MODE BIRDS ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none"
        style={{ opacity: isDark ? 0 : 0.55, contain: "layout style" }}
      >
        {birds.map((b) => (
          <div
            key={b.id}
            className="absolute animate-bird"
            style={{
              top: `${b.top}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          >
            <svg
              width={34 * b.scale}
              height={14 * b.scale}
              viewBox="0 0 34 14"
              className="animate-bird-wing"
            >
              <path
                d="M0 7 Q8 0 17 7 Q26 0 34 7"
                stroke="rgba(90,68,46,0.55)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* ── MOON (Dark Mode) ── */}
      <div
        className="absolute transition-[opacity,transform] duration-[1200ms] ease-in-out animate-moon-drift"
        style={{
          opacity: isDark ? 1 : 0,
          top: "8%",
          right: "12%",
          width: "clamp(84px, 16vw, 150px)",
          height: "clamp(84px, 16vw, 150px)",
          transform: isDark ? "translateY(0) scale(1)" : "translateY(50px) scale(0.85)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: "-70%",
            background:
              "radial-gradient(circle, rgba(210,222,255,0.16) 0%, rgba(170,190,255,0.07) 40%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: "-22%",
            background:
              "radial-gradient(circle, rgba(230,238,255,0.28) 0%, rgba(200,215,255,0.1) 55%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #e4e9f2 0%, #c7cedd 22%, #a9b2c4 48%, #838ea3 72%, #5d6579 100%)",
            boxShadow:
              "inset -14px -14px 30px rgba(0,0,0,0.35), inset 6px 6px 18px rgba(255,255,255,0.15), 0 0 30px 4px rgba(190,200,225,0.2)",
          }}
        >
          <div
            className="absolute inset-0 opacity-80 mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 28%, rgba(97,105,128,0.55) 0%, transparent 22%), radial-gradient(circle at 58% 20%, rgba(110,118,138,0.45) 0%, transparent 20%), radial-gradient(circle at 68% 45%, rgba(87,94,114,0.5) 0%, transparent 26%), radial-gradient(circle at 40% 55%, rgba(101,108,128,0.4) 0%, transparent 30%), radial-gradient(circle at 25% 70%, rgba(93,100,120,0.4) 0%, transparent 24%), radial-gradient(circle at 78% 68%, rgba(105,112,132,0.35) 0%, transparent 22%)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.25) 0%, transparent 3%), radial-gradient(circle at 62% 15%, rgba(255,255,255,0.2) 0%, transparent 2.5%), radial-gradient(circle at 80% 55%, rgba(255,255,255,0.18) 0%, transparent 2%), radial-gradient(circle at 45% 78%, rgba(255,255,255,0.2) 0%, transparent 3%), radial-gradient(circle at 15% 82%, rgba(0,0,0,0.2) 0%, transparent 3%), radial-gradient(circle at 88% 30%, rgba(0,0,0,0.18) 0%, transparent 2.5%)",
            }}
          />
          <div
            className="absolute inset-[-8%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 80% 22%, rgba(6,6,18,0.97) 0%, rgba(8,8,22,0.9) 30%, rgba(8,8,22,0.55) 48%, rgba(8,8,22,0.1) 62%, transparent 72%)",
              transform: "translate(-6%, -4%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "inset 3px 3px 6px rgba(255,255,255,0.35)" }}
          />
        </div>
      </div>

      {/* ── SUN (Light Mode) ── */}
      <div
        className="absolute transition-[opacity,transform] duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "6%",
          left: "50%",
          transform: isDark ? "translate(-50%, -50px) scale(0.85)" : "translate(-50%, 0) scale(1)",
          width: "clamp(90px, 20vw, 160px)",
          height: "clamp(90px, 20vw, 160px)",
        }}
      >
        {/* Soft volumetric godrays fanning down through the scene */}
        <div className="absolute inset-0" style={{ opacity: isDark ? 0 : 0.6 }}>
          {[-16, -8, 0, 8, 16].map((angle) => (
            <div
              key={angle}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "5px",
                height: "60vh",
                background:
                  "linear-gradient(to bottom, rgba(255,244,214,0.32), rgba(255,244,214,0) 78%)",
                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                transformOrigin: "top center",
                filter: "blur(7px)",
              }}
            />
          ))}
        </div>

        <div
          className="absolute rounded-full animate-corona-breathe"
          style={{
            inset: "-90%",
            background:
              "radial-gradient(circle, rgba(255,235,175,0.35) 0%, rgba(255,195,110,0.14) 45%, transparent 75%)",
            filter: "blur(clamp(28px, 6vw, 55px))",
          }}
        />
        <div
          className="absolute animate-sun-rotate"
          style={{ inset: "-120%", left: "50%", transform: "translate(-50%, 0)" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ overflow: "visible" }}>
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
        <div
          className="absolute rounded-full opacity-60"
          style={{
            inset: "-27%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,220,140,0.4) 40%, rgba(255,170,70,0.1) 70%, transparent 100%)",
            filter: "blur(clamp(10px, 3vw, 20px))",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #ffffff 0%, #fffbf0 20%, #fff2cf 40%, #fde6b6 62%, #f9be7b 85%, #f2932f 100%)",
            boxShadow:
              "0 0 clamp(30px,7vw,55px) clamp(10px,2.5vw,20px) rgba(253,224,71,0.45), 0 0 clamp(60px,14vw,110px) clamp(20px,5vw,38px) rgba(251,146,60,0.25)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 8%), radial-gradient(circle at 60% 55%, rgba(255,255,255,0.4) 0%, transparent 7%), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.35) 0%, transparent 6%), radial-gradient(circle at 45% 75%, rgba(180,110,20,0.3) 0%, transparent 8%)",
          }}
        />
      </div>

      {/* ── FAR STARS (dim, small, slow — dark mode only) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 0.6 : 0, contain: "layout style" }}
      >
        {farStars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle-far"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── NEAR STARS (bright, sparkle flares — dark mode only) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 0.9 : 0, contain: "layout style" }}
      >
        {nearStars.map((s) => (
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
            <div className="absolute inset-0 rounded-full" style={{ opacity: 0.9, background: s.tint }} />
            {s.sparkle && (
              <div
                className="absolute rounded-full"
                style={{
                  inset: `-${s.size * 1.5}px`,
                  background: `radial-gradient(circle, ${s.tint}80 0%, transparent 70%)`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── SHOOTING STARS (dark mode only) — ported from FairyLights.tsx ──
       *
       *  Each comet is a thin pill div rotated 135° (same as file 2).
       *  Per-star travel distance and glow are driven by CSS custom properties
       *  (--ss-tx / --ss-ty) so the single shoot-v2 @keyframes handles all of them.
       *  The gradient goes transparent→colour→white (left-to-right) matching the
       *  SHOOTING_STAR_PALETTES format, giving every comet a coloured head.
       *  animation-duration is set to the full cycle (streak + idle) per star.
       */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 1 : 0, contain: "layout style" }}
      >
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute animate-shoot-v2"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.length}px`,
                height: "1.5px",
                borderRadius: "999px",
                background: `linear-gradient(to right, ${s.gradient})`,
                filter: `drop-shadow(0 0 3px ${s.glow}) drop-shadow(0 0 7px ${s.glow})`,
                animationDuration: `${s.cycle}s`,
                animationDelay: `${s.delay}s`,
                // CSS custom properties consumed by @keyframes shoot-v2
                "--ss-tx": `-${s.travel}px`,
                "--ss-ty": `${s.travel}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── HORIZON SILHOUETTE — grounds the whole scene ── */}
      <div className="absolute bottom-0 left-0 w-full" style={{ height: "20%" }}>
        <svg
          viewBox="0 0 1000 220"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: isDark ? 1 : 0 }}
        >
          <path
            d="M0,120 C150,60 300,150 480,100 C650,55 800,140 1000,90 L1000,220 L0,220 Z"
            fill="#050414"
          />
          <path
            d="M0,120 C150,60 300,150 480,100 C650,55 800,140 1000,90"
            fill="none"
            stroke="rgba(150,160,220,0.22)"
            strokeWidth="2"
            className="animate-horizon"
          />
        </svg>
        <svg
          viewBox="0 0 1000 220"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: isDark ? 0 : 1 }}
        >
          <defs>
            <linearGradient id="hillGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7c9a1" />
              <stop offset="100%" stopColor="#cfa787" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 C150,60 300,150 480,100 C650,55 800,140 1000,90 L1000,220 L0,220 Z"
            fill="url(#hillGradLight)"
          />
          <path
            d="M0,120 C150,60 300,150 480,100 C650,55 800,140 1000,90"
            fill="none"
            stroke="rgba(255,235,200,0.6)"
            strokeWidth="2"
            className="animate-horizon"
          />
        </svg>
      </div>

      {/* ── FILM GRAIN OVERLAY ── */}
      <div
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          willChange: "opacity",
        }}
      />
    </div>
  );
}