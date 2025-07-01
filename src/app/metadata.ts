import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: `${t("hero.title")}${t("hero.titleHighlight")}${t("hero.titleEnd")} | Brasilink`,
    description: t("hero.subtitle"),
    keywords: [
      "agendamento",
      "brasileiros",
      "exterior",
      "profissionais",
      "serviços",
      "pagamentos",
      "booking",
      "professionals",
      "abroad",
      "appointments",
    ],
    authors: [{ name: "Brasilink" }],
    creator: "Brasilink",
    publisher: "Brasilink",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      alternateLocale: "en_US",
      url: "https://brasilink.com",
      siteName: "Brasilink",
      title: `${t("hero.title")}${t("hero.titleHighlight")}${t("hero.titleEnd")}`,
      description: t("hero.subtitle"),
      images: [
        {
          url: "/hero.jpg",
          width: 1200,
          height: 630,
          alt: "Brasilink - Plataforma de agendamento para profissionais brasileiros",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("hero.title")}${t("hero.titleHighlight")}${t("hero.titleEnd")}`,
      description: t("hero.subtitle"),
      images: ["/hero.jpg"],
    },
    alternates: {
      canonical: "https://brasilink.com",
      languages: {
        "pt-BR": "https://brasilink.com",
        "en-US": "https://brasilink.com/en",
      },
    },
  };
}
