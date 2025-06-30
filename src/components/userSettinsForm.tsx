"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
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
    avatar_url: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) return true;
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar_url: userMetadata.avatar_url || "",
    },
  });

  // Atualiza os valores do form quando userMetadata estiver disponível
  useEffect(() => {
    if (userMetadata) {
      form.reset({
        name: userMetadata.name || "",
        email: userMetadata.email || "",
        password: "",
        confirmPassword: "",
        avatar_url: userMetadata.avatar_url || "",
      });
    }
  }, [userMetadata, form]);

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
      form.reset({
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
        avatar_url: data.avatar_url || "",
      });
    }
  };

  const uploadAvatar = async (file: File) => {
    const supabase = createClient();

    const fileName = `${uuid()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("brasilink")
      .upload(`avatars/${fileName}`, file);

    if (error) {
      toast.error(
        `Erro ao fazer upload do avatar: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
      return;
    }

    const avatarPath = data?.path;

    if (avatarPath) {
      const avatarUrl = supabase.storage
        .from("brasilink")
        .getPublicUrl(avatarPath).data.publicUrl;
      form.setValue("avatar_url", avatarUrl);
    }
    toast.success("Avatar atualizado com sucesso!");
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
          <FormControl>
            <Input
              placeholder="Upload your avatar"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const avatarFile = e.target.files?.[0];
                if (avatarFile) {
                  uploadAvatar(avatarFile);
                  // Limpa o input para permitir upload do mesmo arquivo se quiser
                  e.target.value = "";
                }
              }}
            />
          </FormControl>

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
