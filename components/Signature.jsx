"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menu } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Signature() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-card", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".menu-grid",
          start: "top 80%",
        },
      });

      gsap.from(".menu-heading .reveal-mask > *", {
        yPercent: 100,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".menu-heading",
          start: "top 85%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={root} className="bg-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="menu-heading mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="reveal-mask font-display text-4xl leading-tight md:text-5xl">
            <span className="inline-block">Our signature</span>
          </h2>
          <p className="max-w-xs text-sm text-ink/60">
            A short list, made well. Each drink and pastry is here because it earned the spot.
          </p>
        </div>

        <div className="menu-grid grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {menu.map((item) => (
            <div key={item.name} className="menu-card group">
              <div className="aspect-[3/4] overflow-hidden bg-fog">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg">{item.name}</h3>
                <span className="text-sm text-ink/60">{item.price}</span>
              </div>
              <p className="mt-1 text-sm text-ink/50">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
