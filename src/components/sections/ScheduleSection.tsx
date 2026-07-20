"use client";

import { FiClock } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import { schedule } from "@/data/weddingData";

export default function ScheduleSection() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Wedding Day</p>
        <h2 className="section-heading text-3xl md:text-5xl">Schedule</h2>
      </Reveal>

      <div className="max-w-2xl mx-auto relative">
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent md:-translate-x-1/2" />
        <div className="space-y-8">
          {schedule.map((item, idx) => (
            <Reveal key={item.time} type={idx % 2 === 0 ? "slide-left" : "slide-right"} delay={idx * 0.08}>
              <div className="flex items-center gap-5 md:justify-center">
                <div className="relative w-14 h-14 rounded-full glass-panel flex items-center justify-center shrink-0 z-10">
                  <FiClock className="text-gold" />
                </div>
                <div className="glass-panel rounded-2xl px-6 py-4 flex-1 md:max-w-sm">
                  <p className="font-display text-sm tracking-[0.15em] text-gold">{item.time}</p>
                  <p className="font-body text-current/75 mt-1">{item.activity}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
