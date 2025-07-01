import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";

import "./globals.css";
import { ThemeProvider } from "@/components/thmeProvider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap", // Otimização de carregamento de fonte
});

// Meta tags globais otimizadas para SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://brasilink.com"),
  title: {
    default:
      "Brasilink - Plataforma de Agendamento para Profissionais Brasileiros",
    template: "%s | Brasilink",
  },
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
    "emigrantes brasileiros",
    "agenda online",
  ],
  authors: [{ name: "Brasilink Team" }],
  creator: "Brasilink",
  publisher: "Brasilink",

  // Robots meta tag para controle de indexação
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph tags para redes sociais
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "https://brasilink.com",
    siteName: "Brasilink",
    title:
      "Brasilink - Plataforma de Agendamento para Profissionais Brasileiros",
    description:
      "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brasilink - Plataforma de agendamento para profissionais brasileiros no exterior",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@brasilink",
    creator: "@brasilink",
    title:
      "Brasilink - Plataforma de Agendamento para Profissionais Brasileiros",
    description:
      "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
    images: ["/twitter-image.jpg"],
  },

  // URLs alternativas para idiomas
  alternates: {
    canonical: "https://brasilink.com",
    languages: {
      "pt-BR": "https://brasilink.com",
      "en-US": "https://brasilink.com/en",
    },
  },

  // Configurações adicionais
  category: "Business Software",
  classification: "Business Tools",

  // Verificação para ferramentas de webmaster
  verification: {
    google: "google-site-verification-code", // Substituir pelo código real
    // bing: 'bing-verification-code',
    // yahoo: 'yahoo-verification-code',
  },

  // Informações de aplicativo
  applicationName: "Brasilink",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],

  // Configurações de viewport já incluídas automaticamente pelo Next.js 13+
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Schema Markup JSON-LD para Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Brasilink",
              url: "https://brasilink.com",
              logo: "https://brasilink.com/logo.png",
              description:
                "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-11-99999-9999",
                contactType: "customer service",
                availableLanguage: ["Portuguese", "English"],
              },
              sameAs: [
                "https://www.linkedin.com/company/brasilink",
                "https://twitter.com/brasilink",
                "https://www.instagram.com/brasilink",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
              },
            }),
          }}
        />

        {/* Schema Markup JSON-LD para WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Brasilink",
              url: "https://brasilink.com",
              description:
                "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
              publisher: {
                "@type": "Organization",
                name: "Brasilink",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://brasilink.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Schema Markup JSON-LD para SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Brasilink",
              operatingSystem: "Web Browser",
              applicationCategory: "BusinessApplication",
              description:
                "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
              url: "https://brasilink.com",
              author: {
                "@type": "Organization",
                name: "Brasilink",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                category: "Freemium",
              },
            }),
          }}
        />
      </head>
      <body className={` ${roboto.variable} overflow-hidden antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster duration={2000} position="top-right" richColors />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
