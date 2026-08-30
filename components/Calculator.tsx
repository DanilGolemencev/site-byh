"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { payroll, priceMatrix, surcharges, taxSystems, volumes } from "@/lib/content";
import type { TaxSystemId, VolumeId } from "@/lib/content";
import { plural, rub } from "@/lib/format";

const ease = [0.22, 0.61, 0.36, 1] as const;

/** Плавный отсчёт до новой суммы — цифры меняются, а не прыгают. */
function useCountUp(target: number, ms = 550) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = target;
    if (a === b) return;

    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(a + (b - a) * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);

  return value;
}

function Option({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
        active
          ? "border-brand bg-brand-soft"
          : "border-rule bg-white hover:border-ink/25"
      }`}
    >
      <span className={`block text-[14px] font-medium ${active ? "text-brand-deep" : "text-ink"}`}>
        {title}
      </span>
      {hint && <span className="mt-[2px] block text-[12px] text-ink-muted">{hint}</span>}
    </button>
  );
}

export default function Calculator() {
  const [system, setSystem] = useState<TaxSystemId>("usn-d");
  const [volume, setVolume] = useState<VolumeId>("v20");
  const [staff, setStaff] = useState(2);
  const [extras, setExtras] = useState<string[]>([]);

  const isZero = volume === "zero";
  const isCustom = volume === "v100p";

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const calc = useMemo(() => {
    const base = priceMatrix[volume][system];
    if (base === null) return null;

    const rate = isZero
      ? 0
      : surcharges.filter((s) => extras.includes(s.id)).reduce((acc, s) => acc + s.rate, 0);
    const surcharge = Math.round(base * rate);

    const staffCost =
      isZero || staff === 0
        ? 0
        : payroll.base[system] + Math.max(0, staff - payroll.baseHeadcount) * payroll.perExtra;

    return { base, surcharge, rate, staffCost, total: base + surcharge + staffCost };
  }, [system, volume, staff, extras, isZero]);

  const shown = useCountUp(calc?.total ?? 0);
  const period = volumes.find((v) => v.id === volume)!.period;

  return (
    <section id="calculator" className="bg-paper-2 py-16 sm:py-[12vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-[52ch]">
          <p className="label text-brand">Стоимость</p>
          <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)] text-ink">
            Посчитайте, во что это обойдётся
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/60">
            Калькулятор собран на нашем прайсе, без скрытых коэффициентов. Точную сумму назовём
            после консультации и зафиксируем в договоре до начала работ.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
          {/* Параметры */}
          <div className="space-y-9">
            <fieldset>
              <legend className="label text-ink-muted">Система налогообложения</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {taxSystems.map((t) => (
                  <Option
                    key={t.id}
                    active={system === t.id}
                    onClick={() => setSystem(t.id)}
                    title={t.short}
                    hint={t.name}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label text-ink-muted">Документов в месяц</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {volumes.map((v) => (
                  <Option
                    key={v.id}
                    active={volume === v.id}
                    onClick={() => setVolume(v.id)}
                    title={v.name.replace(" документов", "")}
                    hint={v.hint}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset disabled={isZero || isCustom} className="disabled:opacity-40">
              <legend className="label text-ink-muted">Сотрудников на зарплате</legend>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-rule bg-white">
                  <button
                    type="button"
                    onClick={() => setStaff((s) => Math.max(0, s - 1))}
                    aria-label="Убрать сотрудника"
                    className="h-12 w-12 cursor-pointer text-[20px] text-ink-muted transition-colors hover:text-brand"
                  >
                    −
                  </button>
                  <span className="num w-14 text-center text-[19px] font-semibold text-ink">
                    {staff}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStaff((s) => Math.min(60, s + 1))}
                    aria-label="Добавить сотрудника"
                    className="h-12 w-12 cursor-pointer text-[20px] text-ink-muted transition-colors hover:text-brand"
                  >
                    +
                  </button>
                </div>
                <p className="max-w-[34ch] text-[13px] leading-snug text-ink-muted">
                  До двух сотрудников — фиксированная ставка, дальше {payroll.perExtra} ₽ в месяц за
                  каждого следующего.
                </p>
              </div>
            </fieldset>

            <fieldset disabled={isZero || isCustom} className="disabled:opacity-40">
              <legend className="label text-ink-muted">Что усложняет учёт</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {surcharges.map((s) => {
                  const on = extras.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleExtra(s.id)}
                      aria-pressed={on}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                        on ? "border-brand bg-brand-soft" : "border-rule bg-white hover:border-ink/25"
                      }`}
                    >
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
                          on ? "border-brand bg-brand" : "border-ink/25 bg-white"
                        }`}
                      >
                        {on && (
                          <svg viewBox="0 0 20 20" className="h-3 w-3">
                            <path
                              d="M4 10.5 L8.2 14.5 L16 6"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1 text-[14px] leading-snug text-ink">{s.name}</span>
                      <span className="num-ui text-[12px] font-medium text-ink-muted">
                        +{Math.round(s.rate * 100)}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Итог */}
          <div className="lg:sticky lg:top-[100px] lg:self-start">
            <div className="rounded-2xl border border-rule bg-ink p-7 text-paper sm:p-8">
              <p className="label text-paper-muted">Ориентировочно</p>

              {calc === null ? (
                <>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,2.5rem)] leading-none">
                    Договорная
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-paper/60">
                    Свыше 100 документов в месяц считаем индивидуально — объём и трудоёмкость у всех
                    разные. Позвоните, посчитаем за один разговор.
                  </p>
                </>
              ) : (
                <>
                  <p className="num mt-3 text-[clamp(2.2rem,5.5vw,3.1rem)] font-semibold leading-none tracking-tight">
                    {rub(shown)} ₽
                  </p>
                  <p className="mt-2 text-[14px] text-paper/50">за {period}</p>

                  <dl className="mt-7 space-y-3 border-t border-white/10 pt-5 text-[14px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-paper/60">Бухгалтерское обслуживание</dt>
                      <dd className="num shrink-0 font-medium">{rub(calc.base)} ₽</dd>
                    </div>

                    {calc.staffCost > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="text-paper/60">
                          Зарплата, {staff}&nbsp;{plural(staff, "сотрудник", "сотрудника", "сотрудников")}
                        </dt>
                        <dd className="num shrink-0 font-medium">{rub(calc.staffCost)} ₽</dd>
                      </motion.div>
                    )}

                    {calc.surcharge > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="text-paper/60">
                          Надбавки, +{Math.round(calc.rate * 100)}%
                        </dt>
                        <dd className="num shrink-0 font-medium">{rub(calc.surcharge)} ₽</dd>
                      </motion.div>
                    )}
                  </dl>
                </>
              )}

              <a
                href="#contact"
                className="mt-8 block rounded-full bg-brand px-6 py-[14px] text-center text-[15px] font-medium text-white transition-colors hover:bg-brand-deep"
              >
                Уточнить у бухгалтера
              </a>
              <p className="mt-4 text-[12px] leading-relaxed text-paper-muted">
                Расчёт предварительный. Цены — с действующего прайса; итоговую стоимость фиксируем в
                договоре.
              </p>
            </div>

            <p className="mt-5 rounded-xl border border-brand/25 bg-brand-soft px-5 py-4 text-[13px] leading-relaxed text-brand-deep">
              При заключении договора на бухгалтерское обслуживание экспресс-анализ состояния
              налогового и бухгалтерского учёта — в подарок.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
