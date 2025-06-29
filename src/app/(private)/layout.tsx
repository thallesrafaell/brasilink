import { ReactNode } from "react";

import { AppSidebar } from "@/components/appSibar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default PrivateLayout;
