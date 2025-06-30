"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DeleteServiceButton } from "@/components/deleteServiceButton";
import { EditServiceDialog } from "@/components/editService";
import { Services } from "@/generated/prisma";
import { formatCurrency, formatDate } from "@/utils/format";

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

      if (duration % 1 === 0) {
        return <div>{`${duration}h`}</div>;
      }

      const hours = Math.floor(duration);
      const minutes = Math.round((duration - hours) * 60);

      if (hours > 0 && minutes > 0) {
        return <div>{`${hours}h ${minutes}min`}</div>;
      } else if (hours > 0) {
        return <div>{`${hours}h`}</div>;
      } else {
        return <div>{`${minutes}min`}</div>;
      }
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
          <EditServiceDialog
            id={row.original.id}
            name={row.original.name}
            description={row.original.description}
            price={Number(row.original.price)}
            duration={row.original.duration}
          />
          <DeleteServiceButton id={row.original.id} />
        </div>
      );
    },
  },
];
