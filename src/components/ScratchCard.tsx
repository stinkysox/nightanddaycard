"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { invitation } from "@/data/weddingData";

export default function ScratchCard() {
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

    /* ── Scratch surface gradient ── */
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0,   "#7a6040");
    g.addColorStop(0.3, "#9a7a50");
    g.addColorStop(0.6, "#b89060");
    g.addColorStop(1,   "#6a5030");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    /* ── Texture dots ── */
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 0.5 + Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.08})`;
      ctx.fill();
    }

    /* ── Gold diagonal lines ── */
    ctx.strokeStyle = "rgba(255,220,150,0.08)";
    ctx.lineWidth = 1;
    for (let i = -h; i < w + h; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    /* ── Center label ── */
    ctx.fillStyle = "rgba(255,240,200,0.22)";
    ctx.font = `400 11px var(--font-cormorant, serif)`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.2em";
    ctx.fillText("✦  scratch to reveal  ✦", w / 2, h / 2 - 4);
    ctx.font = `300 9px var(--font-cormorant, serif)`;
    ctx.fillStyle = "rgba(255,240,200,0.14)";
    ctx.fillText("your invitation awaits", w / 2, h / 2 + 14);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
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
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    /* ── Progress check (sample every ~20 scratch events) ── */
    progressRef.current++;
    if (progressRef.current % 20 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 128) transparent++;
      }
      if (transparent / (data.length / 4) > 0.42) setRevealed(true);
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
  const onPointerUp = () => { scratching.current = false; };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* ── Hint text above ── */}
      {!revealed && !started && (
        <p
          className="eyebrow text-center mb-3"
          style={{
            color: "var(--muted)",
            animation: "hint-pulse 2.4s ease-in-out infinite",
          }}
        >
          Scratch below to reveal
        </p>
      )}

      {/* ── Card ── */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          height: 170,
          border: "1px solid var(--border)",
          background: "var(--surface)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Revealed content ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center gap-1">
          <p
            className="eyebrow"
            style={{ color: "var(--accent)" }}
          >
            Save the Date
          </p>
          <div
            className="w-6 h-px my-1.5"
            style={{ background: "var(--accent)", opacity: 0.5 }}
          />
          <p
            className="font-serif italic"
            style={{ fontSize: 20, color: "var(--text-primary)", marginTop: 2 }}
          >
            {invitation.date}
          </p>
          <p
            className="font-serif"
            style={{ fontSize: 14, color: "var(--muted)", marginTop: 2 }}
          >
            {invitation.venue}
          </p>
          <p
            className="font-serif italic"
            style={{ fontSize: 12, color: "var(--muted-2)", marginTop: 1 }}
          >
            {invitation.venueAddress}
          </p>
        </div>

        {/* ── Scratch canvas ── */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none z-10"
            style={{ cursor: "crosshair" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          />
        )}

        {/* ── Revealed glow flash ── */}
        {revealed && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,168,108,0.08) 0%, transparent 70%)",
            }}
          />
        )}
      </div>
    </div>
  );
}