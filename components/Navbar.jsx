"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, nav } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-sm shadow-[0_1px_0_0_rgba(20,23,15,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className={`font-display text-xl tracking-tight transition-colors ${
            scrolled ? "text-ink" : "text-cream"
          }`}
        >
          {brand.name}
        </a>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:opacity-70 ${
                scrolled ? "text-ink" : "text-cream"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#visit"
          className={`hidden rounded-full border px-5 py-2 text-sm transition-colors md:inline-block ${
            scrolled
              ? "border-ink text-ink hover:bg-ink hover:text-cream"
              : "border-cream/70 text-cream hover:bg-cream hover:text-ink"
          }`}
        >
          Order
        </a>

        <button
          onClick={() => setOpen(true)}
          className={`flex flex-col gap-1.5 md:hidden ${scrolled ? "text-ink" : "text-cream"}`}
          aria-label="Open menu"
        >
          <span className="h-px w-6 bg-current" />
          <span className="h-px w-6 bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-8 py-6 text-cream md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">{brand.name}</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-2xl leading-none">
                &times;
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="font-display text-3xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
