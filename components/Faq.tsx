"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper-2 py-16 sm:py-[12vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-[110px] lg:self-start">
            <p className="label text-brand">Вопросы</p>
            <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">
              О чём спрашивают чаще всего
            </h2>
          </div>

          <div className="border-t border-rule">
            {faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-rule">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-start gap-5 py-6 text-left"
                    >
                      <span className="flex-1 text-[clamp(1.02rem,2vw,1.24rem)] font-medium leading-snug text-ink">
                        {f.q}
                      </span>
                      <span className="relative mt-[6px] block h-4 w-4 shrink-0">
                        <span className="absolute left-0 top-[7px] block h-[1.5px] w-4 bg-brand" />
                        <span
                          className={`absolute left-[7px] top-0 block h-4 w-[1.5px] bg-brand transition-transform duration-300 ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[68ch] pb-7 pr-8 text-[15px] leading-relaxed text-ink/65">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
