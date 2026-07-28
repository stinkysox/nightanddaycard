import { useMemo, CSSProperties } from "react";

interface FairyLightDividerProps {
  count?: number;
}

/**
 * FairyLightDivider
 * A softly sagging string of warm fairy lights. Fully fluid (percentage-based
 * layout, no fixed pixel positions) and stable across browsers: bulbs never
 * scale or shift — they only breathe in brightness, which avoids the
 * transform-box/fill-box inconsistencies that cause visible jitter in
 * Safari and Firefox.
 */
export default function FairyLightDivider({ count = 7 }: FairyLightDividerProps) {
  // Design-space coordinate system, purely for computing the curve.
  // Everything is converted to percentages before rendering, so the
  // component scales fluidly to any container width.
  const W = 1000;
  const H = 140;
  const sag = 46;
  const marginPct = 4; // keep end bulbs off the very edge

  const palette = ["#ffcb87", "#ffe1ad", "#ffb885", "#fff2d6"];

  const bulbs = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const xPct = marginPct + t * (100 - marginPct * 2);
      const x = (xPct / 100) * W;
      const yTop = 20;
      const y = yTop + sag * 4 * t * (1 - t) * 1.6;
      const yPct = (y / H) * 100;
      return {
        xPct,
        yPct,
        color: palette[i % palette.length],
        delay: +(i * 0.6).toFixed(2),
        duration: +(3.2 + (i % 3) * 0.5).toFixed(2),
      };
    });
  }, [count]);

  const pathD = useMemo(() => {
    const startX = (marginPct / 100) * W;
    const endX = W - (marginPct / 100) * W;
    const midX = W / 2;
    const topY = 20;
    return `M ${startX} ${topY} Q ${midX} ${topY + sag * 2.6} ${endX} ${topY}`;
  }, []);

  return (
    <div className="fld-root" aria-hidden="true">
      <svg
        className="fld-wire"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fld-wire-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a3d33" stopOpacity="0" />
            <stop offset="6%" stopColor="#4a3d33" stopOpacity="0.5" />
            <stop offset="94%" stopColor="#4a3d33" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4a3d33" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="url(#fld-wire-grad)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="fld-bulbs">
        {bulbs.map((b, i) => (
          <div
            key={i}
            className="fld-bulb"
            style={
              {
                left: `${b.xPct}%`,
                top: `${b.yPct}%`,
                "--fld-color": b.color,
                "--fld-delay": `${b.delay}s`,
                "--fld-duration": `${b.duration}s`,
              } as CSSProperties
            }
          >
            <span className="fld-halo" />
            <span className="fld-glass" />
          </div>
        ))}
      </div>

      <style>{`
        .fld-root {
          position: relative;
          width: 100%;
          height: clamp(48px, 7vw, 72px);
        }

        .fld-wire {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .fld-bulbs {
          position: absolute;
          inset: 0;
        }

        .fld-bulb {
          position: absolute;
          width: 0;
          height: 0;
          /* opacity-only animation: no scale, no translate — nothing to jitter */
          animation: fld-twinkle var(--fld-duration) ease-in-out infinite;
          animation-delay: var(--fld-delay);
        }

        .fld-halo {
          position: absolute;
          left: 50%;
          top: 50%;
          width: clamp(18px, 2.8vw, 30px);
          height: clamp(18px, 2.8vw, 30px);
          margin-left: calc(clamp(18px, 2.8vw, 30px) / -2);
          margin-top: calc(clamp(18px, 2.8vw, 30px) / -2);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--fld-color) 0%,
            color-mix(in srgb, var(--fld-color) 45%, transparent) 45%,
            transparent 75%
          );
          filter: blur(1px);
        }

        .fld-glass {
          position: absolute;
          left: 50%;
          top: 50%;
          width: clamp(6px, 0.75vw, 9px);
          height: clamp(6px, 0.75vw, 9px);
          margin-left: calc(clamp(6px, 0.75vw, 9px) / -2);
          margin-top: calc(clamp(6px, 0.75vw, 9px) / -2);
          border-radius: 50%;
          background: var(--fld-color);
          box-shadow:
            0 0 2px rgba(0, 0, 0, 0.2),
            inset -1px -1px 2px rgba(0, 0, 0, 0.15),
            inset 1px 1px 2px rgba(255, 255, 255, 0.6);
        }

        @keyframes fld-twinkle {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fld-bulb {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}