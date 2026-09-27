"use client";

import { motion } from "framer-motion";
import { space } from "@/lib/data";

export default function Space() {
  return (
    <section id="space" className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
      <img
        src={space.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-10"
      >
        <p className="mb-4 text-sm text-fog">Our space</p>
        <h2 className="max-w-lg font-display text-4xl leading-tight text-cream md:text-5xl">
          {space.heading}
        </h2>
        <p className="mt-5 max-w-sm text-base text-fog">{space.body}</p>
      </motion.div>
    </section>
  );
}
