import {
  Calendar,
  Globe,
  CreditCard,
  Smartphone,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  TrendingUp,
  Shield,
  Heart,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Componentes interativos separados
import { LandingPageHeader } from "./LandingPageHeader";

export async function LandingPageServer() {
  const t = await getTranslations();

  return (
    <ScrollArea className="h-screen">
      <div className="bg-background min-h-screen">
        {/* Header com interatividade */}
        <LandingPageHeader />

        {/* Hero Section - Server Rendered */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-br via-transparent" />
          <div className="relative container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              {/* Trust Badge */}
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                <Heart className="mr-2 h-4 w-4 text-red-500" />
                {t("hero.badge")}
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                {t("hero.title")}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
                {t("hero.titleEnd")}
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                {t("hero.subtitle")}
              </p>

              <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-8 text-lg" asChild>
                  <Link href="/auth">
                    {t("hero.getStartedButton")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 text-lg">
                  {t("hero.demoButton")}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-6 text-sm sm:flex-row">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t("hero.freeTrial")}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t("hero.noCredit")}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t("hero.cancelAnytime")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-3xl font-bold">
                    {t("problemSolution.problemTitle")}
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <p className="flex items-start gap-3">
                      <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      {t("problemSolution.problem1")}
                    </p>
                    <p className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      {t("problemSolution.problem2")}
                    </p>
                    <p className="flex items-start gap-3">
                      <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      {t("problemSolution.problem3")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-primary mb-6 text-2xl font-bold">
                    {t("problemSolution.solutionTitle")}
                  </h3>
                  <div className="space-y-4">
                    <p className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{t("problemSolution.solution1")}</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{t("problemSolution.solution2")}</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{t("problemSolution.solution3")}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t("features.title")}
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                {t("features.subtitle")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Cards */}
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.smartBooking.title")}</CardTitle>
                  <CardDescription>
                    {t("features.smartBooking.description")}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Globe className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.professionalPage.title")}</CardTitle>
                  <CardDescription>
                    {t("features.professionalPage.description")}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <CreditCard className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.onlinePayments.title")}</CardTitle>
                  <CardDescription>
                    {t("features.onlinePayments.description")}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Smartphone className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.responsive.title")}</CardTitle>
                  <CardDescription>
                    {t("features.responsive.description")}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <TrendingUp className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.reports.title")}</CardTitle>
                  <CardDescription>
                    {t("features.reports.description")}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>{t("features.security.title")}</CardTitle>
                  <CardDescription>
                    {t("features.security.description")}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="bg-muted/30 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t("testimonials.title")}
              </h2>
              <p className="text-muted-foreground text-xl">
                {t("testimonials.subtitle")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="relative">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/api/placeholder/40/40"
                        alt={t("testimonials.maria.name")}
                      />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {t("testimonials.maria.name")}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {t("testimonials.maria.role")}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &ldquo;{t("testimonials.maria.quote")}&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/api/placeholder/40/40"
                        alt={t("testimonials.joao.name")}
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {t("testimonials.joao.name")}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {t("testimonials.joao.role")}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &ldquo;{t("testimonials.joao.quote")}&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="/api/placeholder/40/40"
                        alt={t("testimonials.ana.name")}
                      />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {t("testimonials.ana.name")}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {t("testimonials.ana.role")}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &ldquo;{t("testimonials.ana.quote")}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precos" className="py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {t("pricing.title")}
              </h2>
              <p className="text-muted-foreground text-xl">
                {t("pricing.subtitle")}
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {/* Starter Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-center">
                    {t("pricing.starter.title")}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      {t("pricing.starter.price")}
                    </span>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {t("pricing.starter.description")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.starter.feature1")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.starter.feature2")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.starter.feature3")}
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth">{t("pricing.starter.button")}</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Plan */}
              <Card className="border-primary relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  <Badge className="bg-primary text-primary-foreground">
                    {t("pricing.professional.popular")}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-center">
                    {t("pricing.professional.title")}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      {t("pricing.professional.price")}
                    </span>
                    <span className="text-muted-foreground">
                      {t("pricing.professional.period")}
                    </span>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {t("pricing.professional.description")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.professional.feature1")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.professional.feature2")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.professional.feature3")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.professional.feature4")}
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/auth">{t("pricing.professional.button")}</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Business Plan */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-center">
                    {t("pricing.business.title")}
                  </CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">
                      {t("pricing.business.price")}
                    </span>
                    <span className="text-muted-foreground">
                      {t("pricing.business.period")}
                    </span>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {t("pricing.business.description")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.business.feature1")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.business.feature2")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.business.feature3")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {t("pricing.business.feature4")}
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth">{t("pricing.business.button")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-xl">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 text-lg"
                  asChild
                >
                  <Link href="/auth">
                    <Zap className="mr-2 h-5 w-5" />
                    {t("cta.button1")}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 text-lg"
                >
                  {t("cta.button2")}
                </Button>
              </div>
              <p className="text-primary-foreground/70 mt-6 text-sm">
                {t("cta.guarantee")}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background border-t">
          <div className="container mx-auto py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <div className="mb-4 flex items-center space-x-2">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <Globe className="text-primary-foreground h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">Brasilink</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("footer.description")}
                </p>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">{t("footer.product")}</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>
                    <a
                      href="#recursos"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.resources")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#precos"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.pricing")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.documentation")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.api")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">{t("footer.support")}</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.helpCenter")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.contact")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.status")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.community")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">{t("footer.legal")}</h4>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.privacy")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.terms")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.cookies")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {t("footer.lgpd")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="text-muted-foreground text-sm">
                {t("footer.copyright")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t("footer.madeWith")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
}
