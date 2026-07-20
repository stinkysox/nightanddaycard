"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function RsvpSection() {
  const [submitted, setSubmitted] = useState(false);
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative overflow-x-clip w-full py-24 md:py-32 px-5">
      {/* ── Heading ── */}
      <Reveal type="fade-up" className="text-center mb-12">
        <span className="eyebrow">Kindly Respond</span>
        <h2
          className="font-script mt-3"
          style={{
            fontSize: "clamp(42px, 10vw, 60px)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          RSVP
        </h2>
        <div className="ornament-line" />
        <p
          className="font-serif italic mt-5"
          style={{ fontSize: 16, color: "var(--muted)" }}
        >
          Please respond by 1st December 2026
        </p>
      </Reveal>

      <Reveal type="scale" className="max-w-md mx-auto">
        <div
          className="rounded-3xl p-7 md:p-9"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="eyebrow block mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Your Name
                  </label>
                  <input
                    required
                    id="rsvp-name"
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-transparent outline-none font-serif py-2.5 placeholder:opacity-40 transition-colors"
                    style={{
                      fontSize: 17,
                      color: "var(--text-primary)",
                      borderBottom: "1.5px solid var(--border-strong)",
                    }}
                  />
                </div>

                {/* Contact */}
                <div>
                  <label
                    htmlFor="rsvp-contact"
                    className="eyebrow block mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    Phone or Email
                  </label>
                  <input
                    required
                    id="rsvp-contact"
                    type="text"
                    placeholder="How can we reach you?"
                    className="w-full bg-transparent outline-none font-serif py-2.5 placeholder:opacity-40"
                    style={{
                      fontSize: 17,
                      color: "var(--text-primary)",
                      borderBottom: "1.5px solid var(--border-strong)",
                    }}
                  />
                </div>

                {/* Attending toggle */}
                <div>
                  <p className="eyebrow mb-3" style={{ color: "var(--muted)" }}>
                    Will you attend?
                  </p>
                  <div className="flex gap-3">
                    {(["yes", "no"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        id={`rsvp-attend-${opt}`}
                        onClick={() => setAttending(opt)}
                        className="flex-1 py-3 rounded-full font-serif italic transition-all"
                        style={{
                          fontSize: 15,
                          background:
                            attending === opt ? "var(--accent)" : "transparent",
                          color:
                            attending === opt ? "#fff" : "var(--muted)",
                          border: `1.5px solid ${
                            attending === opt
                              ? "var(--accent)"
                              : "var(--border-strong)"
                          }`,
                        }}
                      >
                        {opt === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest count */}
                {attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <p className="eyebrow mb-3" style={{ color: "var(--muted)" }}>
                      Number of Guests
                    </p>
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        id="rsvp-guests-minus"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-xl transition-opacity hover:opacity-70"
                        style={{
                          border: "1.5px solid var(--border-strong)",
                          color: "var(--text-primary)",
                        }}
                      >
                        −
                      </button>
                      <span
                        className="font-script"
                        style={{
                          fontSize: 32,
                          color: "var(--text-primary)",
                          minWidth: 28,
                          textAlign: "center",
                        }}
                      >
                        {guests}
                      </span>
                      <button
                        type="button"
                        id="rsvp-guests-plus"
                        onClick={() => setGuests((g) => Math.min(10, g + 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-xl transition-opacity hover:opacity-70"
                        style={{
                          border: "1.5px solid var(--border-strong)",
                          color: "var(--text-primary)",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  id="rsvp-submit"
                  disabled={!attending}
                  className="w-full py-4 rounded-full font-serif italic transition-all disabled:opacity-40"
                  style={{
                    fontSize: 17,
                    background: "var(--accent)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
                  }}
                >
                  Confirm Response
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-5"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="font-script"
                  style={{ fontSize: 44, color: "var(--text-primary)", lineHeight: 1 }}
                >
                  Thank You
                </h3>
                <p
                  className="font-serif italic"
                  style={{ fontSize: 17, color: "var(--muted)" }}
                >
                  We look forward to celebrating with you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
