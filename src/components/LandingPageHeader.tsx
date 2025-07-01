"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";

export function LandingPageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Globe className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Brasilink</span>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          <a
            href="#recursos"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {t("navigation.resources")}
          </a>
          <a
            href="#precos"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {t("navigation.pricing")}
          </a>
          <a
            href="#depoimentos"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            {t("navigation.testimonials")}
          </a>
          <LanguageToggle />
          <Button variant="ghost" asChild>
            <Link href="/auth">{t("navigation.login")}</Link>
          </Button>
          <Button asChild>
            <Link href="/auth">{t("navigation.getStarted")}</Link>
          </Button>
        </nav>

        <div className="flex items-center space-x-2 md:hidden">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {t("navigation.menu")}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto space-y-3 py-4">
            <a href="#recursos" className="block text-sm font-medium">
              {t("navigation.resources")}
            </a>
            <a href="#precos" className="block text-sm font-medium">
              {t("navigation.pricing")}
            </a>
            <a href="#depoimentos" className="block text-sm font-medium">
              {t("navigation.testimonials")}
            </a>
            <div className="space-y-2 pt-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/auth">{t("navigation.login")}</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth">{t("navigation.getStarted")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
