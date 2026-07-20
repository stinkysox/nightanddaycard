"use client";

import { useMemo } from "react";

export default function FairyLightStrand({ count = 14 }: { count?: number }) {
  const bulbs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: (i % 6) * 0.4,
        sag: Math.sin((i / (count - 1)) * Math.PI) * 22,
      })),
    [count]
  );

  return (
    <div className="relative w-full h-14 select-none pointer-events-none">
      <svg viewBox={`0 0 ${count * 40} 60`} className="w-full h-full" preserveAspectRatio="none">
        <path
          d={`M 0 5 ${bulbs.map((b, i) => `Q ${i * 40 + 20} ${5 + b.sag} ${(i + 1) * 40} 5`).join(" ")}`}
          stroke="rgba(212,175,55,0.35)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0">
        {bulbs.map((b, i) => (
          <span
            key={b.id}
            className="absolute w-2 h-2 rounded-full animate-twinkle"
            style={{
              left: `${(i / (count - 1)) * 100}%`,
              top: 5 + b.sag,
              background: "#ffe9a8",
              boxShadow: "0 0 8px 3px rgba(255,220,140,0.85)",
              animationDelay: `${b.delay}s`,
              transform: "translate(-50%, 0)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
