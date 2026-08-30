"use client";

import { motion } from "motion/react";
import { services } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Services() {
  return (
    <section id="services" className="bg-paper py-16 sm:py-[12vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-[52ch]">
          <p className="label text-brand-deep">Услуги</p>
          <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">
            Четыре участка, которые закрываем целиком
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/60">
            Можно взять один участок, можно все сразу. Комплексное обслуживание обходится дешевле,
            чем те же услуги по отдельности.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.5, ease }}
              className="group relative bg-paper p-7 transition-colors duration-300 hover:bg-white sm:p-9"
            >
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-400 group-hover:scale-x-100" />

              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[clamp(1.35rem,2.6vw,1.8rem)] text-ink">{s.group}</h3>
                <span className="num text-[12px] text-ink-muted">
                  {String(s.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-6">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-rule py-[11px] text-[15px] leading-snug text-ink/75 last:border-0"
                  >
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-brand/35" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-ink-muted">
          Обслуживаем ООО, ИП и некоммерческие организации на любой системе налогообложения.
          Документооборот электронный, поэтому регион значения не имеет.
        </p>
      </div>
    </section>
  );
}
