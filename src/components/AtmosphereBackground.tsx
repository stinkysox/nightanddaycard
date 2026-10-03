"use client";

import { useTheme } from "./ThemeProvider";
import { useMemo } from "react";

/* ───────────────────────── helpers ───────────────────────── */

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Round so server and client always serialise identical numbers (no hydration warnings).
const r2 = (n: number) => Math.round(n * 100) / 100;

const STAR_TINTS = ["#ffffff", "#cfd8ff", "#ffe9c7"];

const SHOOTING_STAR_PALETTES = [
  {
    gradient:
      "rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,1) 100%",
    glow: "rgba(255,255,255,0.9)",
  },
  {
    gradient:
      "rgba(255,180,40,0) 0%, rgba(255,180,40,0.25) 40%, rgba(255,210,100,1) 100%",
    glow: "rgba(255,190,60,0.95)",
  },
  {
    gradient:
      "rgba(80,220,255,0) 0%, rgba(80,220,255,0.2) 40%, rgba(160,240,255,1) 100%",
    glow: "rgba(80,220,255,0.95)",
  },
  {
    gradient:
      "rgba(180,80,255,0) 0%, rgba(180,80,255,0.2) 40%, rgba(220,160,255,1) 100%",
    glow: "rgba(190,90,255,0.95)",
  },
  {
    gradient:
      "rgba(255,80,160,0) 0%, rgba(255,80,160,0.2) 40%, rgba(255,160,210,1) 100%",
    glow: "rgba(255,80,160,0.9)",
  },
];

/* ───────────── Indian skyline: path primitives ───────────── */

const VB_W = 1500;
const VB_H = 300;
const TAJ_X = 750;

const rect = (x: number, y: number, w: number, h: number) =>
  `M${r2(x)} ${r2(y)}h${r2(w)}v${r2(h)}h${r2(-w)}z`;

const dome = (cx: number, by: number, r: number, h: number) =>
  `M${r2(cx - r)} ${r2(by)}A${r2(r)} ${r2(h)} 0 0 1 ${r2(cx + r)} ${r2(by)}z`;

const finial = (cx: number, top: number, len: number) =>
  rect(cx - 0.6, top - len, 1.2, len + 1);

// bulbous Mughal onion dome with optional finial spike
const onion = (
  cx: number,
  by: number,
  r: number,
  h: number,
  fin = 0,
) =>
  `M${r2(cx - r)} ${r2(by)}C${r2(cx - r * 1.3)} ${r2(
    by - h * 0.45,
  )} ${r2(cx - r * 0.3)} ${r2(by - h * 0.62)} ${r2(cx)} ${r2(
    by - h,
  )}` +
  `C${r2(cx + r * 0.3)} ${r2(by - h * 0.62)} ${r2(
    cx + r * 1.3,
  )} ${r2(by - h * 0.45)} ${r2(cx + r)} ${r2(by)}z` +
  (fin ? finial(cx, by - h, fin) : "");

// pointed arch opening
const arch = (x: number, b: number, w: number, h: number) =>
  `M${r2(x - w / 2)} ${r2(b)}V${r2(
    b - h * 0.65,
  )}Q${r2(x - w / 2)} ${r2(b - h * 0.9)} ${r2(x)} ${r2(
    b - h,
  )}` +
  `Q${r2(x + w / 2)} ${r2(b - h * 0.9)} ${r2(
    x + w / 2,
  )} ${r2(b - h * 0.65)}V${r2(b)}z`;

// round arch opening
const rarch = (x: number, b: number, w: number, h: number) =>
  `M${r2(x - w / 2)} ${r2(b)}V${r2(
    b - h + w / 2,
  )}A${r2(w / 2)} ${r2(w / 2)} 0 0 1 ${r2(
    x + w / 2,
  )} ${r2(b - h + w / 2)}V${r2(b)}z`;

const trap = (
  cx: number,
  y1: number,
  w1: number,
  y2: number,
  w2: number,
) =>
  `M${r2(cx - w1 / 2)} ${r2(y1)}L${r2(cx - w2 / 2)} ${r2(
    y2,
  )}L${r2(cx + w2 / 2)} ${r2(y2)}L${r2(cx + w1 / 2)} ${r2(y1)}z`;

type Mono = {
  body: string;
  lit: string;
};

/* ── Taj Mahal ── */

function minaret(x: number, b: number) {
  const top = b - 84;

  return (
    rect(x - 9, b - 8, 18, 8) +
    `M${r2(x - 5)} ${b}L${r2(x - 3.4)} ${top}L${r2(
      x + 3.4,
    )} ${top}L${r2(x + 5)} ${b}z` +
    rect(x - 7, top - 3, 14, 3) +
    rect(x - 7, b - 46, 14, 2.5) +
    rect(x - 6, b - 22, 12, 2.5) +
    rect(x - 4.2, top - 9, 1.2, 6) +
    rect(x + 3, top - 9, 1.2, 6) +
    rect(x - 4.8, top - 10.5, 9.6, 1.5) +
    onion(x, top - 10.5, 4.8, 8, 5)
  );
}

function taj(cx: number): Mono {
  let body = rect(cx - 190, 284, 380, 16);
  let lit = "";

  body += rect(cx - 60, 212, 120, 72);
  body += rect(cx - 24, 196, 48, 16);
  body += onion(cx, 196, 30, 56, 18);

  for (const s of [-1, 1]) {
    body +=
      rect(cx + s * 46 - 5.5, 198, 11, 14) +
      onion(cx + s * 46, 198, 8, 15, 6);

    body +=
      rect(s < 0 ? cx - 112 : cx + 60, 252, 52, 32) +
      onion(cx + s * 86, 252, 15, 20, 5);

    body += minaret(cx + s * 148, 284);

    lit += arch(cx + s * 86, 284, 12, 22);
    lit += arch(cx + s * 38, 284, 10, 30);
  }

  lit += arch(cx, 284, 24, 54);
  lit += arch(cx, 234, 9, 14);

  return { body, lit };
}

/* ── Lotus Temple ── */

