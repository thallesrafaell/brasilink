"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Services } from "@/generated/prisma";
import { formatCurrency, formatDate } from "@/utils/format";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
    cell: () => {
      return (
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="gap-2 text-red-500 hover:bg-red-800"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
