import { company } from "@/lib/content";

const nav = [
  { href: "#services", label: "Услуги" },
  { href: "#calculator", label: "Стоимость" },
  { href: "#pricing", label: "Прайс" },
  { href: "#expert", label: "Эксперт" },
  { href: "#process", label: "Как работаем" },
  { href: "#faq", label: "Вопросы" },
];

export default function Footer() {
  return (
    <footer data-dark className="border-t border-white/10 bg-ink py-14 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[19px] font-semibold tracking-tight">
              ПРОФ&nbsp;ЕКБ
            </p>
            <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-paper/50">
              Бухгалтерское, юридическое и аудиторское обслуживание бизнеса в Екатеринбурге.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-paper/55 transition-colors hover:text-brand-light"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="text-[14px] leading-relaxed text-paper/55">
            <a href={company.phoneHref} className="num block text-paper transition-colors hover:text-brand-light">
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mt-1 block transition-colors hover:text-brand-light"
            >
              {company.email}
            </a>
            <a
              href={company.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block transition-colors hover:text-brand-light"
            >
              {company.telegramName}
            </a>
            <p className="mt-3 max-w-[28ch] text-paper-muted">{company.address}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-paper-muted">
          <p>© {new Date().getFullYear()} Компания «ПРОФ ЕКБ». {company.hours}.</p>
          <a href="#top" className="transition-colors hover:text-brand-light">
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}