function petal(
  bx: number,
  by: number,
  deg: number,
  w: number,
  h: number,
) {
  const a = (deg * Math.PI) / 180;

  const pt = (u: number, v: number) =>
    `${r2(
      bx + u * Math.cos(a) + v * Math.sin(a),
    )} ${r2(
      by - (v * Math.cos(a) - u * Math.sin(a)),
    )}`;

  return (
    `M${pt(-w / 2, 0)}C${pt(
      -w * 0.75,
      h * 0.35,
    )} ${pt(-w * 0.3, h * 0.8)} ${pt(0, h)}` +
    `C${pt(
      w * 0.3,
      h * 0.8,
    )} ${pt(w * 0.75, h * 0.35)} ${pt(w / 2, 0)}z`
  );
}

function lotus(x: number): string {
  const b = 292;

  let body =
    rect(x - 88, b, 176, 8) +
    rect(x - 80, b - 4, 160, 4);

  const petals: [number, number, number, number][] = [
    [-66, -56, 34, 40],
    [66, 56, 34, 40],
    [-48, -42, 34, 50],
    [48, 42, 34, 50],
    [-30, -26, 34, 58],
    [30, 26, 34, 58],
    [-12, -10, 34, 66],
    [12, 10, 34, 66],
    [0, 0, 36, 72],
  ];

  for (const [deg, off, w, h] of petals) {
    body += petal(x + off, b - 4, deg, w, h);
  }

  return body;
}

/* ── Qutub Minar ── */

function qutub(x: number) {
  const k = 1.4;
  const tiers = [
    [46, 26, 21],
    [34, 21, 17.5],
    [26, 17.5, 14.5],
    [18, 14.5, 12.5],
    [12, 12.5, 11],
  ];

  let y = VB_H - 5;
  let body = rect(x - 22, VB_H - 5, 44, 5);
  let lit = "";

  for (const [h, a, b] of tiers) {
    const y2 = y - h;

    body += trap(x, y, a * k, y2, b * k);

    body +=
      rect(
        x - (b * k) / 2 - 4,
        y2 - 2.5,
        b * k + 8,
        3,
      ) +
      rect(
        x - (b * k) / 2 - 2.5,
        y2 + 0.5,
        b * k + 5,
        2,
      );

    for (let j = 0; j < Math.floor(h / 13); j++) {
      lit += rect(
        x - 0.8,
        y - 9 - j * 12,
        1.6,
        4.5,
      );
    }

    y = y2;
  }

  body +=
    rect(x - 6, y - 3, 12, 3) +
    rect(x - 4.5, y - 9, 9, 6) +
    dome(x, y - 9, 5, 5.5) +
    finial(x, y - 14.5, 7);

  return {
    body,
    lit,
    top: y - 21,
  };
}

/* ── Hawa Mahal ── */

function hawaMahal(x: number): Mono {
  const tiers = [
    [104, 26],
    [88, 20],
    [72, 18],
    [56, 16],
    [40, 14],
  ];

  let y = VB_H;
  let body = "";
  let lit = "";

  tiers.forEach(([w, h], ti) => {
    const top = y - h;

    body +=
      rect(x - w / 2, top, w, h) +
      rect(x - w / 2 - 1.5, top - 2, w + 3, 2.5);

    if (ti < tiers.length - 1) {
      const n = Math.max(2, Math.round(w / 18));

      for (let j = 0; j < n; j++) {
        const cx =
          x - w / 2 + ((j + 0.5) * w) / n;

        body +=
          dome(cx, top - 2, 3.4, 5.5) +
          rect(cx - 0.5, top - 9, 1, 4);
      }
    }

    const rows = Math.floor((h - 4) / 10);
    const cols = Math.max(
      2,
      Math.floor((w - 8) / 10),
    );

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx =
          x -
          w / 2 +
          4 +
          ((c + 0.5) * (w - 8)) / cols;

        lit += arch(
          wx,
          top + 4 + (r + 1) * 10 - 1,
          3.8,
          7.5,
        );
      }
    }

    y = top;
  });

  body +=
    onion(x, y - 2, 9, 14, 6) +
    dome(x - 12, y - 2, 3.6, 5.8) +
    dome(x + 12, y - 2, 3.6, 5.8);

  return { body, lit };
}

/* ── Charminar ── */

function charminar(x: number): Mono {
  let body =
    rect(x - 44, 240, 88, 60) +
    rect(x - 49, 233, 98, 7) +
    rect(x - 34, 217, 68, 16);

  let lit = rarch(x, 300, 30, 52);

  for (let i = -2; i <= 2; i++) {
    body += onion(
      x + i * 13,
      217,
      5.5,
      10,
      4,
    );

    lit += arch(
      x + i * 13,
      230,
      5,
      10,
    );
  }

  for (const s of [-1, 1]) {
    const mx = x + s * 47;

    body +=
      rect(mx - 5, 176, 10, 124) +
      rect(mx - 8, 236, 16, 3) +
      rect(mx - 7.5, 206, 15, 3) +
      rect(mx - 6.5, 172, 13, 5) +
      onion(mx, 172, 6.5, 14, 6);

    lit += rarch(
      x + s * 30,
      300,
      12,
      30,
    );
  }

  return { body, lit };
}

/* ── India Gate ── */

function indiaGate(x: number): Mono {
  const body =
    rect(x - 45, 208, 90, 92) +
    rect(x - 49, 202, 98, 6) +
    rect(x - 40, 196, 80, 6) +
    rect(x - 30, 190, 60, 6) +
    dome(x, 190, 17, 8);

  return {
    body,
    lit: rarch(x, 300, 32, 70),
  };
}

/* ── South-Indian gopuram ── */

