"use client";

import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// SVG personalizado para 404
const NotFoundSVG = () => (
  <svg
    width="200"
    height="120"
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    {/* Número 4 */}
    <path
      d="M20 20 L20 60 L40 60 L40 20 L40 80 M20 60 L50 60"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    />

    {/* Número 0 */}
    <ellipse
      cx="75"
      cy="50"
      rx="20"
      ry="30"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      className="text-muted-foreground"
    />

    {/* Número 4 */}
    <path
      d="M120 20 L120 60 L140 60 L140 20 L140 80 M120 60 L150 60"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    />

    {/* Elementos decorativos */}
    <circle
      cx="170"
      cy="30"
      r="3"
      fill="currentColor"
      className="text-accent"
    />
    <circle
      cx="180"
      cy="45"
      r="2"
      fill="currentColor"
      className="text-accent"
    />
    <circle
      cx="165"
      cy="60"
      r="2"
      fill="currentColor"
      className="text-accent"
    />

    {/* Linha ondulada no fundo */}
    <path
      d="M10 100 Q30 90 50 100 T90 100 T130 100 T170 100"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      className="text-border opacity-50"
    />
  </svg>
);

export function NotFoundCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <NotFoundSVG />
        <CardTitle className="mt-4 text-3xl font-bold">
          Página não encontrada
        </CardTitle>
        <CardDescription className="text-base">
          Ops! A página que você está procurando não existe ou foi movida para
          outro lugar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center text-sm">
          Verifique se o endereço foi digitado corretamente ou navegue para uma
          das páginas abaixo.
        </p>
        <div className="flex flex-col gap-2">
          <Button className="w-full font-bold" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Página Inicial
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full font-bold"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-center text-sm">
        <p className="mx-auto">
          Se você acredita que isso é um erro, entre em contato com nosso
          suporte.
        </p>
      </CardFooter>
    </Card>
  );
}
