import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export const defaultMetadata: PageMetadata = {
  title: "Brasilink - Plataforma de Agendamento para Profissionais Brasileiros",
  description:
    "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
  keywords: [
    "agendamento",
    "brasileiros no exterior",
    "profissionais brasileiros",
    "serviços",
    "pagamentos online",
    "booking system",
    "appointment scheduling",
    "Brazilian professionals abroad",
  ],
  image: "/og-image.jpg",
};

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title:
      "Brasilink - Plataforma de Agendamento para Profissionais Brasileiros",
    description:
      "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
    keywords: [
      "agendamento online",
      "brasileiros no exterior",
      "profissionais brasileiros",
      "serviços profissionais",
      "pagamentos online",
      "booking system",
      "appointment scheduling",
      "Brazilian professionals abroad",
      "emigrantes brasileiros",
      "agenda online",
    ],
    image: "/og-home.jpg",
  },
  "/auth": {
    title: "Login - Brasilink",
    description:
      "Faça login na sua conta Brasilink para gerenciar seus serviços e agendamentos.",
    keywords: ["login", "entrar", "conta", "acesso"],
    image: "/og-auth.jpg",
    noIndex: true,
  },
  "/dashboard": {
    title: "Dashboard - Brasilink",
    description:
      "Painel de controle para gerenciar seus serviços, agendamentos e clientes.",
    keywords: ["dashboard", "painel", "controle", "gerenciar"],
    image: "/og-dashboard.jpg",
    noIndex: true,
  },
  "/services": {
    title: "Serviços - Brasilink",
    description:
      "Gerencie seus serviços profissionais e configure preços e horários.",
    keywords: ["serviços", "profissionais", "preços", "horários"],
    image: "/og-services.jpg",
    noIndex: true,
  },
  "/settings": {
    title: "Configurações - Brasilink",
    description: "Configure suas preferências e dados da conta.",
    keywords: ["configurações", "preferências", "conta"],
    image: "/og-settings.jpg",
    noIndex: true,
  },
  "/pricing": {
    title: "Preços - Brasilink",
    description:
      "Conheça nossos planos e preços para profissionais brasileiros no exterior.",
    keywords: ["preços", "planos", "assinatura", "profissionais"],
    image: "/og-pricing.jpg",
  },
  "/features": {
    title: "Recursos - Brasilink",
    description:
      "Descubra todos os recursos da plataforma Brasilink para profissionais.",
    keywords: ["recursos", "funcionalidades", "features"],
    image: "/og-features.jpg",
  },
  "/about": {
    title: "Sobre - Brasilink",
    description:
      "Conheça a história e missão da Brasilink para profissionais brasileiros.",
    keywords: ["sobre", "história", "missão", "equipe"],
    image: "/og-about.jpg",
  },
  "/contact": {
    title: "Contato - Brasilink",
    description: "Entre em contato conosco para dúvidas, suporte ou parcerias.",
    keywords: ["contato", "suporte", "ajuda", "parcerias"],
    image: "/og-contact.jpg",
  },
};

export async function generatePageMetadata(
  page: string = "/",
  locale: string = "pt"
): Promise<Metadata> {
  const t = await getTranslations();
  const metadata = pageMetadata[page] || defaultMetadata;

  // Para páginas traduzidas, usar as traduções
  let title = metadata.title;
  let description = metadata.description;

  if (page === "/" && t) {
    try {
      title = `${t("hero.title")}${t("hero.titleHighlight")}${t("hero.titleEnd")} | Brasilink`;
      description = t("hero.subtitle");
    } catch {
      // Fallback para valores padrão se as traduções não estiverem disponíveis
      console.warn("Translation keys not found, using default metadata");
    }
  }

  const baseUrl = "https://brasilink.com";
  const pageUrl =
    locale === "en"
      ? `${baseUrl}/en${page === "/" ? "" : page}`
      : `${baseUrl}${page === "/" ? "" : page}`;

  return {
    title,
    description,
    keywords: metadata.keywords || defaultMetadata.keywords,

    robots: metadata.noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
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
      locale: locale === "en" ? "en_US" : "pt_BR",
      alternateLocale: locale === "en" ? "pt_BR" : "en_US",
      url: pageUrl,
      siteName: "Brasilink",
      title,
      description,
      images: [
        {
          url: metadata.image || defaultMetadata.image!,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@brasilink",
      creator: "@brasilink",
      title,
      description,
      images: [metadata.image || defaultMetadata.image!],
    },

    alternates: {
      canonical: metadata.canonical || pageUrl,
      languages: {
        "pt-BR":
          locale === "en" ? `${baseUrl}${page === "/" ? "" : page}` : pageUrl,
        "en-US":
          locale === "pt"
            ? `${baseUrl}/en${page === "/" ? "" : page}`
            : pageUrl,
      },
    },
  };
}
