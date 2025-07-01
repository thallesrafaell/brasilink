"use client";

import { useEffect } from "react";

interface UseSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
}

export function useSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  locale = "pt-BR",
}: UseSEOProps) {
  useEffect(() => {
    // Atualizar título da página
    if (title) {
      document.title = title;
    }

    // Atualizar meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    // Atualizar meta keywords
    if (keywords && keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // Atualizar Open Graph tags
    if (title) {
      updateMetaTag("property", "og:title", title);
    }

    if (description) {
      updateMetaTag("property", "og:description", description);
    }

    if (image) {
      updateMetaTag("property", "og:image", image);
    }

    if (url) {
      updateMetaTag("property", "og:url", url);
    }

    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:locale", locale);

    // Atualizar Twitter Cards
    if (title) {
      updateMetaTag("name", "twitter:title", title);
    }

    if (description) {
      updateMetaTag("name", "twitter:description", description);
    }

    if (image) {
      updateMetaTag("name", "twitter:image", image);
    }

    updateMetaTag("name", "twitter:card", "summary_large_image");

    // Atualizar canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }
  }, [title, description, keywords, image, url, type, locale]);
}

function updateMetaTag(attribute: string, name: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

// Hook para structured data (JSON-LD)
export function useStructuredData(data: object) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}

// Hook para preload de recursos críticos
export function usePreload(
  resources: Array<{ href: string; as: string; type?: string }>
) {
  useEffect(() => {
    const links = resources.map((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources]);
}
