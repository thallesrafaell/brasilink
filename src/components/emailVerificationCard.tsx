// src/components/email-verification-card.tsx
"use client"; // Este será um Client Component

import { Mail, ArrowRight, LogInIcon } from "lucide-react"; // Ícones da lucide-react para o card e botões
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

export function EmailVerificationCard() {
  const handleOpenGmail = () => {
    window.open("https://mail.google.com/", "_blank");
  };

  const handleOpenOutlook = () => {
    window.open("https://outlook.live.com/mail/", "_blank");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Mail className="text-primary mx-auto h-12 w-12" />{" "}
        {/* Ícone de e-mail centralizado */}
        <CardTitle className="mt-4 text-2xl">Verifique seu E-mail</CardTitle>
        <CardDescription>
          Enviamos um link de verificação para o seu endereço de e-mail. Por
          favor, clique no link para ativar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center text-sm">
          Verifique também sua caixa de SPAM.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full font-bold text-white"
            onClick={handleOpenGmail}
          >
            Abrir Gmail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            className="w-full font-bold text-white"
            onClick={handleOpenOutlook}
          >
            Abrir Outlook <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground flex flex-col gap-2 text-center text-sm">
        <Button
          variant="link"
          className="text-primary font-bold hover:underline"
          asChild
        >
          <Link href="/auth">
            <LogInIcon className="mr-2 h-4 w-4" />
            Login
          </Link>
        </Button>
        <p className="mx-auto">
          Não recebeu o e-mail? Verifique sua caixa de SPAM ou tente se
          cadastrar novamente.
        </p>
      </CardFooter>
    </Card>
  );
}
