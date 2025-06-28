"use client";
import { SignOutIcon } from "@phosphor-icons/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const LogoutButton = () => {
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      redirect("/auth");
      console.log("Successfully signed out");
    }
  };

  return (
    <Button
      size={"icon"}
      onClick={handleLogout}
      className="text-red-500"
      variant={"ghost"}
    >
      <SignOutIcon />
    </Button>
  );
};

export default LogoutButton;
