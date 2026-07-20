"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { loveStory } from "@/data/weddingData";

export default function LoveStoryTimeline() {
  return (
    <section id="story" className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Our Journey</p>
        <h2 className="section-heading text-3xl md:text-5xl">Love Story</h2>
      </Reveal>

      <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar pb-6">
        <div className="flex gap-6 md:gap-10 px-2 md:px-6 min-w-max relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent -translate-y-1/2 -z-10" />
          {loveStory.map((item, idx) => (
            <Reveal key={item.year} type="scale" delay={idx * 0.12} className="w-[280px] md:w-[340px]">
              <div className="glass-panel rounded-3xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="relative h-44 md:h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="340px"
                  />
                  <div className="absolute top-3 right-3 glass-panel rounded-full px-3 py-1 font-display text-xs text-gold">
                    {item.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-elegant italic text-xl text-gold-light mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-current/65 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="text-center mt-4 text-[11px] tracking-[0.2em] uppercase text-current/35 font-display">
        ← scroll to explore our story →
      </p>
    </section>
  );
}
