"use client";

import { LANTERNS, FADE_CLASS } from "./atmosphereHelpers";

export default function Lanterns({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`absolute inset-0 ${FADE_CLASS}`}
      style={{
        opacity: isDark ? 1 : 0,
        contain: "layout style",
      }}
    >
      <div className="absolute -inset-4">
        {LANTERNS.map((l, i) => (
          <div
            key={i}
            className="absolute a-lantern"
            style={
              {
                left: `${l.left}%`,
                top: "100%",
                width: l.size,
                height: l.size * 1.25,
                animationDuration: `${l.dur}s`,
                animationDelay: `${l.delay}s`,
                opacity: 0,
                "--lx": `${l.lx}vw`,
              } as React.CSSProperties
            }
          >
            <div
              className="absolute a-lglow"
              style={{
                inset: "-130%",
                background:
                  "radial-gradient(circle, rgba(255,170,70,0.35) 0%, rgba(255,140,50,0.12) 45%, transparent 70%)",
                animationDelay: `${(i * 0.5) % 2.4}s`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                borderRadius: "40% 40% 30% 30%",
                background:
                  "radial-gradient(ellipse at 50% 70%, #fff3b0 0%, #ffb347 55%, #e8641c 100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
