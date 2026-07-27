"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { invitation } from "@/data/weddingData";

export default function DateScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const scratching = useRef(false);
  const progressRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width;
    const h = rect.height;

    // ── Brushed Gold Leaf Gradient ──
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#d4af37");
    g.addColorStop(0.3, "#f3e5ab");
    g.addColorStop(0.6, "#c59b27");
    g.addColorStop(1, "#aa7c11");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // ── Gold Speckles / Texture ──
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * w,
        Math.random() * h,
        0.5 + Math.random() * 1.2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.25})`;
      ctx.fill();
    }

    // ── Subtle Gold Diagonal Lines ──
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 12) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // ── Elegant text on the gold scratch surface ──
    ctx.fillStyle = "rgba(40, 30, 10, 0.75)";
    ctx.font = "italic 400 11px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "0.15em";
    ctx.fillText("✦ Scratch to Reveal Date ✦", w / 2, h / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    // Use an observer to handle changes in layout size cleanly
    const observer = new ResizeObserver(() => {
      initCanvas();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check transparency progress
    progressRef.current++;
    if (progressRef.current % 10 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 128) transparent++;
      }
      if (transparent / (data.length / 4) > 0.45) {
        setRevealed(true);
      }
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    scratching.current = true;
    setStarted(true);
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
    <div className="w-full max-w-[280px] mx-auto select-none mt-4">
      <div
        ref={containerRef}
        className="relative w-full rounded-full overflow-hidden border border-[var(--border-strong)] transition-shadow duration-300"
        style={{
          height: 44,
          background: "var(--surface-2)",
          boxShadow: revealed
            ? "none"
            : "0 6px 18px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Date underneath */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <p
            className="font-serif italic tracking-wide text-lg animate-shimmer"
            style={{
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {invitation.date}
          </p>
        </div>

        {/* Scratch Canvas overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none z-10"
            style={{ cursor: "pointer" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          />
        )}
      </div>
    </div>
  );
}
