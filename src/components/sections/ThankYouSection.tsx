"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import {
  couple,
  invitedBy,
  contacts,
  thankYouMessage,
} from "@/data/weddingData";

const WAX_DRIPS = [
  { side: "left" as const, top: 24, width: 6, height: 18 },
  { side: "right" as const, top: 38, width: 5, height: 14 },
];

function Candle() {
  return (
    <div
      className="relative w-[24px] h-[100px] mx-auto mb-10"
      aria-hidden="true"
    >
      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-[0px] w-[80px] h-[80px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,200,100,0.5)_0%,rgba(255,150,50,0.1)_50%,transparent_70%)] blur-[8px] pointer-events-none animate-[ty-glow-pulse_3s_ease-in-out_infinite] motion-reduce:animate-none" />

      {/* Flame */}
      <div className="absolute left-1/2 top-[-16px] w-[14px] h-[28px] -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_80%,#fffaf0_0%,#ffd770_35%,#f99d45_65%,#e65c19_100%)] shadow-[0_0_16px_4px_rgba(255,180,80,0.4)] origin-[50%_100%] animate-[ty-flicker_2.6s_ease-in-out_infinite] motion-reduce:animate-none" />

      {/* Wick */}
      <div className="absolute left-1/2 top-[8px] w-[2px] h-[10px] -translate-x-1/2 bg-[#2a221c] rounded-full" />

      {/* Candle Body */}
      <div className="absolute left-1/2 bottom-0 w-[24px] h-[84px] -translate-x-1/2 rounded-t-sm bg-gradient-to-b from-stone-100 to-stone-300 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.06),inset_2px_0_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.1)]" />

      {/* Wax Drips */}
      {WAX_DRIPS.map((drip) => (
        <div
          key={drip.side}
          className={`absolute rounded-b-full bg-gradient-to-b from-stone-100 to-stone-200 ${
            drip.side === "left" ? "left-[3px]" : "right-[2px]"
          }`}
          style={{ top: drip.top, width: drip.width, height: drip.height }}
        />
      ))}

      {/* Base Shadow */}
      <div className="absolute left-1/2 bottom-[-4px] w-[50px] h-[8px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)] opacity-20" />
    </div>
  );
}

