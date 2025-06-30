"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import deleteService from "@/actions/services/deleteService";
import { DeleteServiceSchema } from "@/actions/services/schemas";
import { Button } from "@/components/ui/button";
import { Services } from "@/generated/prisma";
import { formatCurrency, formatDate } from "@/utils/format";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const handleDeleteService = async (data: DeleteServiceSchema) => {
  try {
    await deleteService(data);
    toast.success("Service deleted successfully!");
  } catch (error) {
    toast.error(
      `Error deleting service: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    console.error("Error deleting service:", error);
    throw new Error("Error deleting service");
  }
};
export const serviceColumns: ColumnDef<Services>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      return <div>{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = Number(row.getValue("duration"));
      return <div>{`${duration} minutes`}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return <div>{formatDate(createdAt)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      return <div>{formatDate(updatedAt)}</div>;
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="gap-2 text-red-500 hover:bg-red-800"
            onClick={() => handleDeleteService({ id: row.original.id })}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
