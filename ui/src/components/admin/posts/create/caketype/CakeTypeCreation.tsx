"use client";

import { Badge } from "@/components/ui/badge";
import { useCake } from "@/context/CakeContext";
import { useCakeType } from "@/context/CakeTypeContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CakeTypeCreation() {
  const { data } = useCakeType();
  return (
    <Badge className={cn(`text-white bg-${data.color}`)}>{data.name}</Badge>
  );
}
