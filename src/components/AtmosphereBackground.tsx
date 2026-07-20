"use client";

import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function AtmosphereBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Use simple dimensions and pure white for stars. 
  // Dropping individual box-shadows vastly improves mobile performance.
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: seededRandom(i * 3.1) * 70,
        left: seededRandom(i * 7.7) * 100,
        size: 1 + seededRandom(i * 13.3) * 2.2, // Slightly larger to compensate for no shadow
        delay: seededRandom(i * 5.5) * 6,
        duration: 2.5 + seededRandom(i * 9.9) * 3,
        bright: i % 7 === 0,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 5 + seededRandom(i * 2.1) * 30,
        left: seededRandom(i * 4.4) * 80,
        width: 140 + seededRandom(i * 6.6) * 120,
        opacity: 0.28 + seededRandom(i * 8.8) * 0.22,
        blur: 18 + seededRandom(i * 3.3) * 14,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      
      {/* ── SKY LAYERS (Cross-faded for smooth GPU transitions) ── */}
      
      {/* Night Sky */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          background: "radial-gradient(ellipse at 50% -5%, #1e1852 0%, #0e0c2e 30%, #07091d 60%, #03040f 100%)",
        }}
      />
      
      {/* Day Sky */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          background: "linear-gradient(180deg, #fde9c3 0%, #fad5a0 22%, #f5c87a 45%, #f0e2c0 70%, #ede0cc 100%)",
        }}
      />

      {/* ── CELESTIAL BODIES (Separated and cross-faded) ── */}
      
      {/* The Moon */}
      <div
        className="absolute rounded-full transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          top: "6%",
          right: "8%",
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle at 38% 38%, #e8ecf7 0%, #d0d8f0 30%, rgba(180,195,235,0.06) 70%, transparent 100%)",
          boxShadow: "0 0 80px 20px rgba(200,210,240,0.12)",
          // translateZ(0) forces hardware acceleration on mobile
          transform: "translateZ(0)", 
        }}
      />

      {/* The Sun */}
      <div
        className="absolute rounded-full transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "4%",
          right: "50%",
          transform: "translateX(50%) translateZ(0)", // Combined transform with hardware acceleration
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(255,240,180,1) 0%, rgba(255,215,100,0.85) 35%, rgba(255,195,60,0.2) 65%, transparent 85%)",
          boxShadow: "0 0 120px 60px rgba(255,200,80,0.25), 0 0 200px 100px rgba(255,170,50,0.12)",
        }}
      />

      {/* ── WARM HORIZON (Day only) ── */}
      <div
        className="absolute left-0 right-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "35%",
          height: "30%",
          background: "linear-gradient(to bottom, transparent, rgba(255,160,60,0.12) 40%, rgba(255,120,40,0.08) 70%, transparent)",
        }}
      />

      {/* ── STARS (Night only, optimized without box-shadow) ── */}
      <div 
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              opacity: s.bright ? 0.9 : 0.5, // Use baseline opacity instead of shadows
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              // Removed box-shadow for massive performance gain on 90 DOM nodes
            }}
          />
        ))}
        
        {/* Nebula Glow */}
        <div
          className="absolute -top-1/4 left-0 w-[140%] h-[65%] opacity-20 animate-drift"
          style={{
            background: "conic-gradient(from 200deg at 50% 50%, rgba(201,168,108,0.1), rgba(60,30,80,0.15), rgba(10,40,80,0.18), rgba(201,168,108,0.1))",
            filter: "blur(90px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* ── CLOUDS (Day only) ── */}
      <div 
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        {clouds.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-full animate-float-slow"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: c.width,
              height: c.width * 0.38,
              background: `rgba(255,255,255,${c.opacity})`,
              filter: `blur(${c.blur}px)`,
              animationDelay: `${c.id * 1.8}s`,
              transform: "translateZ(0)", // Fixes iOS blur flickering during animations
            }}
          />
        ))}
      </div>

      {/* ── REALISTIC CITY SKYLINE ── */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "clamp(140px, 22vh, 240px)" }}
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Back Silhouette Layer */}
        <path
          className="transition-colors duration-[1200ms] ease-in-out"
          d="M0 220 L0 150 L25 150 L25 120 L55 120 L55 150 L85 150 L85 130 L95 130 L95 100 L105 100 L105 130 L115 130 L115 150 L145 150 L145 80 L146 50 L148 50 L149 80 L170 80 L170 150 L210 150 L210 110 L220 110 L220 90 L240 90 L240 110 L250 110 L250 150 L290 150 L290 135 L330 135 L330 70 L340 70 L345 40 L347 40 L352 70 L360 70 L360 135 L390 135 L390 150 L420 150 L420 125 L450 125 L450 150 L490 150 L490 100 L510 85 L530 100 L530 150 L560 150 L560 60 L575 60 L575 30 L577 30 L577 60 L590 60 L590 150 L630 150 L630 115 L660 115 L660 150 L710 150 L710 95 L725 95 L725 75 L745 75 L745 95 L760 95 L760 150 L800 150 L800 130 L830 130 L830 150 L870 150 L870 80 L885 80 L887 45 L889 80 L905 80 L905 150 L950 150 L950 110 L980 110 L980 150 L1020 150 L1020 90 L1035 90 L1035 65 L1050 90 L1065 90 L1065 150 L1100 150 L1100 120 L1130 120 L1130 150 L1170 150 L1170 85 L1185 85 L1186 55 L1188 55 L1189 85 L1210 85 L1210 150 L1260 150 L1260 125 L1290 125 L1290 150 L1340 150 L1340 105 L1370 105 L1370 150 L1440 150 L1440 220 Z"
          fill={isDark ? "rgba(15,18,45,0.95)" : "rgba(110,85,60,0.35)"}
        />

        {/* Front Silhouette Layer */}
        <path
          className="transition-colors duration-[1200ms] ease-in-out"
          d="M0 220 L0 165 L35 165 L35 145 L70 145 L70 165 L100 165 L100 135 L110 135 L110 120 L135 120 L135 135 L145 135 L145 165 L180 165 L180 150 L220 150 L220 165 L260 165 L260 130 L275 130 L275 110 L305 110 L305 130 L320 130 L320 165 L370 165 L370 140 L410 140 L410 165 L440 165 L440 125 L475 125 L475 165 L520 165 L520 135 L530 135 L530 120 L545 120 L545 135 L555 135 L555 165 L600 165 L600 140 L615 140 L615 115 L645 115 L645 140 L660 140 L660 165 L700 165 L700 150 L735 150 L735 165 L780 165 L780 130 L815 130 L815 165 L850 165 L850 145 L890 145 L890 165 L930 165 L930 125 L945 125 L945 110 L970 110 L970 125 L985 125 L985 165 L1030 165 L1030 140 L1070 140 L1070 165 L1110 165 L1110 130 L1145 130 L1145 165 L1190 165 L1190 145 L1230 145 L1230 165 L1280 165 L1280 135 L1315 135 L1315 165 L1360 165 L1360 150 L1440 150 L1440 220 Z"
          fill={isDark ? "rgba(5,7,20,0.98)" : "rgba(75,55,35,0.55)"}
        />

        {/* Window Lights Grid */}
        <g 
          className="transition-opacity duration-[1200ms] ease-in-out" 
          style={{ opacity: isDark ? 1 : 0 }}
        >
          {[
             // Building 1 (Left block)
             [12, 172], [22, 172], [12, 182], [22, 182],
             [42, 152], [52, 152], [62, 152], [42, 162], [62, 162],
             // High-rise Spire Tower 1
             [120, 128], [128, 128], [120, 138], [128, 138],
             [152, 90], [162, 90], [152, 102], [162, 102], [152, 114], [162, 114], [152, 126], [162, 126],
             // Mid-town stepped tower
             [270, 138], [280, 138], [290, 138], [280, 120], [290, 120],
             // Central Tall Skyscraper
             [338, 80], [352, 80], [338, 92], [352, 92],
             [338, 104], [352, 104], [338, 116], [352, 116],
             // Mid-center block
             [450, 132], [460, 132], [450, 142], [460, 142],
             // Center Spire Skyscraper
             [568, 70], [580, 70], [568, 82], [580, 82],
             [568, 94], [580, 94], [568, 106], [580, 106], [568, 118], [580, 118],
             // Center-Right tower
             [622, 122], [638, 122], [622, 132], [638, 132],
             // Cathedral-style setback tower
             [732, 85], [738, 85], [732, 102], [748, 102], [732, 114], [748, 114],
             // Right Tall Skyscraper
             [878, 92], [894, 92], [878, 104], [894, 104],
             [878, 116], [894, 116], [878, 128], [894, 128],
             // Right setback building
             [952, 118], [962, 118], [952, 130], [962, 130],
             // Far Right Tall Spire
             [1178, 95], [1198, 95], [1178, 107], [1198, 107], [1178, 119], [1198, 119],
             // Edge block
             [1290, 142], [1302, 142], [1290, 152], [1302, 152]
          ].map(([cx, cy], i) => (
            <rect
              key={i}
              x={cx}
              y={cy}
              width="4"
              height="5"
              fill={
                i % 5 === 0
                  ? "rgba(255,245,200,0.95)"
                  : i % 3 === 0
                  ? "rgba(180,225,255,0.85)"
                  : "rgba(255,220,130,0.7)"
              }
              rx="0.5"
            />
          ))}
        </g>
      </svg>

      {/* ── VIGNETTE LAYERS ── */}
      
      {/* Night Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      
      {/* Day Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(80,50,20,0.1) 100%)",
        }}
      />
    </div>
  );
}