export default function ThankYouSection() {
  const [opened, setOpened] = useState(false);

  return (
    <section
      id="thanks"
      className="relative py-24 md:py-32 px-5 text-center overflow-hidden flex flex-col items-center"
    >
      <style>{`
        @keyframes ty-flicker {
          0%   { transform: translateX(-50%) scaleY(1) scaleX(1) rotate(-1deg); opacity: 0.95; }
          20%  { transform: translateX(-50%) scaleY(1.08) scaleX(0.95) rotate(1.5deg); opacity: 1; }
          40%  { transform: translateX(-50%) scaleY(0.94) scaleX(1.04) rotate(-2deg); opacity: 0.9; }
          60%  { transform: translateX(-50%) scaleY(1.05) scaleX(0.97) rotate(1deg); opacity: 1; }
          80%  { transform: translateX(-50%) scaleY(0.97) scaleX(1.02) rotate(-1.5deg); opacity: 0.95; }
          100% { transform: translateX(-50%) scaleY(1) scaleX(1) rotate(-1deg); opacity: 0.95; }
        }
        @keyframes ty-glow-pulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.15); }
        }

        /* ── Flawless Grid Collapse ── */
        .ty-letter-grid {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 1s cubic-bezier(0.25, 1, 0.3, 1) 0.2s;
          width: 100%;
          max-width: 36rem;
        }
        .ty-letter-grid.is-open {
          grid-template-rows: 1fr;
        }
        .ty-letter-inner {
          overflow: hidden;
        }

        /* The padding sits INSIDE the hidden area to prevent layout jumps */
        .ty-letter-content {
          padding-top: 3rem;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s cubic-bezier(0.25, 1, 0.3, 1) 0.6s;
        }
        .ty-letter-grid.is-open .ty-letter-content {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .ty-letter-grid,
          .ty-letter-content {
            transition: none !important;
          }
        }
      `}</style>

      <Reveal
        type="fade-up"
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* ── Premium Envelope ── */}
        <button
          type="button"
          className={`relative w-[260px] md:w-[280px] h-[170px] md:h-[180px] mx-auto block group rounded-lg transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 ${
            opened
              ? "scale-95 translate-y-2 pointer-events-none"
              : "hover:-translate-y-1 cursor-pointer"
          }`}
          onClick={() => setOpened(true)}
          aria-expanded={opened}
          aria-controls="ty-letter-panel"
          aria-label={
            opened ? "Letter opened" : "Untie the ribbon to open your letter"
          }
          disabled={opened}
        >
          {/* Envelope Back */}
          <div className="absolute inset-0 rounded-lg bg-stone-200 shadow-2xl shadow-stone-900/10 overflow-hidden" />

          {/* Left Flap */}
          <div
            className="absolute inset-0 bg-stone-100"
            style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
          />
          {/* Right Flap */}
          <div
            className="absolute inset-0 bg-stone-100"
            style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
          />
          {/* Bottom Flap */}
          <div
            className="absolute inset-0 bg-stone-50 shadow-[0_-2px_15px_rgba(0,0,0,0.06)]"
            style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}
          />

          {/* Top Flap (Animated) */}
          <div
            className="absolute inset-0 bg-stone-200 origin-top transition-all duration-[900ms] ease-[cubic-bezier(0.25,1,0.3,1)] shadow-sm z-10 motion-reduce:transition-none"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 56%)",
              transform: opened ? "rotateX(175deg)" : "rotateX(0deg)",
              opacity: opened ? 0 : 1, // Fades out to prevent Safari 3D rendering bugs
              WebkitBackfaceVisibility: "hidden", // Crucial for iOS Safari stability
            }}
          />

          {/* ── Ribbon & Foil Badge (Replaces the Wax Seal) ── */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.3,1)] ${
              opened
                ? "opacity-0 scale-105 translate-y-4"
                : "opacity-100 scale-100"
            }`}
          >
            {/* Horizontal Belly Band */}
            <div className="absolute top-[56%] left-0 w-full h-[28px] -translate-y-1/2 bg-gradient-to-r from-[#d1b882] via-[#f9f1d8] to-[#d1b882] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-y border-[#c3a869]/30" />

            {/* Premium Foil Badge */}
            <div className="absolute top-[56%] left-1/2 w-[64px] h-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fdfbf9] border border-[#d1b882] flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 ease-out">
              {/* Inner elegance ring */}
              <div className="absolute inset-1.5 rounded-full border border-[#d1b882]/50 pointer-events-none" />

              <span className="font-script text-[26px] text-[#b89a55] tracking-tighter leading-none -translate-y-[1px]">
                {couple.coupleMonogramText}
              </span>
            </div>
          </div>
        </button>

        {/* Hint Text */}
        <p
          className={`font-body mt-8 text-[13px] tracking-[0.1em] uppercase text-stone-500 dark:text-stone-400 transition-all duration-500 ${
            opened
              ? "opacity-0 translate-y-2 pointer-events-none"
              : "opacity-100"
          }`}
        >
          Tap or click to open
        </p>
      </Reveal>

      {/* ── Letter Content ── */}
      <div
        id="ty-letter-panel"
        className={`ty-letter-grid ${opened ? "is-open" : ""}`}
        aria-hidden={!opened}
      >
        <div className="ty-letter-inner">
          <div className="ty-letter-content">
            {/* 1. Letter / Header Comes First */}
            <span className="block uppercase tracking-[0.25em] text-[11px] font-semibold text-accent/80 mb-6">
              With Love
            </span>

            {/* 2. Then Comes the Candle */}
            <Candle />

            {/* 3. Then Comes the Thank You Section */}
            <h2 className="font-serif italic text-5xl md:text-[4.2rem] leading-[1.1] text-text-primary tracking-tight mb-8">
              Thank You
            </h2>

            {/* Delicate Divider */}
            <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-8" />

            {/* Message body */}
            <p className="font-body text-[16px] md:text-[18px] leading-[1.8] text-text-secondary max-w-xl mx-auto font-light">
              {thankYouMessage}
            </p>

            {/* Beautiful Monogram Conclusion */}
            <p className="font-script text-[56px] md:text-[64px] text-accent opacity-90 mt-10 mb-16 leading-none">
              {couple.coupleMonogramText}
            </p>

            {/* Hosted By Block */}
            <div className="pt-10 border-t border-stone-200 dark:border-stone-800/60 max-w-md mx-auto">
              <p className="font-body text-[13px] uppercase tracking-widest text-muted mb-3">
                {invitedBy.line}
              </p>
              <p className="font-serif text-[22px] md:text-[24px] text-text-primary font-medium tracking-wide">
                {invitedBy.hosts}
              </p>
              <p className="font-body text-[14px] text-muted font-light mt-3">
                {invitedBy.subline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-12 px-5 text-center border-t border-stone-200 dark:border-stone-800/60">
      <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 max-w-3xl mx-auto list-none">
        {contacts.map((c, idx) => (
          <li key={c.name} className="flex items-center gap-4 sm:gap-6">
            <p className="font-body text-[14px] text-text-secondary tracking-wide">
              <span className="font-medium mr-2">{c.name}</span>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="transition-colors duration-300 text-accent hover:text-accent/70 inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {c.phone}
              </a>
            </p>
            {/* Elegant Bullet Separator (hides on mobile, shows between items on desktop) */}
            {idx !== contacts.length - 1 && (
              <span
                className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ul>

      {/* Centered Monogram Footer */}
      <div className="flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default">
        <p
          className="font-script text-[28px] text-accent leading-none"
          aria-hidden="true"
        >
          {couple.coupleMonogramText}
        </p>
        <span className="sr-only">{couple.coupleMonogramText}</span>
      </div>
    </footer>
  );
}