function gopuram(x: number): Mono {
  let y = VB_H;
  let body = "";
  let lit = "";

  const tiers = [
    [90, 22],
    [78, 18],
    [66, 16],
    [54, 14],
    [42, 13],
    [30, 12],
  ];

  tiers.forEach(([w, h], i) => {
    const top = y - h;

    body +=
      rect(x - w / 2, top, w, h) +
      rect(x - w / 2 - 2.5, top - 2.5, w + 5, 3);

    if (i > 0) {
      const n = Math.max(
        1,
        Math.round(w / 22),
      );

      for (let j = 0; j < n; j++) {
        lit += arch(
          x -
            w / 2 +
            ((j + 0.5) * w) / n,
          top + h - 2.5,
          4.4,
          h > 14 ? 9 : 7.5,
        );
      }
    }

    y = top;
  });

  body +=
    `M${x - 17} ${r2(
      y - 2.5,
    )}A17 10 0 0 1 ${x + 17} ${r2(
      y - 2.5,
    )}z`;

  for (const dx of [-10, 0, 10]) {
    body += onion(
      x + dx,
      y - 10,
      2.8,
      6.5,
      4,
    );
  }

  lit += rarch(x, 300, 16, 26);

  return { body, lit };
}

/* ── coconut palm ── */

function palm(
  x: number,
  h: number,
  lean: number,
) {
  const tx = x + lean;
  const ty = VB_H - h;
  const k = h / 64;

  let d =
    `M${r2(x - 1.4)} ${VB_H}Q${r2(
      x + lean * 0.2,
    )} ${r2(
      VB_H - h * 0.55,
    )} ${r2(tx - 0.8)} ${r2(ty)}` +
    `L${r2(tx + 0.8)} ${r2(ty)}Q${r2(
      x + lean * 0.2 + 2.6,
    )} ${r2(
      VB_H - h * 0.55,
    )} ${r2(x + 1.4)} ${VB_H}z`;

  const fronds = [
    [-28, 7],
    [-22, -7],
    [-9, -13],
    [9, -13],
    [22, -7],
    [28, 7],
    [-15, 13],
    [15, 13],
  ];

  for (const [fx, fy] of fronds) {
    const dx = fx * k;
    const dy = fy * k;

    d +=
      `M${r2(tx)} ${r2(ty)}Q${r2(
        tx + dx * 0.5,
      )} ${r2(
        ty + dy * 0.5 - 7 * k,
      )} ${r2(tx + dx)} ${r2(
        ty + dy,
      )}` +
      `Q${r2(
        tx + dx * 0.5,
      )} ${r2(
        ty + dy * 0.5 - 2 * k,
      )} ${r2(tx)} ${r2(ty)}z`;
  }

  return d;
}

/* ── procedural city layer ── */

type LayerOpts = {
  seed: number;
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  gap: number;
  litChance: number;
  antennaChance: number;
  crowns?: boolean;
};

function buildLayer(o: LayerOpts) {
  let x = -30;
  let i = 0;
  let body = "";
  let lit = "";

  const flicker: {
    x: number;
    y: number;
  }[] = [];

  while (x < VB_W + 40) {
    const k = o.seed + i * 7.31;

    const w =
      o.minW +
      seededRandom(k) *
        (o.maxW - o.minW);

    const h =
      o.minH +
      Math.pow(
        seededRandom(k * 1.7),
        1.6,
      ) *
        (o.maxH - o.minH);

    const y = VB_H - h;
    const mx = x + w / 2;

    body += rect(x, y, w, h);

    const cr = seededRandom(k * 2.9);

    if (o.crowns && cr > 0.78) {
      body += onion(
        mx,
        y,
        Math.min(w * 0.32, 10),
        Math.min(w * 0.55, 17),
        6,
      );
    } else if (o.crowns && cr > 0.6) {
      body +=
        rect(mx - 4, y - 7, 1.2, 7) +
        rect(mx + 2.8, y - 7, 1.2, 7) +
        rect(mx - 5, y - 8.5, 10, 1.5) +
        dome(
          mx,
          y - 8.5,
          4.2,
          4.5,
        );
    } else if (cr > 0.45) {
      body += rect(
        x + w * 0.2,
        y - 9,
        w * 0.6,
        9,
      );
    }

    if (
      seededRandom(k * 4.3) <
      o.antennaChance
    ) {
      const ax =
        x +
        w *
          (0.3 +
            seededRandom(k * 5.1) *
              0.4);

      const ah =
        12 +
        seededRandom(k * 6.7) * 16;

      body += rect(
        ax - 0.7,
        y - ah,
        1.4,
        ah,
      );
    }

    if (o.litChance > 0) {
      const stepX = 8;
      const stepY = 11;

      const cols = Math.max(
        1,
        Math.floor((w - 6) / stepX),
      );

      const rows = Math.max(
        1,
        Math.floor((h - 12) / stepY),
      );

      for (let c = 0; c < cols; c++) {
        for (let rr = 0; rr < rows; rr++) {
          const roll = seededRandom(
            k * 100 +
              c * 13.7 +
              rr * 5.3,
          );

          if (roll < o.litChance) {
            const wx =
              x + 4 + c * stepX;

            const wy =
              y + 8 + rr * stepY;

            lit +=
              `M${r2(wx)} ${r2(
                wy,
              )}h3v4h-3z`;

            if (
              roll <
                o.litChance * 0.05 &&
              flicker.length < 14
            ) {
              flicker.push({
                x: r2(wx),
                y: r2(wy),
              });
            }
          }
        }
      }
    }

    x +=
      w +
      o.gap *
        (0.3 +
          seededRandom(k * 3.3));

    i++;
  }

  return {
    body,
    lit,
    flicker,
  };
}

/* ── static scene data ── */

const LANTERNS = [
  { left: 8, size: 14, dur: 48, delay: -6, lx: 6 },
  { left: 19, size: 20, dur: 62, delay: -30, lx: -8 },
  { left: 31, size: 16, dur: 54, delay: -14, lx: 10 },
  { left: 44, size: 24, dur: 70, delay: -44, lx: -5 },
  { left: 57, size: 15, dur: 44, delay: -22, lx: 8 },
  { left: 68, size: 22, dur: 58, delay: -52, lx: -10 },
  { left: 79, size: 17, dur: 66, delay: -8, lx: 5 },
  { left: 90, size: 19, dur: 52, delay: -38, lx: -7 },
  { left: 36, size: 12, dur: 60, delay: -26, lx: 9 },
];

