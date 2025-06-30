"use server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { EditServiceSchema } from "./schemas";

const editService = async (data: EditServiceSchema) => {
  const supabase = await createClient();
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await db.services.update({
      where: {
        id: data.id,
        userId,
      },
      data,
    });
  } catch (error) {
    console.error("Error editing service:", error);
    throw new Error(
      `Failed to edit service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
  revalidatePath("/services");
};

export default editService;
