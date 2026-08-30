"use client";

import { motion } from "motion/react";
import { process } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Process() {
  return (
    <section id="process" className="bg-paper py-16 sm:py-[12vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-[48ch]">
          <p className="label text-brand-deep">Как начинаем</p>
          <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">
            От звонка до передачи дел — четыре шага
          </h2>
        </div>

        {/* Порядок здесь настоящий: шаги идут строго друг за другом. */}
        <ol className="mt-14 grid gap-px border-y border-rule bg-rule lg:grid-cols-4 lg:border">
          {process.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="group relative bg-paper p-7 sm:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="num text-[13px] font-medium text-brand-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <h3 className="mt-6 text-[clamp(1.15rem,2.2vw,1.4rem)] text-ink">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
