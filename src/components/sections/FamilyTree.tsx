"use client";

import Reveal from "@/components/Reveal";
import { family } from "@/data/weddingData";

function FamilyBranch({ data, align }: { data: typeof family.brideSide; align: "left" | "right" }) {
  return (
    <div className={`glass-panel rounded-3xl p-8 ${align === "right" ? "md:text-right" : ""}`}>
      <p className="font-display text-xs tracking-[0.3em] uppercase text-gold mb-4">{data.title}</p>
      <div className="mb-6">
        <p className="font-elegant italic text-xl md:text-2xl text-gold-light">{data.parents.father}</p>
        <span className="font-script text-lg text-current/40">&</span>
        <p className="font-elegant italic text-xl md:text-2xl text-gold-light">{data.parents.mother}</p>
      </div>
      <div className={`h-px w-16 bg-gold/40 mb-6 ${align === "right" ? "ml-auto" : ""}`} />
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-current/40 mb-2">Grandparents</p>
      <ul className="space-y-1">
        {data.grandparents.map((g) => (
          <li key={g} className="font-body text-sm text-current/65">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FamilyTree() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <Reveal type="fade-up" className="text-center mb-16">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">With Love</p>
        <h2 className="section-heading text-3xl md:text-5xl">Parents & Family</h2>
      </Reveal>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative">
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel items-center justify-center z-10">
          <span className="font-script text-xl text-gold">&</span>
        </div>
        <Reveal type="slide-left">
          <FamilyBranch data={family.brideSide} align="left" />
        </Reveal>
        <Reveal type="slide-right" delay={0.1}>
          <FamilyBranch data={family.groomSide} align="right" />
        </Reveal>
      </div>
    </section>
  );
}
