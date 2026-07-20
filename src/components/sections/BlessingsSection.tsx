"use client";

import { FiHeart } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { blessings } from "@/data/weddingData";

export default function BlessingsSection() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Words of Love</p>
        <h2 className="section-heading text-3xl md:text-5xl">Blessings</h2>
      </Reveal>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blessings.map((b, idx) => (
          <Reveal key={b.name} type="fade-up" delay={idx * 0.1}>
            <div className="glass-panel rounded-3xl p-7 h-full flex flex-col">
              <FiHeart className="text-gold mb-4" size={20} />
              <p className="font-body italic text-current/75 leading-relaxed flex-1">&ldquo;{b.message}&rdquo;</p>
              <div className="mt-5 pt-5 border-t border-gold/15">
                <p className="font-elegant italic text-gold-light">{b.name}</p>
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-current/40">{b.relation}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
