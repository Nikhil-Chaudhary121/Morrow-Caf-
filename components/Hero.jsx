"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero, brand } from "@/lib/data";

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(".hero-line span", { yPercent: 110 })
        .to(".hero-image", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.out" }, 0)
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.6 }, 0.2)
        .to(".hero-line span", { yPercent: 0, duration: 1, stagger: 0.12 }, 0.35)
        .from(".hero-body", { opacity: 0, y: 14, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 14, duration: 0.6 }, "-=0.45");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] min-h-screen items-end overflow-hidden bg-ink"
    >
      <div
        className="hero-image absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20,23,15,0.15) 0%, rgba(20,23,15,0.75) 100%), url(${hero.image})`,
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-28 md:px-10 md:pb-28 md:pt-40">
        <p className="hero-eyebrow mb-4 text-sm text-fog md:mb-5">{hero.eyebrow}</p>

        <h1 className="max-w-2xl font-display text-4xl leading-[1.08] text-cream sm:text-5xl md:text-7xl md:leading-[1.05]">
          {hero.heading.map((line) => (
            <span key={line} className="hero-line reveal-mask block">
              <span className="inline-block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-body mt-5 max-w-md text-base text-fog md:mt-6 md:text-lg">{hero.body}</p>

        <a
          href="#menu"
          className="hero-cta mt-7 inline-block rounded-full bg-cream px-7 py-3 text-sm text-ink transition-colors hover:bg-fog md:mt-9"
        >
          {hero.cta}
        </a>
      </div>

      <span className="absolute bottom-8 right-6 z-10 hidden text-xs tracking-[0.2em] text-fog/70 md:block">
        {brand.location.toUpperCase()}
      </span>
    </section>
  );
}
