"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import addService from "@/actions/services/addService";
import { AddServiceSchema, addServiceSchema } from "@/actions/services/schemas";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = addServiceSchema;

export function AddServiceSheet() {
  const [open, setOpen] = useState(false);

  const form = useForm<AddServiceSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
    },
  });

  const onSubmit = async (data: AddServiceSchema) => {
    try {
      await addService(data);
      toast.success("Service added successfully!");
      form.reset(); // Limpa o formulário
      setOpen(false); // Fecha o Sheet
    } catch (error) {
      toast.error(
        `Error adding service: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="font-bold dark:text-white">
          <PlusIcon className="font-bold" />
          Add Service
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Service</SheetTitle>
          <SheetDescription>
            Make changes to your service here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
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
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
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
                    <Input
                      placeholder="Enter duration (e.g. 1 hour)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The duration of your service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-6 w-full p-0">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
              </SheetClose>
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
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
