"use client";

import { Badge } from "@/components/ui/badge";
import { useCake } from "@/context/CakeContext";
import { useCakeType } from "@/context/CakeTypeContext";
import { cn } from "@/lib/utils";
import { CakeTypeColorClasses } from "@/types";

export default function CakeTypeCreation() {
  const { data } = useCakeType();
  return (
    <Badge
      className={cn("text-white", CakeTypeColorClasses[data.color as string])}
    >
      {data.name}
    </Badge>
  );
}
