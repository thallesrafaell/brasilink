"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

import { CardContent } from "./ui/card";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório." }),
    email: z
      .string()
      .email({ message: "Por favor, insira um email válido." })
      .max(255, { message: "Email não pode ter mais de 255 caracteres." }),
    password: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Confirmação de senha deve ter pelo menos 6 caracteres.",
      }),
  })
  .refine(
    (data) => {
      // Se senha e confirmação vazias, ok
      if (!data.password && !data.confirmPassword) return true;
      // Senhas precisam ser iguais
      return data.password === data.confirmPassword;
    },
    { message: "As senhas não coincidem.", path: ["confirmPassword"] }
  );

interface UserSettingsFormProps {
  userMetadata: {
    avatar_url?: string;
    email?: string;
    full_name?: string;
    name?: string;
    picture?: string;
    provider?: string;
  };
}

const UserSettingsForm = ({ userMetadata }: UserSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userMetadata.name || "",
      email: userMetadata.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form data submitted:", data);
    const supabase = await createClient();
    try {
      const updatePayload: Parameters<typeof supabase.auth.updateUser>[0] = {
        data: {
          name: data.name,
          email: data.email,
        },
      };

      if (data.password) {
        updatePayload.password = data.password;
      }

      const { data: updateData, error } =
        await supabase.auth.updateUser(updatePayload);

      if (error) {
        throw error;
      }

      toast.success("Conta atualizada com sucesso!");
      console.log("User data updated:", updateData);
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      toast.error(
        `Erro ao atualizar conta: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      // Reset the form after submission
      form.reset({
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
      });
    }
  };

  const isGoogleUser = userMetadata.provider === "google";

  return (
    <CardContent className="grid gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.error("Form submission error:", error);
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isGoogleUser ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your email"
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
                disabled={userMetadata.provider === "google"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Typing your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                disabled={userMetadata.provider === "google"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                Users with Google accounts cannot change their email or password
                here. Please update your account information directly in your
                Google account settings.
              </p>
            </div>
          )}

          <Button className="w-full font-bold text-white" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default UserSettingsForm;
