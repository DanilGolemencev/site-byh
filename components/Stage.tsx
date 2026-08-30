"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Laptop from "./Laptop";
import { actSteps, company, owner } from "@/lib/content";

/* Раскадровка в единицах прокрутки: сколько экранов держится вступление
   и сколько — каждый шаг. Из них считается высота всей сцены. */
const HERO_VH = 70;
const STEP_VH = 90;
const STEPS = actSteps.length;
const TOTAL_VH = HERO_VH + STEP_VH * STEPS;
const HERO_END = HERO_VH / TOTAL_VH;
const STEP_SPAN = STEP_VH / TOTAL_VH;

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(-1);
  const [moved, setMoved] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setMoved(p > 0.012);
    setStep(p < HERO_END ? -1 : Math.min(Math.floor((p - HERO_END) / STEP_SPAN), STEPS - 1));
  });

  const inHero = step < 0;
  const active = actSteps[Math.max(step, 0)];

  return (
    <section
      id="dark-stage"
      ref={ref}
      data-dark
      className="relative bg-ink"
      style={{ height: `calc(100vh + ${TOTAL_VH}vh)` }}
    >
      {/* Разлиновка ведомости и свет от экрана */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-white opacity-[0.55]">
        <div className="ledger-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_35%,black,transparent_72%)]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[22vh] h-[70vh] w-[110vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 46% 46% at 62% 40%, rgba(161,98,7,0.16), transparent 68%)",
        }}
      />

      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-7 px-5 pt-[64px] sm:px-8 sm:gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14 lg:pt-[72px]">
          {/* Левая колонка: вступление сменяется подписями */}
          <div className="relative order-2 min-h-[380px] sm:min-h-[430px] lg:order-1 lg:min-h-[420px]">
            {/* Вступление */}
            <motion.div
              animate={{ opacity: inHero ? 1 : 0, y: inHero ? 0 : -40 }}
              transition={{ duration: 0.45, ease }}
              className={`absolute inset-x-0 top-0 ${inHero ? "" : "pointer-events-none"}`}
              aria-hidden={!inHero}
            >
              <p className="label text-brand-light">
                Бухгалтерия · Налоги · Право — {company.city}
              </p>
              <h1 className="mt-4 text-[clamp(1.95rem,6.4vw,4.15rem)] text-paper sm:mt-5">
                Учёт ведём мы.
                <br />
                Вы спите спокойно.
              </h1>
              <p className="mt-5 max-w-[46ch] text-[clamp(0.94rem,1.3vw,1.12rem)] leading-relaxed text-paper/70 sm:mt-6">
                Бухгалтерия, налоги, кадры и право для ООО и ИП. Отчётность сдаём в срок, на
                требования ФНС отвечаем сами, а о рисках говорим до того, как они станут
                доначислением.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                <a
                  href="#calculator"
                  className="rounded-full bg-brand px-7 py-[14px] text-[15px] font-medium text-white transition-colors hover:bg-brand-deep"
                >
                  Рассчитать стоимость
                </a>
                <a
                  href={company.phoneHref}
                  className="num-ui rounded-full border border-white/20 px-7 py-[14px] text-[15px] font-medium text-paper transition-colors hover:border-white/45"
                >
                  {company.phone}
                </a>
              </div>

              <p className="mt-8 hidden max-w-[44ch] text-[13px] leading-relaxed text-paper-muted sm:block">
                {owner.years} лет в налогах · аттестат профессионального бухгалтера · аудитор ·
                спикер налоговых конференций
              </p>
            </motion.div>

            {/* Подписи к шагам */}
            <div className="absolute inset-x-0 top-0">
              <AnimatePresence mode="wait">
                {step >= 0 && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -22 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <p className="label text-brand-light">Это делаем за вас</p>
                    <h2 className="mt-4 text-[clamp(1.75rem,5.2vw,3.5rem)] text-paper sm:mt-5">
                      {active.title}
                    </h2>
                    <p className="mt-5 max-w-[42ch] text-[clamp(0.94rem,1.25vw,1.1rem)] leading-relaxed text-paper/70 sm:mt-6">
                      {active.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Где мы в сцене */}
              <div
                className={`mt-7 flex items-center gap-2 transition-opacity duration-500 sm:mt-9 ${
                  step >= 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                {actSteps.map((s, i) => (
                  <span key={s.tab} className="flex items-center gap-2">
                    <span
                      className={`block h-[3px] rounded-full transition-all duration-500 ${
                        i === step ? "w-9 bg-brand" : "w-4 bg-white/20"
                      }`}
                    />
                  </span>
                ))}
                <span className="num-ui ml-2 text-[12px] text-paper-muted">
                  {Math.max(step, 0) + 1} / {STEPS}
                </span>
              </div>
            </div>
          </div>

          {/* Правая колонка: ноутбук держится на месте, экран пересобирается */}
          <div className="order-1 w-full lg:order-2">
            <div className="mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:max-w-none">
              <Laptop step={Math.max(step, 0)} />
            </div>
          </div>
        </div>

        {/* Подсказка прокрутки */}
        <motion.div
          animate={{ opacity: moved ? 0 : 1 }}
          transition={{ duration: 0.35, ease }}
          className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
        >
          <span className="label flex items-center gap-3 text-[10px] text-paper-muted">
            Листайте
            <span className="relative block h-8 w-px overflow-hidden bg-white/15">
              <motion.span
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 block h-3 bg-brand"
              />
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
