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
      message: "Please enter a valid email.",
    })
    .refine((value) => value.length <= 255, {
      message: "Email cannot have more than 255 characters.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
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
      toast.success(`Login successful! Welcome, ${user?.email}`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        `Login error: ${
          error instanceof Error ? error.message : "Unknown error"
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
          redirectTo: "http://localhost:3000/auth/callback?next=/dashboard",
        },
      });

      if (error) {
        throw error;
      }
      if (data.url) {
        toast.success("Google login successful!");
      }
    } catch (error) {
      toast.error(`Google login failed. ${error}`);
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
                      placeholder="Enter your email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full font-bold text-white">Login</Button>
          </form>
        </Form>
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full font-bold"
          variant={"outline"}
        >
          <GoogleLogoIcon size={32} weight="bold" color="#bb2a2a" />
          Login with Google
        </Button>
      </CardContent>
    </>
  );
}