const PALMS: [number, number, number][] = [
  [24, 60, 6],
  [170, 50, -4],
  [330, 52, 5],
  [560, 44, -5],
  [942, 48, 6],
  [1130, 52, -4],
  [1285, 54, 5],
  [1470, 62, -6],
  [1494, 48, 3],
];

/* ───────────────────────── component ───────────────────────── */

export default function AtmosphereBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const farStars = useMemo(
    () =>
      Array.from(
        { length: 80 },
        (_, i) => ({
          id: i,
          top: r2(
            seededRandom(i * 2.3) * 62,
          ),
          left: r2(
            seededRandom(i * 6.1) * 100,
          ),
          size: r2(
            0.5 +
              seededRandom(i * 9.7) *
                0.8,
          ),
          delay: r2(
            seededRandom(i * 4.4) * 8,
          ),
          duration: r2(
            5 +
              seededRandom(i * 8.8) *
                6,
          ),
        }),
      ),
    [],
  );

  const nearStars = useMemo(
    () =>
      Array.from(
        { length: 45 },
        (_, i) => ({
          id: i,
          top: r2(
            seededRandom(i * 3.1) * 66,
          ),
          left: r2(
            seededRandom(i * 7.7) * 100,
          ),
          size: r2(
            0.9 +
              seededRandom(i * 13.3) *
                1.7,
          ),
          delay: r2(
            seededRandom(i * 5.5) * 6,
          ),
          duration: r2(
            3 +
              seededRandom(i * 9.9) *
                5,
          ),
          sparkle:
            seededRandom(i * 11.1) >
            0.87,
          tint:
            STAR_TINTS[
              Math.floor(
                seededRandom(
                  i * 15.9,
                ) *
                  STAR_TINTS.length,
              )
            ],
        }),
      ),
    [],
  );

  const shootingStars = useMemo(
    () =>
      Array.from(
        { length: 3 },
        (_, i) => {
          const p =
            SHOOTING_STAR_PALETTES[
              Math.floor(
                seededRandom(
                  i * 23.5,
                ) *
                  SHOOTING_STAR_PALETTES.length,
              )
            ];

          const duration =
            0.8 +
            seededRandom(i * 53.1) *
              0.4;

          const idle =
            14 +
            seededRandom(i * 61.7) *
              14;

          const travel = Math.round(
            420 +
              seededRandom(
                i * 37.7,
              ) *
                200,
          );

          return {
            id: i,
            top: r2(
              4 +
                seededRandom(
                  i * 17.3,
                ) *
                  22,
            ),
            left: r2(
              45 +
                seededRandom(
                  i * 21.9,
                ) *
                  45,
            ),
            length: Math.round(
              90 +
                seededRandom(
                  i * 41.3,
                ) *
                  50,
            ),
            travel,
            cycle: r2(
              duration / 0.065 >
                duration + idle
                ? duration / 0.065
                : duration + idle,
            ),
            delay: r2(
              4 +
                i * 9 +
                seededRandom(
                  i * 29.3,
                ) *
                  5,
            ),
            gradient: p.gradient,
            glow: p.glow,
          };
        },
      ),
    [],
  );

  const clouds = useMemo(
    () =>
      Array.from(
        { length: 6 },
        (_, i) => {
          const depth = i % 3;

          const scale =
            [0.7, 1, 1.35][depth] *
            (0.85 +
              seededRandom(i * 2.3) *
                0.4);

          return {
            id: i,
            top: r2(
              8 +
                seededRandom(i * 4.2) *
                  30 +
                depth * 3,
            ),
            scale: r2(scale),
            opacity: r2(
              [0.55, 0.75, 0.9][
                depth
              ],
            ),
            duration:
              [260, 190, 140][
                depth
              ],
            delay: -r2(
              seededRandom(i * 8.1) *
                [260, 190, 140][
                  depth
                ],
            ),
            puffs: Array.from(
              { length: 5 },
              (_, p) => ({
                x: r2(
                  p * 22 +
                    seededRandom(
                      i * 10 + p,
                    ) *
                      8,
                ),
                y: r2(
                  seededRandom(
                    i * 20 +
                      p * 3,
                  ) *
                    14 -
                    (p === 1 ||
                    p === 2
                      ? 14
                      : 0),
                ),
                w: r2(
                  70 +
                    seededRandom(
                      i * 30 + p,
                    ) *
                      50,
                ),
                h: r2(
                  38 +
                    seededRandom(
                      i * 40 + p,
                    ) *
                      26,
                ),
              }),
            ),
          };
        },
      ),
    [],
  );

  const birds = useMemo(
    () =>
      Array.from(
        { length: 7 },
        (_, i) => {
          const flock =
            i < 4 ? 0 : 1;

          const slot =
            flock === 0
              ? i
              : i - 4;

          const far = flock === 1;

          return {
            id: i,
            top: r2(
              (flock === 0
                ? 17
                : 29) +
                slot * 2.2 +
                seededRandom(
                  i * 14.7,
                ) *
                  2,
            ),
            offset: r2(
              slot * 30 +
                seededRandom(
                  i * 3.3,
                ) *
                  14,
            ),
            scale: r2(
              (far ? 0.55 : 0.95) +
                seededRandom(
                  i * 5.3,
                ) *
                  0.2,
            ),
            duration: far ? 64 : 46,
            delay:
              flock === 0
                ? -6
                : -34,
            flap: r2(
              2.6 +
                seededRandom(
                  i * 9.1,
                ) *
                  0.7,
            ),
            flapDelay:
              -r2(
                seededRandom(
                  i * 12.7,
                ) *
                  3,
              ),
            bobDelay:
              -r2(
                seededRandom(
                  i * 6.7,
                ) *
                  6,
              ),
            far,
          };
        },
      ),
    [],
  );

  const diyas = useMemo(
    () =>
      Array.from(
        { length: 42 },
        (_, i) => ({
          x: r2(
            14 +
              i * 35.5 +
              seededRandom(
                i * 3.7,
              ) *
                12,
          ),
          y: 297 + (i % 2),
          delay: r2(
            seededRandom(i * 7.9) *
              4,
          ),
          dur: r2(
            1.6 +
              seededRandom(
                i * 4.1,
              ) *
                1.8,
          ),
        }),
      ),
    [],
  );

  const city = useMemo(() => {
    const q = qutub(80);
    const hm = hawaMahal(250);
    const cm = charminar(1050);
    const ig = indiaGate(1210);
    const gp = gopuram(1370);
    const tj = taj(TAJ_X);

    return {
      far: buildLayer({
        seed: 11,
        minW: 24,
        maxW: 50,
        minH: 36,
        maxH: 92,
        gap: 6,
        litChance: 0,
        antennaChance: 0.05,
        crowns: true,
      }),

      town: buildLayer({
        seed: 47,
        minW: 22,
        maxW: 48,
        minH: 20,
        maxH: 56,
        gap: 4,
        litChance: 0.2,
        antennaChance: 0.06,
        crowns: true,
      }),

      stone: {
        body:
          q.body +
          hm.body +
          cm.body +
          ig.body +
          gp.body,

        lit:
          q.lit +
          hm.lit +
          cm.lit +
          ig.lit +
          gp.lit,
      },

      lotus: lotus(450),

      taj: tj,

      beacon: {
        x: 80,
        y: q.top,
      },

      palms: PALMS.map(
        ([x, h, l]) =>
          palm(x, h, l),
      ).join(""),

      pool: rect(
        TAJ_X - 70,
        292,
        140,
        8,
      ),

      glints: Array.from(
        { length: 6 },
        (_, i) =>
          rect(
            TAJ_X -
              58 +
              i * 21 +
              (i % 2) * 4,
            294 + (i % 3),
            10,
            0.9,
          ),
      ).join(""),
    };
  }, []);

  const fade =
    "transition-opacity duration-[1200ms] ease-in-out";

  const tone = (
    n: string,
    d: string,
    on = 1,
    od = 1,
  ): React.CSSProperties => ({
    fill: isDark ? n : d,
    opacity: isDark ? on : od,
    transition:
      "fill 1.2s ease-in-out, stroke 1.2s ease-in-out, opacity 1.2s ease-in-out",
  });

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        contain: "layout style paint",
      }}
    >
      <style>{`
        @keyframes cloud-drift {
          from {
            transform: translate3d(0,0,0);
          }
          to {
            transform: translate3d(170vw,0,0);
          }
        }

        @keyframes twinkle-far {
          0%,100% {
            opacity:.15;
          }
          50% {
            opacity:.65;
          }
        }

        @keyframes twinkle {
          0%,100% {
            opacity:.2;
            transform:scale3d(.85,.85,1);
          }
          50% {
            opacity:1;
            transform:scale3d(1.15,1.15,1);
          }
        }

        @keyframes moon-drift {
          0%,100% {
            transform:translate3d(0,0,0) rotate(0deg);
          }
          50% {
            transform:translate3d(0,-8px,0) rotate(1.2deg);
          }
        }

        @keyframes sun-rotate {
          from {
            transform:translate3d(-50%,0,0) rotate(0deg);
          }
          to {
            transform:translate3d(-50%,0,0) rotate(360deg);
          }
        }

        @keyframes corona-breathe {
          0%,100% {
            opacity:.55;
            transform:scale3d(1,1,1);
          }
          50% {
            opacity:.85;
            transform:scale3d(1.07,1.07,1);
          }
        }

        @keyframes aurora-drift-1 {
          0%,100% {
            transform:translate3d(-4%,0,0);
          }
          50% {
            transform:translate3d(4%,-3%,0);
          }
        }

        @keyframes aurora-drift-2 {
          0%,100% {
            transform:translate3d(3%,0,0);
          }
          50% {
            transform:translate3d(-5%,2%,0);
          }
        }

        @keyframes horizon-shimmer {
          0%,100% {
            opacity:.6;
          }
          50% {
            opacity:.9;
          }
        }

        @keyframes beacon {
          0%,70%,100% {
            opacity:.15;
          }
          80%,90% {
            opacity:1;
          }
        }

        @keyframes window-flicker {
          0%,100% {
            opacity:1;
          }
          45% {
            opacity:.15;
          }
          60% {
            opacity:.9;
          }
        }

        @keyframes diya-flicker {
          0%,100% {
            opacity:.85;
          }
          30% {
            opacity:.5;
          }
          55% {
            opacity:1;
          }
          75% {
            opacity:.65;
          }
        }

        @keyframes water-glint {
          0%,100% {
            opacity:.15;
          }
          50% {
            opacity:.8;
          }
        }

        @keyframes lantern-rise {
          0% {
            transform:translate3d(0,0,0);
            opacity:0;
          }
          6% {
            opacity:1;
          }
          85% {
            opacity:1;
          }
          100% {
            transform:translate3d(var(--lx),-115vh,0);
            opacity:0;
          }
        }

        @keyframes lantern-glow {
          0%,100% {
            opacity:.7;
          }
          50% {
            opacity:1;
          }
        }

        @keyframes shoot-v2 {
          0% {
            transform:translate3d(0,0,0) rotate(135deg);
            opacity:0;
          }
          0.8% {
            opacity:1;
          }
          6% {
            opacity:1;
          }
          6.8% {
            transform:translate3d(var(--ss-tx),var(--ss-ty),0) rotate(135deg);
            opacity:0;
          }
          100% {
            transform:translate3d(var(--ss-tx),var(--ss-ty),0) rotate(135deg);
            opacity:0;
          }
        }

        @keyframes bird-fly {
          0% {
            transform:translate3d(-12vw,3vh,0);
          }
          100% {
            transform:translate3d(112vw,-4vh,0);
          }
        }

        @keyframes bird-bob {
          0%,100% {
            transform:translate3d(0,0,0);
          }
          50% {
            transform:translate3d(0,-7px,0);
          }
        }

        @keyframes wing-l {
          0% { transform:rotate(22deg); }
          8% { transform:rotate(-24deg); }
          16% { transform:rotate(22deg); }
          24% { transform:rotate(-24deg); }
          32% { transform:rotate(22deg); }
          40% { transform:rotate(-24deg); }
          48% { transform:rotate(18deg); }
          58% { transform:rotate(6deg); }
          90% { transform:rotate(3deg); }
          100% { transform:rotate(22deg); }
        }

        @keyframes wing-r {
          0% { transform:rotate(-22deg); }
          8% { transform:rotate(24deg); }
          16% { transform:rotate(-22deg); }
          24% { transform:rotate(24deg); }
          32% { transform:rotate(-22deg); }
          40% { transform:rotate(24deg); }
          48% { transform:rotate(-18deg); }
          58% { transform:rotate(-6deg); }
          90% { transform:rotate(-3deg); }
          100% { transform:rotate(-22deg); }
        }

        .a-cloud {
          animation:cloud-drift linear infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-twk-far {
          animation:twinkle-far 6s ease-in-out infinite;
          will-change:opacity;
        }

        .a-twk {
          animation:twinkle 4s ease-in-out infinite;
          will-change:transform,opacity;
          backface-visibility:hidden;
        }

        .a-moon {
          animation:moon-drift 12s ease-in-out infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-sun-rot {
          animation:sun-rotate 60s linear infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-corona {
          animation:corona-breathe 5s ease-in-out infinite;
          will-change:transform,opacity;
          backface-visibility:hidden;
        }

        .a-aur-1 {
          animation:aurora-drift-1 18s ease-in-out infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-aur-2 {
          animation:aurora-drift-2 22s ease-in-out infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-shoot {
          animation:shoot-v2 linear infinite;
          will-change:transform,opacity;
          backface-visibility:hidden;
        }

        .a-bird {
          animation:bird-fly linear infinite;
          will-change:transform;
          backface-visibility:hidden;
        }

        .a-bob {
          animation:bird-bob ease-in-out infinite;
          will-change:transform;
        }

        .a-wing-l {
          animation:wing-l ease-in-out infinite;
          transform-origin:20px 10px;
        }

        .a-wing-r {
          animation:wing-r ease-in-out infinite;
          transform-origin:20px 10px;
        }

        .a-horizon {
          animation:horizon-shimmer 8s ease-in-out infinite;
        }

        .a-beacon {
          animation:beacon 3.4s ease-in-out infinite;
        }

        .a-window {
          animation:window-flicker 5s ease-in-out infinite;
        }

        .a-diya {
          animation:diya-flicker ease-in-out infinite;
        }

        .a-glint {
          animation:water-glint 4s ease-in-out infinite;
        }

        .a-lantern {
          animation:lantern-rise linear infinite;
          will-change:transform,opacity;
          backface-visibility:hidden;
        }

        .a-lglow {
          animation:lantern-glow 2.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .a-cloud,
          .a-twk-far,
          .a-twk,
          .a-moon,
          .a-sun-rot,
          .a-corona,
          .a-aur-1,
          .a-aur-2,
          .a-shoot,
          .a-bird,
          .a-bob,
          .a-wing-l,
          .a-wing-r,
          .a-horizon,
          .a-beacon,
          .a-window,
          .a-diya,
          .a-glint,
          .a-lantern,
          .a-lglow {
            animation:none !important;
            will-change:auto !important;
          }

          .a-bird {
            transform:translate3d(40vw,0,0);
          }

          .a-lantern {
            opacity:0.8;
          }
        }
      `}</style>

      {/* ── NIGHT SKY ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 1 : 0,
          background:
            "radial-gradient(circle at 75% 15%, #1c1745 0%, #100c30 32%, #070518 66%, #020109 100%)",
        }}
      />

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0.5 : 0,
          background:
            "linear-gradient(115deg, transparent 28%, rgba(150,160,255,0.07) 42%, rgba(220,200,255,0.1) 50%, rgba(150,160,255,0.06) 58%, transparent 72%)",
        }}
      />

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0.45 : 0,
          background:
            "radial-gradient(circle at 80% 20%, rgba(129,140,248,0.16) 0%, rgba(192,132,252,0.09) 35%, transparent 65%)",
        }}
      />

      {/* ── AURORA ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0.55 : 0,
          mixBlendMode: "screen",
        }}
      >
        <div
          className="absolute a-aur-1"
          style={{
            top: "6%",
            left: "-10%",
            width: "70%",
            height: "34%",
            background:
              "radial-gradient(ellipse at center, rgba(94,234,212,0.24) 0%, rgba(94,234,212,0) 70%)",
            filter: "blur(36px)",
          }}
        />

        <div
          className="absolute a-aur-2"
          style={{
            top: "16%",
            right: "-15%",
            width: "60%",
            height: "30%",
            background:
              "radial-gradient(ellipse at center, rgba(196,181,253,0.22) 0%, rgba(196,181,253,0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── DAY SKY ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0 : 1,
          background:
            "linear-gradient(to bottom, #8fbbe3 0%, #b9d6ec 22%, #e4e6e6 42%, #fbe4c3 62%, #f9cd9b 82%, #f4b985 100%)",
        }}
      />

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0 : 0.85,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 12%, rgba(255,247,222,0.9) 0%, rgba(255,226,170,0.45) 40%, transparent 75%)",
        }}
      />

      {/* ── DAY CLOUDS ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0 : 1,
          contain: "layout style",
        }}
      >
        <div className="absolute -inset-4">
          {clouds.map((c) => (
            <div
              key={c.id}
              className="absolute a-cloud"
              style={{
                top: `${c.top}%`,
                left: "-30vw",
                opacity: c.opacity,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  transform: `scale(${c.scale})`,
                  transformOrigin:
                    "left top",
                  width: 220,
                  height: 90,
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    left: 6,
                    top: 38,
                    width: 190,
                    height: 40,
                    background:
                      "radial-gradient(ellipse at center, rgba(244,196,160,0.55) 0%, transparent 70%)",
                  }}
                />

                {c.puffs.map((p, k) => (
                  <div
                    key={k}
                    className="absolute rounded-full"
                    style={{
                      left: p.x,
                      top: 26 + p.y,
                      width: p.w,
                      height: p.h,
                      background:
                        "radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.96) 0%, rgba(255,246,236,0.7) 50%, transparent 72%)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BIRDS ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0 : 1,
          contain: "layout style",
        }}
      >
        <div className="absolute -inset-4">
          {birds.map((b) => (
            <div
              key={b.id}
              className="absolute a-bird"
              style={{
                top: `${b.top}%`,
                left: 0,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            >
              <div
                style={{
                  transform: `translate3d(${-b.offset}px, ${
                    (b.id % 3) * 6
                  }px, 0)`,
                }}
              >
                <div
                  className="a-bob"
                  style={{
                    animationDuration: `${b.flap * 1.9}s`,
                    animationDelay: `${b.bobDelay}s`,
                  }}
                >
                  <svg
                    width={40 * b.scale}
                    height={20 * b.scale}
                    viewBox="0 0 40 20"
                    style={{
                      opacity: b.far
                        ? 0.4
                        : 0.7,
                      overflow: "visible",
                    }}
                  >
                    <g fill="#4a3a30">
                      <path
                        className="a-wing-l"
                        style={{
                          animationDuration: `${b.flap}s`,
                          animationDelay: `${b.flapDelay}s`,
                        }}
                        d="M20 10 C16 5.5 9 3.5 1 7 C8 7 14 9 20 11.5 Z"
                      />

                      <path
                        className="a-wing-r"
                        style={{
                          animationDuration: `${b.flap}s`,
                          animationDelay: `${b.flapDelay}s`,
                        }}
                        d="M20 10 C24 5.5 31 3.5 39 7 C32 7 26 9 20 11.5 Z"
                      />

                      <ellipse
                        cx="20"
                        cy="11"
                        rx="2.6"
                        ry="1.6"
                      />

                      <circle
                        cx="22.8"
                        cy="10.3"
                        r="1.1"
                      />

                      <path d="M17.6 11.4 L13.8 13.2 L17.8 12.6 Z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOON ── */}

      <div
        className="absolute transition-[opacity,transform] duration-[1200ms] ease-in-out a-moon"
        style={{
          opacity: isDark ? 1 : 0,
          top: "8%",
          right: "12%",
          width:
            "clamp(84px, 16vw, 150px)",
          height:
            "clamp(84px, 16vw, 150px)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: "-70%",
            background:
              "radial-gradient(circle, rgba(210,222,255,0.16) 0%, rgba(170,190,255,0.07) 40%, transparent 70%)",
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            inset: "-22%",
            background:
              "radial-gradient(circle, rgba(230,238,255,0.28) 0%, rgba(200,215,255,0.1) 55%, transparent 75%)",
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
            }}
          />

          <div
            className="absolute inset-[-8%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 80% 22%, rgba(6,6,18,0.97) 0%, rgba(8,8,22,0.9) 30%, rgba(8,8,22,0.55) 48%, rgba(8,8,22,0.1) 62%, transparent 72%)",
              transform:
                "translate(-6%, -4%)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 3px 3px 6px rgba(255,255,255,0.35)",
            }}
          />
        </div>
      </div>

      {/* ── SUN ── */}

      <div
        className="absolute transition-[opacity,transform] duration-[1200ms] ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          top: "6%",
          left: "50%",
          transform: isDark
            ? "translate(-50%, -50px) scale(0.85)"
            : "translate(-50%, 0) scale(1)",
          width:
            "clamp(90px, 20vw, 160px)",
          height:
            "clamp(90px, 20vw, 160px)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ opacity: 0.6 }}
        >
          {[
            -24,
            -14,
            -6,
            0,
            6,
            14,
            24,
          ].map((angle) => (
            <div
              key={angle}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: "6px",
                height: "62vh",
                background:
                  "linear-gradient(to bottom, rgba(255,246,220,0.34), rgba(255,246,220,0) 80%)",
                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                transformOrigin:
                  "top center",
                filter: "blur(6px)",
              }}
            />
          ))}
        </div>

        <div
          className="absolute rounded-full a-corona"
          style={{
            inset: "-90%",
            background:
              "radial-gradient(circle, rgba(255,235,175,0.4) 0%, rgba(255,195,110,0.15) 45%, transparent 75%)",
          }}
        />

        <div
          className="absolute a-sun-rot"
          style={{
            inset: "-120%",
            left: "50%",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient
                id="rayGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255,236,180,0.5)"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(255,236,180,0)"
                />
              </linearGradient>
            </defs>

            {Array.from(
              { length: 12 },
              (_, i) => (
                <rect
                  key={i}
                  x="98.5"
                  y="0"
                  width="3"
                  height="90"
                  fill="url(#rayGrad)"
                  transform={`rotate(${
                    i * 30
                  }, 100, 100)`}
                />
              ),
            )}
          </svg>
        </div>

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #ffffff 0%, #fffbf0 20%, #fff2cf 40%, #fde6b6 62%, #f9be7b 85%, #f2932f 100%)",
            boxShadow:
              "0 0 clamp(30px,7vw,55px) clamp(10px,2.5vw,20px) rgba(253,224,71,0.45), 0 0 clamp(60px,14vw,110px) clamp(20px,5vw,38px) rgba(251,146,60,0.25)",
          }}
        />
      </div>

      {/* ── STARS ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0.6 : 0,
          contain: "layout style",
        }}
      >
        <div className="absolute -inset-4">
          {farStars.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white a-twk-far"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0.9 : 0,
          contain: "layout style",
        }}
      >
        <div className="absolute -inset-4">
          {nearStars.map((s) => (
            <div
              key={s.id}
              className="absolute a-twk"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  opacity: 0.9,
                  background: s.tint,
                }}
              />

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
      </div>

      {/* ── SHOOTING STARS ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 1 : 0,
          contain: "layout style",
        }}
      >
        {shootingStars.map((s) => (
          <div
            key={s.id}
            className="absolute a-shoot"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.length,
                height: 1.5,
                borderRadius: 999,
                background: `linear-gradient(to right, ${s.gradient})`,
                filter: `drop-shadow(0 0 3px ${s.glow}) drop-shadow(0 0 7px ${s.glow})`,
                animationDuration: `${s.cycle}s`,
                animationDelay: `${s.delay}s`,
                opacity: 0,
                "--ss-tx": `-${s.travel}px`,
                "--ss-ty": `${s.travel}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── SKY LANTERNS ── */}

      <div
        className={`absolute inset-0 ${fade}`}
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
                  height:
                    l.size * 1.25,
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
                  animationDelay: `${
                    (i * 0.5) % 2.4
                  }s`,
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  borderRadius:
                    "40% 40% 30% 30%",
                  background:
                    "radial-gradient(ellipse at 50% 70%, #fff3b0 0%, #ffb347 55%, #e8641c 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── AMBIENT VIGNETTE ── */}

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 1 : 0,
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(2,1,12,0.5) 100%)",
        }}
      />

      <div
        className={`absolute inset-0 ${fade}`}
        style={{
          opacity: isDark ? 0 : 1,
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 60%, rgba(150,80,40,0.16) 100%)",
        }}
      />

      {/* ── INDIAN SKYLINE ── */}

      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height:
            "clamp(150px, 30vh, 340px)",
        }}
      >
        {/* horizon glow */}

        <div
          className={`absolute inset-x-0 bottom-0 h-[85%] ${fade}`}
          style={{
            opacity: isDark ? 1 : 0,
            background:
              "linear-gradient(to top, rgba(255,160,90,0.26) 0%, rgba(150,110,220,0.1) 45%, transparent 100%)",
          }}
        />

        <div
          className={`absolute inset-x-0 bottom-0 h-[85%] ${fade}`}
          style={{
            opacity: isDark ? 0 : 1,
            background:
              "linear-gradient(to top, rgba(255,214,160,0.75) 0%, rgba(255,230,190,0.3) 50%, transparent 100%)",
          }}
        />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 w-full h-full"
          style={{
            shapeRendering:
              "geometricPrecision",
          }}
        >
          <defs>
            <radialGradient
              id="taj-glow"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="#ffb86b"
                stopOpacity="0.36"
              />
              <stop
                offset="55%"
                stopColor="#8f6bff"
                stopOpacity="0.13"
              />
              <stop
                offset="100%"
                stopColor="#8f6bff"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* far haze */}

          <g>
            <path
              d={city.far.body}
              style={tone(
                "#14113a",
                "#e6c9ad",
                0.9,
                0.85,
              )}
            />
          </g>

          {/* old town */}

          <g>
            <path
              d={city.town.body}
              style={tone(
                "#0d0b2b",
                "#d9b595",
              )}
            />

            <path
              d={city.town.lit}
              style={tone(
                "#ffd99a",
                "#fff4de",
                0.5,
                0.4,
              )}
            />
          </g>

          {/* floodlight glow behind Taj */}

          <ellipse
            cx={TAJ_X}
            cy={230}
            rx={240}
            ry={130}
            fill="url(#taj-glow)"
            style={{
              opacity: isDark
                ? 1
                : 0,
              transition:
                "opacity 1.2s ease-in-out",
            }}
          />

          {/* sandstone monuments */}

          <g>
            <path
              d={city.stone.body}
              style={tone(
                "#090720",
                "#c1694f",
              )}
            />

            <path
              d={city.stone.lit}
              style={tone(
                "#ffbd6b",
                "#ffe8c6",
                0.7,
                0.5,
              )}
            />
          </g>

          {/* Lotus Temple */}

          <g>
            <path
              d={city.lotus}
              style={{
                ...tone(
                  "#2a2860",
                  "#fff3e6",
                ),
                stroke: isDark
                  ? "#14123a"
                  : "#e2c2a4",
                strokeWidth: 0.9,
                strokeLinejoin:
                  "round",
              }}
            />
          </g>

          {/* Taj Mahal */}

          <g>
            <path
              d={city.taj.body}
              style={tone(
                "#2f2d66",
                "#fff8ef",
              )}
            />

            <path
              d={city.taj.lit}
              style={tone(
                "#ffd78f",
                "#d9a98a",
                0.75,
                0.55,
              )}
            />
          </g>

          {/* foreground */}

          <g>
            <path
              d={city.palms}
              style={tone(
                "#03020c",
                "#8c5f48",
              )}
            />

            <path
              d={city.pool}
              style={tone(
                "#4a4fa8",
                "#9fd0e6",
                0.6,
                0.7,
              )}
            />

            <path
              d={city.glints}
              className="a-glint"
              style={{
                fill: isDark
                  ? "#ffe3a8"
                  : "#ffffff",
              }}
            />
          </g>

          {/* night-only details */}

          <g
            style={{
              opacity: isDark
                ? 1
                : 0,
              transition:
                "opacity 1.2s ease-in-out",
            }}
          >
            {city.town.flicker.map(
              (w, i) => (
                <rect
                  key={i}
                  x={w.x}
                  y={w.y}
                  width="3"
                  height="4"
                  fill={
                    i % 3 === 0
                      ? "#9fd8ff"
                      : "#ffe3a8"
                  }
                  className="a-window"
                  style={{
                    animationDelay: `${
                      (i * 0.9) % 5
                    }s`,
                    animationDuration: `${
                      4 + (i % 4)
                    }s`,
                  }}
                />
              ),
            )}

            <circle
              cx={city.beacon.x}
              cy={city.beacon.y}
              r="1.8"
              fill="#ff4d4d"
              className="a-beacon"
            />

            {diyas.map((d, i) => (
              <g key={i}>
                <circle
                  cx={d.x}
                  cy={d.y}
                  r="4"
                  fill="rgba(255,160,50,0.2)"
                />

                <circle
                  cx={d.x}
                  cy={d.y}
                  r="1.2"
                  fill="#ffcf70"
                  className="a-diya"
                  style={{
                    animationDelay: `${d.delay}s`,
                    animationDuration: `${d.dur}s`,
                  }}
                />
              </g>
            ))}
          </g>
        </svg>

        {/* rim-light */}

        <div
          className={`absolute inset-x-0 bottom-0 h-px a-horizon ${fade}`}
          style={{
            opacity: isDark
              ? 1
              : 0,
            background:
              "linear-gradient(to right, transparent, rgba(150,160,220,0.25), transparent)",
          }}
        />
      </div>
    </div>
  );
}
