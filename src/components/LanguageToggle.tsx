"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

export function LanguageToggle() {
  const { locale, setLocale, isPending } = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "pt" ? "en" : "pt";
    setLocale(newLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {locale === "pt" ? "EN" : "PT"}
      </span>
    </Button>
  );
}
