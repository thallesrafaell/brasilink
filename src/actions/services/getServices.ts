"use server";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

const getServices = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const services = await db.services.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return services;
};
export default getServices;
