"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { trailer } from "@/data/weddingData";

export default function TrailerSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Watch</p>
        <h2 className="section-heading text-3xl md:text-5xl">Our Wedding Trailer</h2>
      </Reveal>

      <Reveal type="scale" className="max-w-4xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden glass-panel aspect-video shadow-2xl">
          {playing && trailer.videoUrl ? (
            <video src={trailer.videoUrl} controls autoPlay className="w-full h-full object-cover" />
          ) : (
            <>
              <Image src={trailer.posterImage} alt="Wedding trailer" fill className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
              <button
                onClick={() => setPlaying(true)}
                data-cursor-hover
                aria-label="Play wedding trailer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-2xl"
                >
                  <FiPlay size={28} className="text-royal-black ml-1" />
                </motion.span>
              </button>
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <p className="text-white/70 text-xs font-display tracking-[0.2em] uppercase">
                  Add your trailer video URL in weddingData.ts
                </p>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
