"use client";

import { AnimatePresence, motion } from "motion/react";
import { rub } from "@/lib/format";

/* Стилизованный интерфейс учётной системы. Пять экранов — пять задач,
   которые компания снимает с клиента. Декоративный: всё, что он говорит,
   продублировано подписями рядом, поэтому для скринридера он скрыт. */

const ease = [0.22, 0.61, 0.36, 1] as const;

const rail = [
  { id: "tax", name: "Налоги" },
  { id: "rep", name: "Отчётность" },
  { id: "fns", name: "ФНС" },
  { id: "pay", name: "Зарплата" },
  { id: "vat", name: "НДС" },
];

function Chip({ tone, children }: { tone: "ok" | "risk" | "warn" | "mute"; children: React.ReactNode }) {
  const tones = {
    ok: "bg-[#e6f7f0] text-[#0f7a55]",
    risk: "bg-[#ffe9eb] text-[#c02233]",
    warn: "bg-[#fff4de] text-[#8a5a00]",
    mute: "bg-[#eef0f3] text-[#5b6472]",
  };
  return (
    <span className={`num-ui inline-flex items-center rounded px-2 py-[3px] text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Row({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + i * 0.055, duration: 0.4, ease }}
      className="grid grid-cols-[1.6fr_0.8fr_1fr_1fr_0.9fr] items-center gap-3 border-b border-[#edeef1] px-4 py-[11px] text-[13px] last:border-0"
    >
      {children}
    </motion.div>
  );
}

function Head({ cols }: { cols: string[] }) {
  return (
    <div className="grid grid-cols-[1.6fr_0.8fr_1fr_1fr_0.9fr] gap-3 border-b border-[#e6e8ec] bg-[#f7f8fa] px-4 py-[9px]">
      {cols.map((c) => (
        <span key={c} className="label text-[10px] text-[#8992a1]">
          {c}
        </span>
      ))}
    </div>
  );
}

/* ── Экран 0. Налоги ───────────────────────────────────────────────────── */
function TaxView() {
  const rows = [
    ["Налог по УСН", "I кв.", "4 180 000", "250 800", "ok"],
    ["Страховые взносы", "Март", "1 240 000", "372 000", "ok"],
    ["НДФЛ с зарплаты", "Март", "1 240 000", "161 200", "ok"],
    ["Взносы ИП, 1 %", "2025", "3 900 000", "36 000", "warn"],
  ] as const;

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-[#e6e8ec] bg-white">
        <Head cols={["Налог", "Период", "База", "К уплате", "Статус"]} />
        {rows.map((r, i) => (
          <Row key={r[0]} i={i}>
            <span className="font-medium text-[#1a2230]">{r[0]}</span>
            <span className="num-ui text-[#6b7484]">{r[1]}</span>
            <span className="num-ui text-[#6b7484]">{r[2]}</span>
            <span className="num-ui font-semibold text-[#1a2230]">{r[3]} ₽</span>
            <Chip tone={r[4] as "ok" | "warn"}>{r[4] === "ok" ? "рассчитан" : "проверяем"}</Chip>
          </Row>
        ))}
      </div>
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="w-[236px] shrink-0 rounded-lg border border-[#e6e8ec] bg-white p-4"
      >
        <span className="label text-[10px] text-[#8992a1]">Всего к уплате</span>
        <p className="num-ui mt-2 text-[30px] font-semibold leading-none tracking-tight text-[#1a2230]">
          {rub(820000)} ₽
        </p>
        <div className="mt-4 border-t border-[#edeef1] pt-3">
          <span className="label text-[10px] text-[#8992a1]">Крайний срок</span>
          <p className="num-ui mt-1 text-[15px] font-medium text-[#1a2230]">28 апреля</p>
          <p className="mt-3 text-[12px] leading-snug text-[#6b7484]">
            Платёжки подготовлены. Отправим по вашей команде.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}

/* ── Экран 1. Отчётность ───────────────────────────────────────────────── */
function ReportView() {
  const rows = [
    ["Декларация по УСН", "за 2025", "25 марта", "сдано", "ok"],
    ["РСВ", "I квартал", "25 апреля", "сдано", "ok"],
    ["6-НДФЛ", "I квартал", "25 апреля", "сдано", "ok"],
    ["ЕФС-1, подраздел 1.1", "Март", "27 апреля", "отправлено", "ok"],
    ["Бухгалтерский баланс", "за 2025", "31 марта", "сдано", "ok"],
  ] as const;

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-[#e6e8ec] bg-white">
        <Head cols={["Отчёт", "Период", "Срок", "Статус", "Приняли"]} />
        {rows.map((r, i) => (
          <Row key={r[0]} i={i}>
            <span className="font-medium text-[#1a2230]">{r[0]}</span>
            <span className="num-ui text-[#6b7484]">{r[1]}</span>
            <span className="num-ui text-[#6b7484]">{r[2]}</span>
            <Chip tone="ok">{r[3]}</Chip>
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.4, ease }}
              viewBox="0 0 20 20"
              className="h-4 w-4"
            >
              <motion.path
                d="M4 10.5 L8.2 14.5 L16 6"
                fill="none"
                stroke="#34c58b"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </Row>
        ))}
      </div>
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="w-[236px] shrink-0 rounded-lg border border-[#e6e8ec] bg-white p-4"
      >
        <span className="label text-[10px] text-[#8992a1]">Отчётный период</span>
        <p className="num-ui mt-2 text-[30px] font-semibold leading-none tracking-tight text-[#1a2230]">5 / 5</p>
        <p className="mt-1 text-[12px] text-[#0f7a55]">Всё сдано в срок</p>
        <div className="mt-4 border-t border-[#edeef1] pt-3">
          <span className="label text-[10px] text-[#8992a1]">Просрочек</span>
          <p className="num-ui mt-1 text-[15px] font-medium text-[#1a2230]">0</p>
          <p className="mt-3 text-[12px] leading-snug text-[#6b7484]">
            Следующий срок — 25 июля. Напоминание вам не понадобится.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}

/* ── Экран 2. Требование ФНС ───────────────────────────────────────────── */
function FnsView() {
  const steps = [
    ["Требование получено", "14:02", true],
    ["Подняли первичные документы", "14:40", true],
    ["Подготовили пояснения", "16:15", true],
    ["Ответ отправлен в ИФНС", "17:03", true],
    ["Требование закрыто", "—", false],
  ] as const;

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 rounded-lg border border-[#e6e8ec] bg-white p-5">
        <div className="flex items-start justify-between border-b border-[#edeef1] pb-4">
          <div>
            <span className="label text-[10px] text-[#8992a1]">Требование о пояснениях</span>
            <p className="num-ui mt-1 text-[17px] font-semibold text-[#1a2230]">№ 4718 от 12.04</p>
            <p className="mt-1 text-[12px] text-[#6b7484]">Расхождение по НДС с контрагентом</p>
          </div>
          <Chip tone="ok">в работе у нас</Chip>
        </div>
        <div className="mt-4 space-y-0">
          {steps.map(([name, time, done], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.11, duration: 0.4, ease }}
              className="flex items-center gap-3 py-[9px]"
            >
              <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                {i < steps.length - 1 && (
                  <span className="absolute top-[15px] h-[18px] w-px bg-[#dfe2e7]" />
                )}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.11, duration: 0.3, ease }}
                  className={`h-[13px] w-[13px] rounded-full border-2 ${
                    done ? "border-[#34c58b] bg-[#34c58b]" : "border-[#c9ced7] bg-white"
                  }`}
                />
              </span>
              <span className={`flex-1 text-[13px] ${done ? "text-[#1a2230]" : "text-[#9aa2b0]"}`}>
                {name}
              </span>
              <span className="num-ui text-[12px] text-[#8992a1]">{time}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="w-[236px] shrink-0 rounded-lg border border-[#e6e8ec] bg-white p-4"
      >
        <span className="label text-[10px] text-[#8992a1]">Ваше участие</span>
        <p className="num-ui mt-2 text-[30px] font-semibold leading-none tracking-tight text-[#1a2230]">0 мин</p>
        <div className="mt-4 border-t border-[#edeef1] pt-3">
          <span className="label text-[10px] text-[#8992a1]">Срок ответа</span>
          <p className="num-ui mt-1 text-[15px] font-medium text-[#1a2230]">5 рабочих дней</p>
          <p className="mt-3 text-[12px] leading-snug text-[#6b7484]">
            Уложились за один. Вам придёт уведомление, когда требование закроют.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}

/* ── Экран 3. Зарплата и кадры ─────────────────────────────────────────── */
function PayrollView() {
  const rows = [
    ["Соколова А. В.", "Оклад", "94 000", "12 220", "81 780"],
    ["Ким Д. С.", "Оклад + премия", "121 500", "15 795", "105 705"],
    ["Терентьев И. П.", "Отпускные", "68 400", "8 892", "59 508"],
    ["Жарова Е. М.", "Больничный", "31 200", "4 056", "27 144"],
  ] as const;

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-[#e6e8ec] bg-white">
        <Head cols={["Сотрудник", "Начисление", "Сумма", "НДФЛ", "К выплате"]} />
        {rows.map((r, i) => (
          <Row key={r[0]} i={i}>
            <span className="font-medium text-[#1a2230]">{r[0]}</span>
            <span className="text-[12px] text-[#6b7484]">{r[1]}</span>
            <span className="num-ui text-[#6b7484]">{r[2]}</span>
            <span className="num-ui text-[#6b7484]">{r[3]}</span>
            <span className="num-ui font-semibold text-[#1a2230]">{r[4]}</span>
          </Row>
        ))}
      </div>
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="w-[236px] shrink-0 rounded-lg border border-[#e6e8ec] bg-white p-4"
      >
        <span className="label text-[10px] text-[#8992a1]">К выплате 5 апреля</span>
        <p className="num-ui mt-2 text-[30px] font-semibold leading-none tracking-tight text-[#1a2230]">
          {rub(274137)} ₽
        </p>
        <div className="mt-4 space-y-2 border-t border-[#edeef1] pt-3">
          {[
            ["Кадровые документы", "оформлены"],
            ["Воинский учёт", "актуален"],
            ["ЕФС-1 по приёму", "отправлен"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-[12px] text-[#6b7484]">{k}</span>
              <Chip tone="ok">{v}</Chip>
            </div>
          ))}
        </div>
      </motion.aside>
    </div>
  );
}

/* ── Экран 4. НДС ──────────────────────────────────────────────────────── */
function VatView() {
  const revenue = 16.4;
  const limit = 20;
  const pct = (revenue / limit) * 100;

  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-1 flex-col rounded-lg border border-[#e6e8ec] bg-white p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="label text-[10px] text-[#8992a1]">Выручка нарастающим итогом</span>
            <p className="num-ui mt-1 text-[26px] font-semibold leading-none text-[#1a2230]">
              {revenue.toLocaleString("ru-RU")} млн ₽
            </p>
          </div>
          <div className="text-right">
            <span className="label text-[10px] text-[#8992a1]">Порог НДС</span>
            <p className="num-ui mt-1 text-[15px] font-medium text-[#1a2230]">{limit} млн ₽</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative h-[10px] overflow-hidden rounded-full bg-[#eef0f3]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.15, duration: 0.9, ease }}
              className="h-full rounded-full bg-[#ffb020]"
            />
          </div>
          <div className="mt-2 flex justify-between">
            <span className="num-ui text-[11px] text-[#8992a1]">0</span>
            <span className="num-ui text-[11px] text-[#8a5a00]">{Math.round(pct)} % порога</span>
            <span className="num-ui text-[11px] text-[#8992a1]">20 млн</span>
          </div>
        </div>

        <div className="mt-5 border-t border-[#edeef1] pt-4">
          <span className="label text-[10px] text-[#8992a1]">Проверка контрагентов</span>
          <div className="mt-2 space-y-0">
            {[
              ["ООО «Гранит-Урал»", "разрывов нет", "ok"],
              ["ИП Ларин К. О.", "разрывов нет", "ok"],
              ["ООО «Тэксан»", "разрыв по НДС, 340 тыс ₽", "risk"],
            ].map(([n, s, t], i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.09, duration: 0.35, ease }}
                className="flex items-center justify-between border-b border-[#f1f2f5] py-[9px] text-[13px] last:border-0"
              >
                <span className="text-[#1a2230]">{n}</span>
                <Chip tone={t as "ok" | "risk"}>{s}</Chip>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.aside
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className="w-[236px] shrink-0 rounded-lg border border-[#e6e8ec] bg-white p-4"
      >
        <span className="label text-[10px] text-[#8992a1]">Импорт из ЕАЭС</span>
        <p className="mt-2 text-[13px] font-medium leading-snug text-[#1a2230]">
          НДС платится авансом, до границы
        </p>
        <p className="mt-2 text-[12px] leading-snug text-[#6b7484]">
          С 1 июля 2026 года платёж вносится не позднее чем за два дня до ввоза. Подтверждение — QR-код от ФНС.
        </p>
        <div className="mt-4 border-t border-[#edeef1] pt-3">
          <Chip tone="warn">следим за сроками</Chip>
        </div>
      </motion.aside>
    </div>
  );
}

const views = [TaxView, ReportView, FnsView, PayrollView, VatView];

/* Контекст внизу окна — то, что в реальной программе всегда перед глазами. */
const statusBar = [
  ["Период", "апрель 2026", "Следующий платёж", "28 апреля"],
  ["Период", "I квартал 2026", "Следующий срок", "25 июля"],
  ["Требований в работе", "1", "Просрочено", "0"],
  ["Расчётный период", "март 2026", "Сотрудников", "4"],
  ["Режим", "УСН «доходы»", "До порога НДС", "3,6 млн ₽"],
];

/* Компактная раскладка для узких экранов: боковая навигация и правая панель
   на телефоне превращаются в нечитаемую крошку, поэтому там остаётся суть —
   заголовок, главная цифра и несколько строк. */
const compactViews = [
  {
    title: "Налоги, апрель",
    metric: "820 000 ₽",
    metricLabel: "к уплате до 28 апреля",
    rows: [
      ["Налог по УСН", "250 800 ₽", "ok"],
      ["Страховые взносы", "372 000 ₽", "ok"],
      ["НДФЛ с зарплаты", "161 200 ₽", "ok"],
      ["Взносы ИП, 1 %", "36 000 ₽", "warn"],
    ],
  },
  {
    title: "Отчётность, I квартал",
    metric: "5 / 5",
    metricLabel: "сдано в срок, просрочек нет",
    rows: [
      ["Декларация по УСН", "сдано", "ok"],
      ["РСВ", "сдано", "ok"],
      ["6-НДФЛ", "сдано", "ok"],
      ["Бухгалтерский баланс", "сдано", "ok"],
    ],
  },
  {
    title: "Требование № 4718",
    metric: "0 мин",
    metricLabel: "вашего участия",
    rows: [
      ["Требование получено", "14:02", "mute"],
      ["Подняли документы", "14:40", "mute"],
      ["Подготовили пояснения", "16:15", "mute"],
      ["Ответ отправлен в ИФНС", "17:03", "ok"],
    ],
  },
  {
    title: "Зарплата, март",
    metric: "274 137 ₽",
    metricLabel: "к выплате 5 апреля",
    rows: [
      ["Соколова А. В.", "81 780 ₽", "ok"],
      ["Ким Д. С.", "105 705 ₽", "ok"],
      ["Терентьев И. П.", "59 508 ₽", "ok"],
      ["Жарова Е. М.", "27 144 ₽", "ok"],
    ],
  },
  {
    title: "НДС, контроль",
    metric: "16,4 млн ₽",
    metricLabel: "выручка при пороге 20 млн",
    rows: [
      ["До порога НДС", "3,6 млн ₽", "warn"],
      ["ООО «Гранит-Урал»", "разрывов нет", "ok"],
      ["ИП Ларин К. О.", "разрывов нет", "ok"],
      ["ООО «Тэксан»", "разрыв 340 тыс ₽", "risk"],
    ],
  },
] as const;

function CompactScreen({ step }: { step: number }) {
  const d = compactViews[step];

  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col bg-[#f2f3f5] text-[#1a2230] select-none">
      <div className="flex items-center gap-3 border-b border-[#e0e3e8] bg-[#e9ebef] px-5 py-3">
        <span className="flex gap-2">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-[13px] w-[13px] rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="label ml-1 text-[14px] text-[#77808f]">ПРОФ ЕКБ</span>
        <span className="ml-auto h-[9px] w-[9px] rounded-full bg-[#34c58b]" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease }}
            className="flex h-full flex-col rounded-xl border border-[#e6e8ec] bg-white p-5"
          >
            <span className="label text-[13px] text-[#8992a1]">{d.title}</span>
            <p className="num-ui mt-2 text-[42px] font-semibold leading-none tracking-tight">
              {d.metric}
            </p>
            <p className="mt-2 text-[17px] text-[#6b7484]">{d.metricLabel}</p>

            <div className="mt-5 border-t border-[#edeef1]">
              {d.rows.map(([name, value, tone], i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.35, ease }}
                  className="flex items-center justify-between gap-3 border-b border-[#f1f2f5] py-[13px] last:border-0"
                >
                  <span className="text-[19px] text-[#1a2230]">{name}</span>
                  <span
                    className={`num-ui shrink-0 text-[19px] font-medium ${
                      tone === "risk"
                        ? "text-[#c02233]"
                        : tone === "warn"
                          ? "text-[#8a5a00]"
                          : tone === "ok"
                            ? "text-[#0f7a55]"
                            : "text-[#6b7484]"
                    }`}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Курсор сам подтверждает работу: подъезжает к результату каждого экрана
   и «кликает» по нему. Координаты — в системе полного канваса (1040×580),
   подобраны под то, что реально находится в этой точке на каждом шаге. */
const cursorTargets: [number, number][] = [
  [870, 118], // Налоги — итоговая сумма к уплате
  [700, 250], // Отчётность — галочка у последнего сданного отчёта
  [195, 294], // ФНС — последний шаг таймлайна «Ответ отправлен»
  [974, 169], // Зарплата — статус «Воинский учёт: актуален»
  [250, 107], // НДС — выручка нарастающим итогом
];

function CursorPlay({ to }: { to: [number, number] }) {
  const [tx, ty] = to;
  const fromX = tx - 130;
  const fromY = ty - 90;
  const T = 1.9;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, x: fromX, y: fromY, scale: 0.9 }}
      animate={{
        opacity: [0, 1, 1, 1, 1, 1, 0],
        x: [fromX, fromX, fromX, tx, tx, tx, tx],
        y: [fromY, fromY, fromY, ty, ty, ty, ty],
        scale: [0.9, 1, 1, 1, 0.78, 1, 1],
      }}
      transition={{
        duration: T,
        delay: 0.5,
        ease: "easeInOut",
        times: [0, 0.1, 0.16, 0.5, 0.62, 0.75, 1],
      }}
      className="pointer-events-none absolute left-0 top-0 z-30"
    >
      {/* viewBox остаётся 20×20 — размер задаём атрибутами, форма стрелки
          не пересчитывается, только масштабируется целиком. Нативные 20px
          на масштабе мокапа (~0.7×) превращались в 13px и терялись из виду. */}
      <svg width="34" height="34" viewBox="0 0 20 20" className="drop-shadow-[0_2px_5px_rgba(20,20,20,0.45)]">
        <path
          d="M2 1.5 L2 15.5 L5.6 12.3 L8 17.6 L10.3 16.5 L7.9 11.1 L12.5 10.9 Z"
          fill="#1a2230"
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <motion.span
        initial={{ scale: 0, opacity: 0.65 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.5 + T * 0.62, ease: "easeOut" }}
        className="absolute left-[1px] top-[1px] h-[22px] w-[22px] rounded-full border-2 border-[#a16207]"
      />
    </motion.div>
  );
}

export default function Screen({ step, compact = false }: { step: number; compact?: boolean }) {
  const safe = Math.min(Math.max(step, 0), views.length - 1);
  const View = views[safe];

  if (compact) return <CompactScreen step={safe} />;

  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full flex-col bg-[#f2f3f5] text-[#1a2230] select-none"
    >
      {/* Строка окна */}
      <div className="flex items-center gap-3 border-b border-[#e0e3e8] bg-[#e9ebef] px-4 py-[9px]">
        <span className="flex gap-[6px]">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-[10px] w-[10px] rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="label ml-1 text-[10px] text-[#77808f]">ПРОФ ЕКБ · учёт клиента</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="h-[6px] w-[6px] rounded-full bg-[#34c58b]" />
          <span className="num-ui text-[11px] text-[#77808f]">синхронизировано</span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Боковая навигация с бегущим выделением */}
        <nav className="w-[150px] shrink-0 border-r border-[#e0e3e8] bg-[#eceef1] py-3">
          {rail.map((r, i) => (
            <div key={r.id} className="relative px-2 py-[3px]">
              {i === safe && (
                <motion.span
                  layoutId="rail-active"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-x-2 inset-y-[3px] rounded-md bg-white shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
                />
              )}
              <span
                className={`relative flex items-center gap-2 px-[10px] py-[7px] text-[13px] ${
                  i === safe ? "font-semibold text-[#1a2230]" : "text-[#77808f]"
                }`}
              >
                <span
                  className={`h-[5px] w-[5px] rounded-full ${
                    i === safe ? "bg-[#a16207]" : "bg-[#c2c8d1]"
                  }`}
                />
                {r.name}
              </span>
            </div>
          ))}
        </nav>

        {/* Рабочая область */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="min-h-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={safe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease }}
                className="h-full"
              >
                <View />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`status-${safe}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="mt-3 flex shrink-0 items-center gap-6 border-t border-[#e0e3e8] pt-3"
            >
              {[0, 2].map((k) => (
                <span key={k} className="flex items-baseline gap-2">
                  <span className="label text-[10px] text-[#9aa2b0]">{statusBar[safe][k]}</span>
                  <span className="num-ui text-[12px] font-medium text-[#4a5361]">
                    {statusBar[safe][k + 1]}
                  </span>
                </span>
              ))}
              <span className="num-ui ml-auto text-[11px] text-[#9aa2b0]">
                ведёт: ПРОФ ЕКБ · Мария Новикова
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <CursorPlay key={safe} to={cursorTargets[safe]} />
    </div>
  );
}
