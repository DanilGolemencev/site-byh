"use client";

import { motion } from "motion/react";
import { relief } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

const line = "Всё это происходит каждый месяц в любом случае. Разница только в том, чья это забота.";

export default function Relief() {
  const words = line.split(" ");

  return (
    <>
      {/* Цитата на сплошном тёмном фоне — светлый текст читается на всём диапазоне. */}
      <section data-dark className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:py-[22vh] sm:px-8">
          <p className="mx-auto max-w-[26ch] text-center font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.2vw,2.9rem)] font-light leading-[1.14] tracking-tight text-paper">
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0.28 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px -25% 0px" }}
                transition={{ delay: i * 0.045, duration: 0.5, ease }}
              >
                {w}{" "}
              </motion.span>
            ))}
          </p>
        </div>
      </section>

      {/* Тонкая переходная полоса ink → paper — сохраняет сигнатуру «свет поднимается». */}
      <div aria-hidden className="h-16 bg-gradient-to-b from-ink to-paper sm:h-24" />

      <section className="bg-paper pb-16 sm:pb-[14vh]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-[110px] lg:self-start">
              <p className="label text-brand-deep">Ведомость</p>
              <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">
                Что перестаёт
                <br />
                быть вашей проблемой
              </h2>
              <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-ink/60">
                Это не список услуг, а список поводов для беспокойства. Каждый закрывается
                конкретным действием с нашей стороны.
              </p>
            </div>

            <ol className="text-ink">
              {relief.map((r, i) => (
                <motion.li
                  key={r.item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -12% 0px" }}
                  transition={{ duration: 0.45, ease }}
                  className="grid grid-cols-[2.2rem_1fr] items-baseline gap-x-4 border-b border-rule py-5 sm:grid-cols-[2.6rem_1fr_auto] sm:gap-x-6"
                >
                  <span className="num text-[12px] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative inline-block justify-self-start text-[clamp(1rem,2.1vw,1.32rem)] leading-snug text-ink-muted">
                    {r.item}
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-10% 0px -12% 0px" }}
                      transition={{ delay: 0.25, duration: 0.5, ease }}
                      className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-brand"
                    />
                  </span>

                  <span className="col-start-2 mt-2 text-[13px] font-medium text-brand-deep sm:col-start-3 sm:mt-0">
                    {r.note}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
