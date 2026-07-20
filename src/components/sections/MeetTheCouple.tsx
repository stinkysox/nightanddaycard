"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/data/weddingData";

export default function MeetTheCouple() {
  const people = [
    { ...couple.groom, role: "The Groom" },
    { ...couple.bride, role: "The Bride" },
  ];

  return (
    <section id="couple" className="relative overflow-x-clip w-full py-24 md:py-32 px-5">
      {/* ── Heading ── */}
      <Reveal type="fade-up" className="text-center mb-16">
        <span className="eyebrow">The Couple</span>
        <h2
          className="font-script mt-3"
          style={{
            fontSize: "clamp(44px, 11vw, 64px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Meet the Couple
        </h2>
        <div className="ornament-line" />
      </Reveal>

      {/* ── Cards ── */}
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14">
        {people.map((person, idx) => (
          <Reveal
            key={person.firstName}
            type={idx === 0 ? "slide-left" : "slide-right"}
            delay={idx * 0.12}
          >
            <div className="flex flex-col items-center text-center">
              {/* ── Photo ── */}
              <div
                className="relative mb-7"
                style={{
                  width: 200,
                  height: 260,
                  borderRadius: 20,
                  padding: 3,
                  background:
                    "linear-gradient(145deg, var(--accent), var(--border-strong) 50%, var(--accent))",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ borderRadius: 18 }}
                >
                  <Image
                    src={person.photo}
                    alt={person.fullName}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              </div>

              {/* ── Role eyebrow ── */}
              <span className="eyebrow" style={{ color: "var(--accent)" }}>
                {person.role}
              </span>

              {/* ── Full name ── */}
              <h3
                className="font-script mt-2 leading-none"
                style={{
                  fontSize: "clamp(34px, 9vw, 46px)",
                  color: "var(--text-primary)",
                }}
              >
                {person.fullName}
              </h3>

              {/* ── Divider ── */}
              <div
                className="w-8 h-px my-4"
                style={{ background: "var(--accent)", opacity: 0.4 }}
              />

              {/* ── Parents line ── */}
              <p
                className="font-serif italic leading-relaxed max-w-[230px]"
                style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  fontWeight: 400,
                }}
              >
                {person.parentsLine}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
