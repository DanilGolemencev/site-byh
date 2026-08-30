import type { Metadata, Viewport } from "next";
import { Unbounded, Golos_Text, Fraunces } from "next/font/google";
import Providers from "@/components/Providers";
import { company } from "@/lib/content";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-golos",
  display: "swap",
});

/* Только цифры и пунктуация — кириллица Fraunces не нужна: гарнитура
   используется исключительно через утилиту .num на числовых значениях. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prof-ekb.ru"),
  title: "ПРОФ ЕКБ — бухгалтерия, налоги и право в Екатеринбурге",
  description:
    "Бухгалтерское и юридическое обслуживание ООО и ИП в Екатеринбурге. Отчётность в срок, ответы на требования ФНС, зарплата и кадры. Обслуживание от 5 000 ₽ в месяц, цена фиксируется в договоре.",
  keywords: [
    "бухгалтерские услуги Екатеринбург",
    "бухгалтерское обслуживание ООО",
    "аутсорсинг бухгалтерии",
    "налоговый консультант Екатеринбург",
    "юридические услуги для бизнеса",
    "восстановление бухгалтерского учёта",
  ],
  openGraph: {
    title: "ПРОФ ЕКБ — учёт ведём мы, вы спите спокойно",
    description:
      "Бухгалтерия, налоги, кадры и право для ООО и ИП в Екатеринбурге. Обслуживание от 5 000 ₽ в месяц.",
    type: "website",
    locale: "ru_RU",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: company.name,
  telephone: company.phone,
  email: company.email,
  faxNumber: company.fax,
  url: "https://prof-ekb.ru",
  areaServed: "RU",
  address: {
    "@type": "PostalAddress",
    postalCode: "620049",
    addressLocality: "Екатеринбург",
    addressRegion: "Свердловская область",
    streetAddress: "Автоматики переулок, 1",
    addressCountry: "RU",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  founder: { "@type": "Person", name: "Мария Новикова" },
  priceRange: "от 5000 ₽",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${golos.variable} ${fraunces.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
