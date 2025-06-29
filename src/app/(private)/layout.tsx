import { ReactNode } from "react";

import { AppSidebar } from "@/components/appSibar";
import TitleLayout from "@/components/titleLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 px-4 py-4">
        <div className="mb-4 flex items-center">
          <SidebarTrigger />
          <TitleLayout />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
