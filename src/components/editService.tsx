"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import editService from "@/actions/services/editservice";
import {
  editServiceSchema,
  EditServiceSchema,
} from "@/actions/services/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CurrencyInput, DurationInput } from "./ui/formatted-inputs";
import { Textarea } from "./ui/textarea";

export function EditServiceDialog(data: EditServiceSchema) {
  const [open, setOpen] = useState(false);

  const form = useForm<EditServiceSchema>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      price:
        typeof data.price === "string" ? parseFloat(data.price) : data.price,
      duration:
        typeof data.duration === "string"
          ? parseFloat(data.duration)
          : data.duration,
    },
  });

  const onSubmit = async (formData: EditServiceSchema) => {
    try {
      await editService(formData);
      toast.success("Service updated successfully!");
      setOpen(false); // Fecha o dialog
    } catch (error) {
      toast.error(
        `Error updating service: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Make changes to your service here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter service name" {...field} />
                    </FormControl>
                    <FormDescription>The name of your service.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a detailed description of your service"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of your service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="$ 0,00"
                      />
                    </FormControl>
                    <FormDescription>
                      The price of your service in your local currency.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <DurationInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="0"
                        unit="hours"
                      />
                    </FormControl>
                    <FormDescription>
                      The duration of your service in hours (e.g., 1.5 for 1
                      hour and 30 minutes).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-6 w-full p-0">
                <Button
                  type="submit"
                  className="w-full font-bold text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Service
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
