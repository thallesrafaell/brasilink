"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
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

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email." })
      .max(255, { message: "Email cannot have more than 255 characters." }),
    password: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Password must be at least 6 characters.",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Confirmation password must be at least 6 characters.",
      }),
    my_profile_image_url: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    { message: "Passwords do not match.", path: ["confirmPassword"] }
  );

interface UserSettingsFormProps {
  userMetadata: {
    avatar_url?: string;
    email?: string;
    full_name?: string;
    name?: string;
    picture?: string;
    provider?: string;
    my_profile_image_url?: string;
  };
}

const UserSettingsForm = ({ userMetadata }: UserSettingsFormProps) => {
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      // Inicialize com a imagem atual do usuário do Supabase
      my_profile_image_url:
        userMetadata.my_profile_image_url ||
        userMetadata.avatar_url ||
        userMetadata.picture ||
        "",
    },
  });

  useEffect(() => {
    if (userMetadata) {
      form.reset({
        name: userMetadata.name || "",
        email: userMetadata.email || "",
        password: "",
        confirmPassword: "",
        my_profile_image_url:
          userMetadata.my_profile_image_url ||
          userMetadata.avatar_url ||
          userMetadata.picture ||
          "",
      });
      setSelectedAvatarFile(null);
      setLocalPreviewUrl(null);
    }
  }, [userMetadata, form]);

  const currentAvatarUrlToDisplay =
    localPreviewUrl || form.watch("my_profile_image_url");

  const performUpload = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const fileName = `${uuid()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("brasilink")
      .upload(`avatars/${fileName}`, file);

    if (error) {
      toast.error(
        `Error uploading avatar: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return null;
    }

    const avatarPath = data?.path;
    if (avatarPath) {
      const avatarUrl = supabase.storage
        .from("brasilink")
        .getPublicUrl(avatarPath).data.publicUrl;
      return avatarUrl;
    }
    return null;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form data submitted:", data);
    const supabase = createClient();
    let finalAvatarUrl = data.my_profile_image_url;
    try {
      if (selectedAvatarFile) {
        toast.info("Uploading avatar...");
        const uploadedUrl = await performUpload(selectedAvatarFile);
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
        } else {
          toast.error("Avatar upload failed. Please try again.");
          return;
        }
      }

      const updatePayload: Parameters<typeof supabase.auth.updateUser>[0] = {
        data: {
          name: data.name,
          email: data.email,
          my_profile_image_url: finalAvatarUrl,
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

      toast.success("Account updated successfully!");
      console.log("User data updated:", updateData);
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      toast.error(
        `Error updating account: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      form.reset({
        name: data.name,
        email: data.email,
        password: "",
        confirmPassword: "",
        my_profile_image_url: finalAvatarUrl || "",
      });
      setSelectedAvatarFile(null);
      setLocalPreviewUrl(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatarFile(file);
      setLocalPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedAvatarFile(null);
      setLocalPreviewUrl(null);
    }
  };

  const isGoogleUser = userMetadata.provider === "google";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.error("Form submission error:", error);
            })}
            className="mx-auto max-w-md space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="group relative">
                <Avatar
                  className={`h-24 w-24 ${currentAvatarUrlToDisplay ? "" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  {currentAvatarUrlToDisplay ? (
                    <AvatarImage
                      src={currentAvatarUrlToDisplay}
                      alt={userMetadata.name || "User Avatar"}
                    />
                  ) : null}
                  <AvatarFallback>
                    {userMetadata.name ? (
                      userMetadata.name.substring(0, 2).toUpperCase()
                    ) : (
                      <User2Icon className="h-6 w-6" />
                    )}
                  </AvatarFallback>

                  {/* Overlay hover effect */}
                  <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">
                      Change photo
                    </span>
                  </div>
                </Avatar>
              </div>

              <div className="flex flex-col items-center gap-2">
                <FormControl>
                  <div className="relative">
                    <Input
                      id="avatar-upload"
                      className="absolute hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-sm"
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                    >
                      {selectedAvatarFile ? "Change image" : "Choose image"}
                    </Button>
                  </div>
                </FormControl>

                {selectedAvatarFile && (
                  <span className="text-muted-foreground mt-1 text-center text-xs">
                    {selectedAvatarFile.name.length > 25
                      ? `${selectedAvatarFile.name.substring(0, 22)}...`
                      : selectedAvatarFile.name}
                  </span>
                )}
              </div>
            </div>

            {!isGoogleUser ? (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type your name"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  Users with Google accounts cannot change their email or
                  password here. Please update your account information directly
                  in your Google account settings.
                </p>
              </div>
            )}

            <Button className="w-full font-bold text-white" type="submit">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserSettingsForm;
