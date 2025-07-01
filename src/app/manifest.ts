import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brasilink - Plataforma de Agendamento",
    short_name: "Brasilink",
    description:
      "A plataforma completa para profissionais brasileiros no exterior gerenciarem serviços, agendamentos e pagamentos de forma simples e profissional.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    categories: ["business", "productivity"],
    lang: "pt-BR",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Dashboard",
        short_name: "Dashboard",
        description: "Acesse seu painel de controle",
        url: "/dashboard",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Serviços",
        short_name: "Serviços",
        description: "Gerencie seus serviços",
        url: "/services",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
