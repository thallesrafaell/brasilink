"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function useLocale() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocaleState] = useState(() => {
    if (typeof window !== "undefined") {
      return document.cookie.match(/locale=([^;]+)/)?.[1] || "pt";
    }
    return "pt";
  });

  const setLocale = (newLocale: string) => {
    startTransition(() => {
      // Set cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
      setLocaleState(newLocale);
      // Refresh to apply new locale
      router.refresh();
    });
  };

  return {
    locale,
    setLocale,
    isPending,
  };
}
