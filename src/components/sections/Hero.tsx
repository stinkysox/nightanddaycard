"use client";

import { motion } from "framer-motion";
import VintageMusicPlayer from "@/components/VintageMusicPlayer";
import ScratchCard from "@/components/ScratchCard";
import { couple } from "@/data/weddingData";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-x-clip w-full min-h-[100svh] flex flex-col items-center justify-center px-5 pt-24 pb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm space-y-7"
      >
        {/* ── Music player ── */}
        <VintageMusicPlayer />

        {/* ── Scratch card ── */}
        <ScratchCard />

        {/* ── Names ── */}
        <div className="text-center pt-3 pb-1">
          <h1
            className="font-script leading-none"
            style={{
              fontSize: "clamp(56px, 16vw, 80px)",
              color: "var(--text-primary)",
            }}
          >
            {couple.groom.firstName}
          </h1>

          <p
            className="eyebrow my-3"
            style={{ color: "var(--muted)", letterSpacing: "0.3em" }}
          >
            with
          </p>

          <h1
            className="font-script leading-none"
            style={{
              fontSize: "clamp(56px, 16vw, 80px)",
              color: "var(--text-primary)",
            }}
          >
            {couple.bride.firstName}
          </h1>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="eyebrow" style={{ color: "var(--muted-2)" }}>
          Scroll
        </span>
        <div
          className="w-px h-8 rounded-full"
          style={{
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
