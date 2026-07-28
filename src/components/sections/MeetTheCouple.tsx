"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/data/weddingData";

export default function MeetTheCouple() {
  const people = [
    { 
      ...couple.groom, 
      role: "The Groom",
      quote: "“Ready to spend a lifetime making you laugh.”" 
    },
    { 
      ...couple.bride, 
      role: "The Bride",
      quote: "“Found my forever in your eyes.”" 
    },
  ];

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    setFlippedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="couple" className="relative overflow-x-clip w-full py-20 md:py-32 px-5">
      {/* ── Heading ── */}
      <Reveal type="fade-up" className="text-center mb-16 md:mb-24">
        <span className="eyebrow tracking-widest uppercase text-sm" style={{ color: "var(--accent)" }}>
          The Couple
        </span>
        <h2
          className="font-serif italic mt-4"
          style={{
            fontSize: "clamp(36px, 8vw, 56px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Meet Us
        </h2>
        <div className="ornament-line mx-auto mt-6" />
      </Reveal>

      {/* ── Cards Container ── */}
      <div className="relative max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        
        {/* ── Center Glowing Heart (Desktop) ── */}
        <div className="hidden md:flex absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--background)] border border-[var(--border-strong)] shadow-[0_0_30px_rgba(212,175,55,0.15)] animate-pulse">
            <span className="text-[var(--accent)] text-xl">♥</span>
          </div>
        </div>

        {/* ── Couple Cards ── */}
        {people.map((person, idx) => {
          const isFlipped = flippedIndex === idx;

          return (
            <Reveal
              key={person.firstName}
              type={idx === 0 ? "slide-left" : "slide-right"}
              delay={idx * 0.15}
            >
              <div className="group flex flex-col items-center w-full select-none">
                
                {/* ──────────────── 3D CARD PORTRAIT ──────────────── */}
                <div 
                  className="relative cursor-pointer w-full max-w-[340px] aspect-[4/5] mx-auto"
                  style={{ perspective: "1500px" }}
                  onClick={() => handleCardClick(idx)}
                >
                  <div 
                    className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xl group-hover:shadow-2xl rounded-[2rem]"
                    style={{ 
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                    }}
                  >
                    {/* FRONT: Full Bleed Image */}
                    <div 
                      className="absolute inset-0 rounded-[2rem] overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "var(--card-bg)",
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      <Image
                        src={person.photo}
                        alt={person.fullName}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 90vw, 340px"
                        priority
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = `https://placehold.co/400x500/c9a96e/fff?text=${encodeURIComponent(person.firstName)}`;
                        }}
                      />
                      {/* Subtle Inner Vignette for Premium Look */}
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)] rounded-[2rem] pointer-events-none" />
                    </div>

                    {/* BACK: Story / Details */}
                    <div 
                      className="absolute inset-0 flex flex-col justify-center text-center p-8 rounded-[2rem]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "var(--card-bg)",
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full relative pointer-events-none">
                        {/* Decorative quote mark */}
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[80px] opacity-[0.07] font-serif leading-none" style={{ color: "var(--accent)" }}>
                          "
                        </span>

                        <span className="eyebrow tracking-widest text-[11px] uppercase mb-4" style={{ color: "var(--accent)" }}>
                          {person.role} Story
                        </span>

                        <p 
                          className="font-serif italic my-4 leading-relaxed"
                          style={{ fontSize: "clamp(16px, 4vw, 18px)", color: "var(--text-primary)" }}
                        >
                          {person.quote}
                        </p>

                        <div
                          className="w-12 h-[1px] my-6 mx-auto"
                          style={{ background: "var(--accent)", opacity: 0.3 }}
                        />

                        <h4 
                          className="font-body uppercase tracking-widest text-[10px] mb-3 font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Parents
                        </h4>
                        <p
                          className="font-body leading-relaxed px-2"
                          style={{
                            fontSize: 14,
                            color: "var(--muted)",
                          }}
                        >
                          {person.parentsLine}
                        </p>
                      </div>

                      <div className="pt-6 mt-auto pointer-events-none">
                        <span 
                          className="font-body text-[10px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                          style={{ color: "var(--accent)" }}
                        >
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                          Flip back
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ──────────────── TEXT BELOW CARD ──────────────── */}
                <div className="mt-8 text-center flex flex-col items-center">
                  <span className="eyebrow tracking-widest text-[11px] uppercase mb-3 font-semibold" style={{ color: "var(--accent)" }}>
                    {person.role}
                  </span>
                  
                  <h3
                    className="font-serif italic leading-none mb-5"
                    style={{
                      fontSize: "clamp(30px, 6vw, 36px)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {person.fullName}
                  </h3>

                  {/* Interactive Flip Trigger */}
                  <button 
                    onClick={() => handleCardClick(idx)}
                    className="group/btn relative font-body text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 px-4 py-2 overflow-hidden"
                    style={{ color: "var(--accent)" }}
                    aria-expanded={isFlipped}
                  >
                    <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover/btn:-translate-y-0.5">
                      {isFlipped ? "Close story" : "Tap to read story"}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-500 ${isFlipped ? "rotate-180" : ""}`}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                    {/* Minimal button hover effect */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--accent)] opacity-50 transition-all duration-300 group-hover/btn:w-3/4" />
                  </button>
                </div>

              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}