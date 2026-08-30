"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { company } from "@/lib/content";

const ease = [0.22, 0.61, 0.36, 1] as const;

const topics = [
  "Бухгалтерское обслуживание",
  "Восстановление учёта",
  "Зарплата и кадры",
  "Юридические услуги",
  "Аудит",
  "ВЭД и НДС",
];

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-[13px] text-[15px] text-paper placeholder:text-paper-muted transition-colors focus:border-brand focus:outline-none";

export default function Contact() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = name.trim().length > 1 && phone.trim().length > 4 && agreed;

  /* Статическая сборка без бэкенда: заявка уходит письмом из почтовой программы.
     Когда появится серверный обработчик, замените тело на fetch к нему. */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const body = [
      `Тема: ${topic}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      note.trim() && `Комментарий: ${note}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `Заявка с сайта — ${topic}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" data-dark className="bg-ink py-16 text-paper sm:py-[13vh]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <p className="label text-brand-light">Заявка</p>
            <h2 className="mt-5 text-[clamp(1.85rem,4.6vw,3.2rem)]">
              Начнём с разговора.
              <br />
              Он бесплатный.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-paper/65">
              Расскажите, что у вас сейчас: система налогообложения, сколько документов и
              сотрудников, где болит. Посмотрим и скажем, что делать и сколько это будет стоить.
            </p>

            <dl className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                ["Телефон", company.phone, company.phoneHref],
                ["Почта", company.email, `mailto:${company.email}`],
                ["Telegram", company.telegramName, company.telegram],
                ["Часы работы", company.hours, null],
                ["Адрес", company.address, "https://yandex.ru/maps/?text=Екатеринбург, Автоматики переулок 1"],
                ["Факс", company.fax, null],
              ].map(([label, value, href]) => (
                <div key={label as string} className="bg-ink px-5 py-5">
                  <dt className="label text-paper-muted">{label}</dt>
                  <dd className="mt-2 text-[15px] leading-snug">
                    {href ? (
                      <a
                        href={href as string}
                        target={(href as string).startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-brand-light"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.55, ease }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
            noValidate
          >
            <fieldset>
              <legend className="label text-paper-muted">С чем нужна помощь</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors duration-200 ${
                      topic === t
                        ? "border-brand bg-brand text-white"
                        : "border-white/15 text-paper/70 hover:border-white/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 space-y-4">
              <div>
                <label htmlFor="name" className="label block text-paper-muted">
                  Как к вам обращаться
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  autoComplete="name"
                  className={`mt-2 ${field}`}
                  aria-invalid={touched && name.trim().length < 2}
                />
              </div>

              <div>
                <label htmlFor="phone" className="label block text-paper-muted">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 ___ ___-__-__"
                  autoComplete="tel"
                  className={`num mt-2 ${field}`}
                  aria-invalid={touched && phone.trim().length < 5}
                />
              </div>

              <div>
                <label htmlFor="note" className="label block text-paper-muted">
                  Коротко о задаче
                  <span className="ml-2 normal-case tracking-normal text-paper-muted">
                    необязательно
                  </span>
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Например: ООО на УСН, 30 документов в месяц, три сотрудника"
                  className={`mt-2 resize-none ${field}`}
                />
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-paper/55">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-[3px] h-4 w-4 shrink-0 cursor-pointer accent-[#e01b62]"
              />
              <span>
                Согласен на обработку персональных данных для ответа на заявку
              </span>
            </label>

            {touched && !valid && (
              <p className="mt-4 text-[13px] text-[#ff8d98]">
                Заполните имя и телефон и подтвердите согласие — тогда сможем перезвонить.
              </p>
            )}

            <button
              type="submit"
              className="mt-7 w-full cursor-pointer rounded-full bg-brand px-6 py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-brand-deep"
            >
              Отправить заявку
            </button>

            <p className="mt-4 text-center text-[13px] text-paper-muted">
              Или позвоните:{" "}
              <a href={company.phoneHref} className="num text-paper transition-colors hover:text-brand-light">
                {company.phone}
              </a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
