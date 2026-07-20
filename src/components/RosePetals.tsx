"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  drift: number;
  rotateStart: number;
  opacity: number;
}

let petalId = 0;

function RosePetalSvg({ size, rotate, opacity }: { size: number; rotate: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 24 28"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)`, overflow: "visible" }}
      aria-hidden
    >
      <path
        d="M12 2 C18 4, 22 10, 20 16 C18 22, 14 26, 12 26 C10 26, 6 22, 4 16 C2 10, 6 4, 12 2 Z"
        fill="url(#petalFill)"
        opacity={opacity}
      />
      <path
        d="M12 4 C12 4, 10 12, 12 20 C14 12, 12 4, 12 4 Z"
        fill="rgba(180,60,70,0.25)"
      />
      <defs>
        <linearGradient id="petalFill" x1="12" y1="2" x2="12" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8a0a8" />
          <stop offset="0.5" stopColor="#d4737f" />
          <stop offset="1" stopColor="#b85c68" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function RosePetals({ active }: { active: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) {
      setPetals([]);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const spawn = () => {
      const newPetal: Petal = {
        id: petalId++,
        left: Math.random() * 100,
        size: 14 + Math.random() * 12,
        duration: 10 + Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        rotateStart: Math.random() * 360,
        opacity: 0.55 + Math.random() * 0.35,
      };
      setPetals((prev) => [...prev.slice(-25), newPetal]);
    };

    spawn();
    const id = setInterval(spawn, 1800);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-visible">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${p.left}%`,
            ["--drift" as string]: `${p.drift}px`,
            animation: `fall ${p.duration}s linear forwards`,
          }}
        >
          <RosePetalSvg size={p.size} rotate={p.rotateStart} opacity={p.opacity} />
        </div>
      ))}
    </div>
  );
}
