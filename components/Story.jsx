"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { story } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const imgWrap = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".story-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrap.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, imgWrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="bg-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div ref={imgWrap} className="aspect-[4/5] overflow-hidden">
          <img src={story.image} alt="" className="story-img h-[112%] w-full object-cover" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl leading-tight md:text-5xl">{story.heading}</h2>
          <p className="mt-6 max-w-md text-base text-ink/70">{story.body}</p>

          <div className="mt-10 flex gap-10 border-t border-ink/10 pt-6">
            {story.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl">{s.value}</p>
                <p className="mt-1 text-xs text-ink/50">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
