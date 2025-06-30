import z from "zod";

export const addServiceSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid positive number.",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Duration must be a valid positive number.",
  }),
});

export type AddServiceSchema = z.infer<typeof addServiceSchema>;

export const deleteServiceSchema = z.object({
  id: z.string().uuid("Invalid service ID format."),
});

export type DeleteServiceSchema = z.infer<typeof deleteServiceSchema>;

export const editServiceSchema = z.object({
  id: z.string().uuid("Invalid service ID format."),
  name: z
    .string()
    .min(2, {
      message: "Service name must be at least 2 characters.",
    })
    .optional(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
  price: z
    .number()
    .min(0, {
      message: "Price must be a valid positive number.",
    })
    .optional(),
  duration: z
    .number()
    .min(0, {
      message: "Duration must be a valid positive number.",
    })
    .optional(),
});

export type EditServiceSchema = z.infer<typeof editServiceSchema>;
