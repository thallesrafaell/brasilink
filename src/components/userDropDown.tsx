"use client";

import { LogOutIcon, MoreVerticalIcon, User2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SupabaseUserMetadata {
  avatar_url?: string;
  email?: string;
  full_name?: string;
  name?: string;
  picture?: string;
  provider?: string;
  my_profile_image_url?: string;
}

export function UserDropdownMenu() {
  const [userData, setUserData] = useState<SupabaseUserMetadata | null>(null);
  const supabase = createClient();

  const fetchAndSetUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      setUserData(null);
      return;
    }

    const userMetadata = user.user_metadata as SupabaseUserMetadata;

    setUserData({
      avatar_url: userMetadata.avatar_url || "",
      full_name: userMetadata.full_name || "",
      name: userMetadata.name || "",
      email: user.email || "",
      picture: userMetadata.picture || "",
      my_profile_image_url: userMetadata.my_profile_image_url || "",
    });
  }, [supabase]);

  useEffect(() => {
    fetchAndSetUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" ||
        event === "USER_UPDATED" ||
        event === "SIGNED_OUT"
      ) {
        console.log("Auth event detected:", event);
        fetchAndSetUser();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, fetchAndSetUser]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      redirect("/auth");
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Avatar>
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">Carregando...</p>
        </div>
        <MoreVerticalIcon className="ml-auto h-4 w-4" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Avatar className="border-2 border-gray-300 dark:border-gray-700">
            <AvatarImage
              src={
                userData?.my_profile_image_url
                  ? userData?.my_profile_image_url
                  : userData?.avatar_url
              }
              alt={userData?.name}
            />
            <AvatarFallback>
              {userData?.name ? (
                userData.name.substring(0, 2).toUpperCase()
              ) : (
                <User2Icon className="h-6 w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">{userData?.name}</p>
            <p className="text-muted-foreground text-sm">{userData?.email}</p>
          </div>
          <MoreVerticalIcon className="ml-auto h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 w-56 shadow-md"
        align="end"
        alignOffset={30}
        side="right"
        sideOffset={10}
      >
        <DropdownMenuItem asChild>
          <div className="p-1">Perfil</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
          <LogOutIcon className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
