"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client"; // Adjust the import path as necessary

import { Button } from "./ui/button";
import { CardContent } from "./ui/card";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Por favor, insira um email válido.",
    })
    .refine((value) => value.length <= 255, {
      message: "Email não pode ter mais de 255 caracteres.",
    }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const supabase = await createClient();
    try {
      const { data: dataResponse, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (error) {
        throw error;
      }

      const user = dataResponse.user;

      toast.success(`Login realizado com sucesso! Bem-vindo, ${user?.email}`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        `Erro ao fazer login: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `http://localhost:3000/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
        throw error;
      }
      if (data.url) {
        toast.success("Login com Google realizado com sucesso!");
      }
    } catch (error) {
      toast.error(`Login com Google falhou. ${error}`);
    }
  };
  return (
    <>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full font-bold text-white">Entrar</Button>
          </form>
        </Form>
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full font-bold text-white"
          variant={"outline"}
        >
          <GoogleLogoIcon size={32} weight="bold" color="#bb2a2a" />
          Login com Google
        </Button>
      </CardContent>
    </>
  );
}
