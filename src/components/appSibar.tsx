"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ModeToggle } from "./toogleTheme";
import { UserDropdownMenu } from "./userDropDown";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = usePathname();

  const isActive = (url: string) => {
    return location === url;
  };

  return (
    <Sidebar>
      <SidebarHeader className="mb-8 flex flex-row justify-between">
        <h1 className="text-primary text-2xl font-bold">
          Brasilink<span className="text-muted-foreground text-sm">&copy;</span>
        </h1>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-[0px]">
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 p-2 transition-colors ${
                        isActive(item.url)
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-secondary hover:text-primary"
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto w-full">
          <UserDropdownMenu />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
