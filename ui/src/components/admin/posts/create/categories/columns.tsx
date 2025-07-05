"use client";

import { CakeType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CakeType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
];
