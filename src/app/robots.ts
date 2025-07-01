import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/settings/",
          "/admin/",
          "/api/",
          "/auth/callback",
          "/email-verification",
          "/private/",
          "/_next/",
          "/static/",
        ],
      },
      {
        // Configuração específica para Googlebot
        userAgent: "Googlebot",
        allow: ["/api/sitemap.xml", "/api/robots.txt"],
        disallow: ["/dashboard/", "/settings/", "/admin/"],
      },
      {
        // Bloquear bots maliciosos conhecidos
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai"],
        disallow: "/",
      },
    ],
    sitemap: "https://brasilink.com/sitemap.xml",
    host: "https://brasilink.com",
  };
}
