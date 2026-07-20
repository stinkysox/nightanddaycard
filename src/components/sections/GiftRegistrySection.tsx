"use client";

import Image from "next/image";
import { FiGift, FiCopy } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { giftRegistry } from "@/data/weddingData";

export default function GiftRegistrySection() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">With Gratitude</p>
        <h2 className="section-heading text-3xl md:text-5xl">Gift Registry</h2>
        <p className="font-body italic text-current/55 max-w-xl mx-auto mt-4">{giftRegistry.note}</p>
      </Reveal>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <Reveal type="slide-left">
          <div className="glass-panel rounded-3xl p-8 text-center flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-5 bg-white p-2">
              <Image src={giftRegistry.qrImage} alt="UPI QR Code" fill className="object-contain" />
            </div>
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-gold mb-2">Scan to Send</p>
            <button className="flex items-center gap-2 font-body text-sm text-current/70 hover:text-gold transition-colors" data-cursor-hover>
              {giftRegistry.upiId} <FiCopy size={14} />
            </button>
          </div>
        </Reveal>

        <Reveal type="slide-right" className="flex flex-col gap-4">
          {giftRegistry.wishlist.map((w) => (
            <a
              key={w.title}
              href={w.link}
              data-cursor-hover
              className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:border-gold transition-colors group"
            >
              <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                <FiGift className="text-gold" />
              </div>
              <div>
                <p className="font-elegant italic text-lg text-gold-light">{w.title}</p>
                <p className="font-body text-sm text-current/55">{w.note}</p>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
