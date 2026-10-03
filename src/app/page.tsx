"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import MusicPlayer from "@/components/VintageMusicPlayer";
import EnvelopeGate from "@/components/EnvelopeGate";

import Hero from "@/components/sections/Hero";
import MeetTheCouple from "@/components/sections/MeetTheCouple";
import GallerySection from "@/components/sections/GallerySection";
import WeddingEvents from "@/components/sections/WeddingEvents";
import RsvpSection from "@/components/sections/RsvpSection";
import ThankYouSection, { Footer } from "@/components/sections/ThankYouSection";
import FairyLightDivider from "@/components/FairyLightDivider";

export default function Home() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <>
      <AtmosphereBackground />
      {!envelopeOpened && <EnvelopeGate onOpen={() => setEnvelopeOpened(true)} />}

      {envelopeOpened && (
        <>
          <Navbar />
          <main className="relative w-full">
            <Hero />
            <FairyLightDivider />
            <MusicPlayer />
            <FairyLightDivider />
            <MeetTheCouple />
            <FairyLightDivider />
            <GallerySection />
            <FairyLightDivider />
            <WeddingEvents />
            <FairyLightDivider />
            <RsvpSection />
            <FairyLightDivider />
            <ThankYouSection />
                        <FairyLightDivider />

            <Footer />
          </main>
        </>
      )}
    </>
  );
}
