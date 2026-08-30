"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { company, insights, owner } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Expert() {
  return (
    <section id="expert" data-dark className="bg-ink py-16 text-paper sm:py-[13vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Фотографии */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease }}
            className="relative"
          >
            <div className="relative aspect-[9/10] overflow-hidden rounded-2xl bg-ink-2">
              <Image
                src={withBasePath("/media/maria-studio.jpg")}
                alt="Мария Новикова, собственник компании ПРОФ ЕКБ"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                priority={false}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ delay: 0.15, duration: 0.6, ease }}
              className="absolute -bottom-8 -right-3 w-[44%] max-w-[230px] overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] sm:-right-6"
            >
              <div className="relative aspect-square bg-ink-2">
                <Image
                  src={withBasePath("/media/maria-conference.jpg")}
                  alt="Мария Новикова на Первой Челябинской налоговой конференции «Бизнес 2026»"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <p className="bg-ink-2 px-3 py-2 text-[11px] leading-snug text-paper/55">
                Первая Челябинская налоговая конференция «Бизнес 2026»
              </p>
            </motion.div>
          </motion.div>

          {/* Текст */}
          <div className="pt-4 lg:pt-0">
            <p className="label text-brand-light">Кто за это отвечает</p>
            <h2 className="mt-5 text-[clamp(1.85rem,4.4vw,3rem)]">{owner.name}</h2>
            <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-paper/65">
              {owner.role}. Больше {owner.years} лет в налогах и учёте. Консультирует, обучает и
              выступает на профильных конференциях — в том числе по теме ВЭД и нового порядка
              контроля импорта.
            </p>

            <ul className="mt-9 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {owner.credentials.map((c) => (
                <li key={c} className="bg-ink px-5 py-5 text-[14px] leading-snug text-paper/80">
                  {c}
                </li>
              ))}
            </ul>

            <figure className="mt-10 border-l-2 border-brand pl-6">
              <blockquote className="text-[clamp(1.05rem,2vw,1.3rem)] leading-relaxed text-paper/85">
                «Помогаю предпринимателям спать спокойно».
              </blockquote>
              <figcaption className="mt-3 text-[13px] text-paper-muted">
                {owner.name} — из описания канала «{owner.channel}»
              </figcaption>
            </figure>

            <a
              href={company.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-[12px] text-[14px] font-medium transition-colors hover:border-white/45"
            >
              Читать канал «{owner.channel}»
              <svg viewBox="0 0 16 16" className="h-[14px] w-[14px]" aria-hidden>
                <path
                  d="M4 12 L12 4 M6.5 4 H12 V9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Разборы */}
        <div className="mt-16 sm:mt-[14vh]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.3rem)]">
              О чём предупреждаем клиентов прямо сейчас
            </h3>
            <a
              href={company.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-paper/55 transition-colors hover:text-brand-light"
            >
              {company.telegramName} →
            </a>
          </div>

          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {insights.map((n, i) => (
              <motion.article
                key={n.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                className="flex flex-col bg-ink p-7"
              >
                <span className="label text-brand-light">{n.tag}</span>
                <h4 className="mt-4 font-[family-name:var(--font-display)] text-[17px] font-medium leading-snug tracking-tight">
                  {n.title}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/60">{n.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
