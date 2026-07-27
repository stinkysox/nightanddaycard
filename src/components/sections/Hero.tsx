"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DateScratchCard from "@/components/DateScratchCard";
import { couple, heroImage, invitation } from "@/data/weddingData";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden w-full min-h-[100svh] flex flex-col items-center justify-center"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={`${couple.groom.firstName} & ${couple.bride.firstName}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 w-full max-w-lg"
      >
        {/* Eyebrow */}
        <p
          className="font-display text-[11px] tracking-[0.35em] uppercase mb-6"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Together with their families
        </p>

        {/* Names */}
        <h1
          className="font-script leading-[0.95]"
          style={{
            fontSize: "clamp(52px, 14vw, 76px)",
            color: "#fff",
          }}
        >
          {couple.groom.firstName}
          <span
            className="block font-display text-[13px] tracking-[0.4em] uppercase my-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            &
          </span>
          {couple.bride.firstName}
        </h1>

        {/* Thin divider */}
        <div
          className="w-12 h-px mx-auto mt-8 mb-6"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />

        {/* Save the Date */}
        <p
          className="font-display text-[11px] tracking-[0.3em] uppercase mb-1"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Save the Date
        </p>
        
        <DateScratchCard />

        <p
          className="font-serif mt-4"
          style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}
        >
          {invitation.venue}
        </p>
      </motion.div>

      {/* ── Scroll Cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-float"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
