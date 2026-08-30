"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { priceTables } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Pricing() {
  const [tab, setTab] = useState(0);
  const table = priceTables[tab];
  const wide = table.head.length > 2;

  return (
    <section id="pricing" className="bg-paper py-16 sm:py-[12vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[46ch]">
            <p className="label text-brand">Прайс</p>
            <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">Цены целиком</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ink/60">
              Ничего не прячем за формулировкой «по запросу». Стоимость определяется до заключения
              договора, возможна рассрочка платежа.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Разделы прайса">
          {priceTables.map((t, i) => (
            <button
              key={t.title}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`relative cursor-pointer rounded-full px-5 py-[10px] text-[14px] font-medium transition-colors duration-200 ${
                tab === i ? "text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {tab === i && (
                <motion.span
                  layoutId="price-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative">{t.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
            className="mt-8"
          >
            <div className="overflow-x-auto rounded-2xl border border-rule bg-white">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-rule bg-paper-2">
                    {table.head.map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`label px-5 py-4 text-ink-muted sm:px-7 ${
                          i > 0 && wide ? "text-right" : i > 0 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, ri) => (
                    <motion.tr
                      key={row[0]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ri * 0.03, duration: 0.3 }}
                      className="border-b border-rule transition-colors last:border-0 hover:bg-paper-2/60"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-5 py-[15px] align-top sm:px-7 ${
                            ci === 0
                              ? "text-[15px] leading-snug text-ink"
                              : "num whitespace-nowrap text-right text-[14px] font-medium text-ink/80"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {table.note && <p className="mt-4 text-[14px] text-ink-muted">{table.note}</p>}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Надбавки за сложность", "Касса, разные ставки НДС, обособленные подразделения, валютные договоры — от 15 до 30 % к базовой цене. Всё названо заранее."],
            ["Срочные работы", "Если первичные документы приходят с задержкой, стоимость периода увеличивается на 10 %."],
            ["Постановка учёта", "Разработка учётной политики для бухгалтерского и налогового учёта — от 5 000 ₽."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-rule p-6">
              <p className="text-[15px] font-medium text-ink">{t}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
