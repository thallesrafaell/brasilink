import { Metadata } from "next";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/appSibar";
import TitleLayout from "@/components/titleLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Meta tags específicas para páginas privadas (não indexadas)
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
  // Remover da indexação de redes sociais também
  openGraph: {
    type: "website",
  },
};

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen flex-1 flex-col px-4 py-4">
        <div className="mb-4 flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <TitleLayout />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
