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
      <div className="relative max-w-4xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        
        {/* ── Center Glowing Heart (Desktop) ── */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--background)] border border-[var(--border-strong)] shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-pulse">
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
              {/* Card Wrapper with 3D Perspective */}
              <div 
                className="group relative cursor-pointer w-full max-w-[360px] mx-auto select-none"
                style={{ perspective: "1200px" }}
                onClick={() => handleCardClick(idx)}
              >
                <div 
                  className="relative w-full h-[520px] transition-transform duration-700 ease-out"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                >
                  {/* ──────────────── FRONT OF CARD ──────────────── */}
                  <div 
                    className="absolute inset-0 flex flex-col rounded-[2rem] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-strong)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    {/* Edge-to-Edge Image (Top 60%) */}
                    <div className="relative w-full h-[60%] overflow-hidden bg-black/20 pointer-events-none">
                      <Image
                        src={person.photo}
                        alt={person.fullName}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 360px"
                        priority
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = `https://placehold.co/360x312/c9a96e/fff?text=${encodeURIComponent(person.firstName)}`;
                        }}
                      />
                      {/* Subtle gradient overlay to blend with the card bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-90" />
                    </div>

                    {/* Text Content (Bottom 40%) */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10 -mt-4 pointer-events-none">
                      {/* Role */}
                      <span className="eyebrow tracking-widest text-[11px] uppercase mb-3 font-semibold" style={{ color: "var(--accent)" }}>
                        {person.role}
                      </span>

                      {/* Full Name */}
                      <h3
                        className="font-serif italic leading-tight"
                        style={{
                          fontSize: "clamp(28px, 6vw, 34px)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {person.fullName}
                      </h3>

                      {/* Animated Divider */}
                      <div
                        className="h-[1px] my-4 transition-all duration-500 w-8 group-hover:w-16"
                        style={{ background: "var(--accent)", opacity: 0.4 }}
                      />

                      {/* Tap prompt */}
                      <span 
                        className="font-body text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 opacity-60 group-hover:opacity-100 mt-auto flex items-center gap-2"
                        style={{ color: "var(--accent)" }}
                      >
                        Tap to read story
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </span>
                    </div>
                  </div>

                  {/* ──────────────── BACK OF CARD ──────────────── */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-center text-center p-8 rounded-[2rem]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-strong)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full relative pointer-events-none">
                      {/* Decorative quote mark */}
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-6xl opacity-10 font-serif" style={{ color: "var(--accent)" }}>
                        "
                      </span>

                      {/* Role Tag */}
                      <span className="eyebrow tracking-widest text-[11px] uppercase mb-4" style={{ color: "var(--accent)" }}>
                        {person.role} Story
                      </span>

                      {/* Quote */}
                      <p 
                        className="font-serif italic my-4 leading-relaxed"
                        style={{ fontSize: 18, color: "var(--text-primary)" }}
                      >
                        {person.quote}
                      </p>

                      {/* Small Divider */}
                      <div
                        className="w-12 h-[1px] my-5 mx-auto"
                        style={{ background: "var(--accent)", opacity: 0.3 }}
                      />

                      {/* Parents Details Heading */}
                      <h4 
                        className="font-body uppercase tracking-widest text-[10px] mb-2 font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Parents
                      </h4>

                      {/* Parents Line */}
                      <p
                        className="font-body leading-relaxed px-4"
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                        }}
                      >
                        {person.parentsLine}
                      </p>
                    </div>

                    {/* Flip Back Hint */}
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
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}