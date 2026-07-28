"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { invitation } from "@/data/weddingData";

export default function DateScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksCanvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const scratching = useRef(false);
  const progressRef = useRef(0);

  // ── Scratch Canvas Initialization ──
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width;
    const h = rect.height;

    // Brushed Gold Leaf Gradient
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#d4af37");
    g.addColorStop(0.3, "#f3e5ab");
    g.addColorStop(0.6, "#c59b27");
    g.addColorStop(1, "#aa7c11");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Gold Speckles / Texture
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * w,
        Math.random() * h,
        0.5 + Math.random() * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.3})`;
      ctx.fill();
    }

    // Subtle Gold Diagonal Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // Elegant text on the gold scratch surface
    ctx.fillStyle = "rgba(40, 30, 10, 0.8)";
    ctx.font = "italic 500 12px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch or Swipe to Reveal ✦", w / 2, h / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);
    
    const observer = new ResizeObserver(() => initCanvas());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [initCanvas]);

  // ── Trigger Reveal Animation ──
  const triggerReveal = useCallback(() => {
    if (revealed) return;
    setIsFading(true);
    setTimeout(() => {
      setRevealed(true);
    }, 400); // Matches CSS transition duration
  }, [revealed]);

  // ── Optimized Fireworks Engine ──
  useEffect(() => {
    if (!revealed || !fireworksCanvasRef.current) return;

    const canvas = fireworksCanvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    const resizeCanvas = () => {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const PALETTE = ["#f3e5ab", "#d4af37", "#f6c9c0", "#ffe9c7", "#eecfa1"];
    const HOT_SPARK = "#fffdf0";
    const ALL_COLORS = [...PALETTE, HOT_SPARK];

    // Pre-render glow sprites for performance
    const SPRITE_SIZE = 48;
    const sprites = new Map<string, HTMLCanvasElement>();
    for (const color of ALL_COLORS) {
      const s = document.createElement("canvas");
      s.width = SPRITE_SIZE;
      s.height = SPRITE_SIZE;
      const sctx = s.getContext("2d")!;
      const r = SPRITE_SIZE / 2;
      const grad = sctx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, color);
      grad.addColorStop(0.35, color);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = grad;
      sctx.beginPath();
      sctx.arc(r, r, r, 0, Math.PI * 2);
      sctx.fill();
      sprites.set(color, s);
    }

    const cores = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    const isSmallScreen = displayWidth < 480;
    const lowPower = isSmallScreen || cores <= 4;
    const scale = lowPower ? 0.5 : 1;
    const MAX_PARTICLES = lowPower ? 140 : 280;

    type Particle = {
      x: number; y: number; prevX: number; prevY: number;
      vx: number; vy: number; alpha: number; color: string;
      decay: number; size: number; gravity: number;
    };

    type Rocket = {
      x: number; fromY: number; toY: number; start: number; duration: number; color: string;
    };

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

    const createExplosion = (x: number, y: number, count: number) => {
      const n = Math.min(Math.round(count * scale), Math.max(0, MAX_PARTICLES - particles.length));
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (2 + Math.random() * 3.5) * (isSmallScreen ? 0.8 : 1);
        const color = i % 8 === 0 ? HOT_SPARK : PALETTE[Math.floor(Math.random() * PALETTE.length)];
        particles.push({
          x, y, prevX: x, prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1, color,
          decay: 0.015 + Math.random() * 0.012,
          size: 2.5 + Math.random() * 3,
          gravity: 0.04 + Math.random() * 0.02,
        });
      }
    };

    const launchBurst = (x: number, y: number, count: number, delay: number) => {
      const rocketColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      timeouts.push(setTimeout(() => {
        rockets.push({
          x: x + (Math.random() - 0.5) * 20,
          fromY: displayHeight + 20,
          toY: y,
          start: performance.now(),
          duration: 240,
          color: rocketColor,
        });
      }, delay));
      timeouts.push(setTimeout(() => {
        createExplosion(x, y, count);
      }, delay + 240));
    };

    const rect = containerRef.current?.getBoundingClientRect();
    const startX = rect ? rect.left + rect.width / 2 : displayWidth / 2;
    const startY = rect ? rect.top + rect.height / 2 : displayHeight / 2;

    launchBurst(startX, startY - 20, 60, 0);
    launchBurst(startX - 90, startY - 80, 35, 200);
    launchBurst(startX + 90, startY - 70, 35, 400);

    let animationId: number;
    let lastTimestamp: number | null = null;

    const render = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 16.6667, 2.5);
      lastTimestamp = timestamp;

      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.globalCompositeOperation = "lighter";

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        const t = Math.min((timestamp - r.start) / r.duration, 1);
        const y = r.fromY + (r.toY - r.fromY) * easeOutQuad(t);

        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(r.x, y);
        ctx.lineTo(r.x, y + 15);
        ctx.stroke();

        if (t >= 1) rockets.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;
        p.vx *= Math.pow(0.98, dt);
        p.vy = p.vy * Math.pow(0.98, dt) + p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= p.decay * dt;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const sprite = sprites.get(p.color)!;
        const s = p.size * 2;

        ctx.globalAlpha = p.alpha * 0.15;
        ctx.drawImage(sprite, p.prevX - s / 2, p.prevY - s / 2, s, s);

        ctx.globalAlpha = p.alpha;
        ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (particles.length > 0 || rockets.length > 0) {
        animationId = requestAnimationFrame(render);
      }
    };
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      timeouts.forEach(clearTimeout);
    };
  }, [revealed]);

  // ── Scratching Interaction ──
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // Larger radius on touch/mobile for easier clearing
    const radius = window.innerWidth < 768 ? 26 : 22;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    progressRef.current++;
    // Check transparency ratio less frequently for smooth device performance
    if (progressRef.current % 12 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 16) { // sampled checks for performance
        if (data[i] < 128) transparent++;
      }
      if (transparent / (data.length / 16) > 0.4) {
        triggerReveal();
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    scratching.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scratch(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!scratching.current) return;
    scratch(e.clientX, e.clientY);
  };
  const onPointerUp = () => {
    scratching.current = false;
  };

  return (
    <>
      {/* Full-screen canvas for celebration fireworks */}
      <canvas
        ref={fireworksCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      <div className="w-full max-w-[300px] mx-auto select-none mt-4 flex flex-col items-center gap-2">
        <div
          ref={containerRef}
          className="relative w-full rounded-full overflow-hidden border border-[var(--border-strong)] transition-all duration-300 shadow-sm"
          style={{
            height: 48,
            background: "var(--surface-2)",
          }}
        >
          {/* Date underneath */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <p
              className="font-serif italic tracking-wider text-base sm:text-lg"
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              {invitation.date}
            </p>
          </div>

          {/* Scratch Canvas overlay with smooth fade out */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 touch-none z-10 transition-opacity duration-400 cursor-pointer ${
                isFading ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
          )}
        </div>

        {/* Quick reveal helper link for accessibility / convenience */}
        {!revealed && (
          <button
            onClick={triggerReveal}
            className="text-[11px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity font-sans py-1 px-3 text-[var(--text-secondary)]"
            type="button"
          >
            Tap to reveal instantly ✨
          </button>
        )}
      </div>
    </>
  );
}