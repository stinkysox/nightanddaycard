"use client";

import { useEffect, useState } from "react";
import RosePetals from "./RosePetals";

export default function SectionPetals() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sections = ["#couple", "#thanks"];
    const observers: IntersectionObserver[] = [];

    const update = () => {
      let anyVisible = false;
      sections.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
        if (visible) anyVisible = true;
      });
      setActive(anyVisible);
    };

    sections.forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const obs = new IntersectionObserver(
        () => update(),
        { threshold: [0, 0.15, 0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", update);
    };
  }, []);

  return <RosePetals active={active} />;
}
