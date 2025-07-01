// Schema Markup configurations for different page types

export interface SchemaBase {
  "@context": string;
  "@type": string;
}

export interface OrganizationSchema extends SchemaBase {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  contactPoint?: ContactPoint;
  sameAs?: string[];
  address?: PostalAddress;
}

export interface WebSiteSchema extends SchemaBase {
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Organization";
    name: string;
  };
  potentialAction?: SearchAction;
}

export interface SoftwareApplicationSchema extends SchemaBase {
  "@type": "SoftwareApplication";
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  description: string;
  url: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    category: string;
  };
}

export interface WebPageSchema extends SchemaBase {
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  mainEntity?: object;
  breadcrumb?: BreadcrumbList;
  isPartOf?: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
}

export interface ServiceSchema extends SchemaBase {
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  serviceType: string;
  areaServed?: string[];
  availableChannel?: {
    "@type": "ServiceChannel";
    serviceUrl: string;
    serviceType: string;
  };
}

export interface FAQPageSchema extends SchemaBase {
  "@type": "FAQPage";
  mainEntity: Question[];
}

export interface Question extends SchemaBase {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface BreadcrumbList extends SchemaBase {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem extends SchemaBase {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

interface ContactPoint {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  availableLanguage: string[];
}

interface PostalAddress {
  "@type": "PostalAddress";
  addressCountry: string;
}

interface SearchAction {
  "@type": "SearchAction";
  target: string;
  "query-input": string;
}

// Default schemas
export const organizationSchema: OrganizationSchema = {
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
    "https://www.facebook.com/brasilink",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
};

export const websiteSchema: WebSiteSchema = {
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
};

export const softwareApplicationSchema: SoftwareApplicationSchema = {
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
};

// Helper functions to generate specific schemas
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
}): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Brasilink",
    },
    serviceType: service.serviceType,
    areaServed: service.areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://brasilink.com",
      serviceType: "Online",
    },
  };
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}): WebPageSchema {
  const schema: WebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      "@type": "WebSite",
      name: "Brasilink",
      url: "https://brasilink.com",
    },
  };

  if (page.breadcrumb && page.breadcrumb.length > 0) {
    schema.breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumb.map((item, index) => ({
        "@context": "https://schema.org",
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return schema;
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@context": "https://schema.org",
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
