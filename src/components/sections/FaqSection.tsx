"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { faq } from "@/data/weddingData";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Good to Know</p>
        <h2 className="section-heading text-3xl md:text-5xl">Frequently Asked</h2>
      </Reveal>

      <div className="max-w-2xl mx-auto space-y-3">
        {faq.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <Reveal key={item.question} type="fade-up" delay={idx * 0.06}>
              <div className="glass-panel rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  data-cursor-hover
                >
                  <span className="font-elegant italic text-lg text-gold-light">{item.question}</span>
                  <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-gold shrink-0 ml-4">
                    <FiPlus />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 font-body text-current/65 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
