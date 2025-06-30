"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { addServiceSchema, AddServiceSchema } from "./schemas";

const addService = async (data: AddServiceSchema) => {
  addServiceSchema.parse(data);
  const supabase = await createClient();
  const user = supabase.auth.getUser();

  const userId = (await user).data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await db.services.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        duration: Number(data.duration),
        userId: userId,
      },
    });
    revalidatePath("/services");
  } catch (error) {
    console.error("Error adding service:", error);
    throw new Error(
      `Failed to add service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export default addService;
