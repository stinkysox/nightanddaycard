"use client";

import Reveal from "@/components/Reveal";
import FairyLightStrand from "@/components/FairyLightStrand";
import { formalInvitation as inv, couple } from "@/data/weddingData";

export default function FormalInvitation() {
  return (
    <section className="relative py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <FairyLightStrand count={12} />
        <Reveal type="curtain">
          <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center relative">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gold text-2xl">ॐ</div>

            <p className="font-elegant italic text-2xl md:text-3xl text-gold mt-8 mb-6">{inv.sanskritBlessing}</p>

            <p className="font-body text-current/70 mb-6">{inv.openingLine}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Bride&apos;s Parents</p>
                <p className="font-elegant italic text-lg text-current/85">{inv.brideParents}</p>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Groom&apos;s Parents</p>
                <p className="font-elegant italic text-lg text-current/85">{inv.groomParents}</p>
              </div>
            </div>

            <p className="font-body text-current/70 mb-8 max-w-md mx-auto">{inv.requestLine}</p>

            <h3 className="font-script text-4xl md:text-5xl gold-text mb-2">
              {couple.bride.firstName} &amp; {couple.groom.firstName}
            </h3>

            <div className="h-px w-24 bg-gold/40 mx-auto my-8" />

            <p className="font-display text-sm md:text-base tracking-[0.15em] uppercase text-gold-light mb-2">
              {inv.muhurtham}
            </p>
            <p className="font-body text-current/70 mb-1">{inv.venue}</p>
            <p className="font-body text-sm text-current/50 mb-8">{inv.receptionLine}</p>

            <p className="font-body italic text-current/60">{inv.blessingLine}</p>

            <div className="mt-10 pt-8 border-t border-gold/20 grid sm:grid-cols-2 gap-4">
              {inv.regionalVersions.map((v) => (
                <div key={v.language}>
                  <p className="font-display text-[10px] tracking-[0.25em] uppercase text-gold mb-2">{v.language}</p>
                  <p className="font-body text-sm text-current/60 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
