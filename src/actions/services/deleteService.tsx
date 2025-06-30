"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { deleteServiceSchema, DeleteServiceSchema } from "./schemas";

const deleteService = async (data: DeleteServiceSchema) => {
  deleteServiceSchema.parse(data);

  const supabase = await createClient();
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    await db.services.delete({
      where: {
        id: data.id,
        userId,
      },
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    throw new Error("Error deleting service");
  }

  revalidatePath(`/services`);
};

export default deleteService;
