"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/content";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#calculator", label: "Стоимость" },
  { href: "#expert", label: "Эксперт" },
  { href: "#process", label: "Как работаем" },
  { href: "#contact", label: "Контакты" },
];

export default function Nav() {
  const [onDark, setOnDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Шапка подстраивается под секцию, которая сейчас проходит под ней:
     наблюдаем узкую полосу сразу под шапкой и смотрим, тёмный ли там фон. */
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-dark]"));
    if (!targets.length) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setOnDark(visible.size > 0);
      },
      { rootMargin: "-72px 0px -100% 0px" },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fg = onDark ? "text-paper" : "text-ink";
  const muted = onDark ? "text-paper/65" : "text-ink/60";
  /* Фуксия на чернильном фоне слишком тёмная — на тёмной шапке светлее. */
  const hoverBrand = onDark ? "hover:text-brand-light" : "hover:text-brand";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? onDark
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
            : "border-b border-rule bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-8 px-5 sm:px-8">
        <a href="#top" className={`flex items-baseline gap-2 ${fg}`}>
          <span className="font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-tight">
            ПРОФ&nbsp;ЕКБ
          </span>
          <span className={`label hidden text-[9px] sm:inline ${muted}`}>Екатеринбург</span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[14px] transition-colors ${hoverBrand} ${muted}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 xl:ml-0">
          <a
            href={company.phoneHref}
            className={`num-ui hidden text-[14px] font-medium transition-colors sm:block ${hoverBrand} ${fg}`}
          >
            {company.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-brand px-5 py-[9px] text-[14px] font-medium text-white transition-colors hover:bg-brand-deep sm:block"
          >
            Оставить заявку
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center xl:hidden ${fg}`}
          >
            <span className="relative block h-[12px] w-[20px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`xl:hidden ${
            onDark ? "border-t border-white/10 bg-ink/95" : "border-t border-rule bg-paper/95"
          } backdrop-blur-xl`}
        >
          <nav className="mx-auto flex max-w-[1400px] flex-col px-5 py-3 sm:px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b py-3 text-[15px] last:border-0 ${
                  onDark ? "border-white/8 text-paper/80" : "border-rule text-ink/70"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-brand px-5 py-3 text-center text-[15px] font-medium text-white sm:hidden"
            >
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
