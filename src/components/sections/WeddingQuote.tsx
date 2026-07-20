"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { weddingQuote } from "@/data/weddingData";

export default function WeddingQuote() {
  const letters = Array.from(weddingQuote.sanskrit);

  return (
    <section className="relative py-28 md:py-40 px-6 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto">
        <motion.p
          className="font-elegant text-2xl sm:text-3xl md:text-5xl text-gold-light leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: i * 0.045, duration: 0.5 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>

        <Reveal type="fade-in" delay={0.6}>
          <p className="mt-8 font-body italic text-base md:text-xl text-current/60 max-w-xl mx-auto">
            &ldquo;{weddingQuote.translation}&rdquo;
          </p>
        </Reveal>

        <Reveal type="fade-in" delay={0.9}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/50" />
            <span className="text-gold text-lg">✦</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
