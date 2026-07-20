"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import SectionPetals from "@/components/SectionPetals";

import Hero from "@/components/sections/Hero";
import MeetTheCouple from "@/components/sections/MeetTheCouple";
import GallerySection from "@/components/sections/GallerySection";
import WeddingEvents from "@/components/sections/WeddingEvents";
import RsvpSection from "@/components/sections/RsvpSection";
import ThankYouSection, { Footer } from "@/components/sections/ThankYouSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <AtmosphereBackground />
      <SectionPetals />

      {loaded && (
        <>
          <Navbar />
          <main className="relative overflow-x-clip w-full">
            <Hero />
            <MeetTheCouple />
            <GallerySection />
            <WeddingEvents />
            <RsvpSection />
            <ThankYouSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
