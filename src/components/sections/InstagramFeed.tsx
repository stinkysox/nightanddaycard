"use client";

import Image from "next/image";
import { FiInstagram } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { instagram } from "@/data/weddingData";

export default function InstagramFeed() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3 flex items-center justify-center gap-2">
          <FiInstagram /> Follow Along
        </p>
        <h2 className="section-heading text-3xl md:text-5xl">{instagram.handle}</h2>
      </Reveal>

      <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-3">
        {instagram.posts.map((src, idx) => (
          <Reveal key={src} type="scale" delay={idx * 0.06}>
            <div className="relative aspect-square rounded-xl overflow-hidden glass-panel group">
              <Image src={src} alt={`Instagram post ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="200px" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
