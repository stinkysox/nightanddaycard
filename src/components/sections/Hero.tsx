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
        {/* Dark overlay has been removed */}
      </div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 w-full max-w-lg"
      >
        {/* Eyebrow */}
        <p className="font-display text-[11px] tracking-[0.35em] uppercase mb-6 text-[#9a6a32] dark:text-white/70 transition-colors duration-700">
          Together with their families
        </p>

        {/* Names */}
        <h1
          className="font-script leading-[0.95] text-[#845218] dark:text-[#fcf5e8] [text-shadow:0_1px_2px_rgba(255,255,255,0.9),0_2px_14px_rgba(212,175,55,0.25)] dark:[text-shadow:0_0_24px_rgba(212,175,55,0.4),0_0_40px_rgba(255,255,255,0.2)] transition-colors duration-700"
          style={{
            fontSize: "clamp(54px, 14vw, 82px)",
          }}
        >
          <span className="block">
            {couple.bride.firstName}
          </span>
          <span
            className="block font-display text-[13px] tracking-[0.4em] uppercase my-4 text-[#a37233] dark:text-white/60 transition-colors duration-700"
            style={{ textShadow: "none" }}
          >
            &
          </span>
          <span className="block">
            {couple.groom.firstName}
          </span>
        </h1>

        {/* Thin divider */}
        <div
          className="w-12 h-px mx-auto mt-8 mb-6 bg-[#b8860b]/40 dark:bg-white/30 transition-colors duration-700"
        />

        {/* Save the Date */}
        <p
          className="font-display text-[11px] tracking-[0.3em] uppercase mb-1 text-[#9a6a32] dark:text-white/60 transition-colors duration-700"
        >
          Save the Date
        </p>

        <DateScratchCard />

        <p
          className="font-serif mt-4 text-[#754b20] dark:text-white/70 text-sm transition-colors duration-700"
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
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-float text-[#9a6a32] dark:text-white/40 transition-colors duration-700"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}