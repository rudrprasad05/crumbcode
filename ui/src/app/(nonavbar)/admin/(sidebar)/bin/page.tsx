"use client";

import { BinCakeSection } from "@/components/admin/bin/BinCakeSection";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Cake } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function PostsPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [cakes, setCakes] = useState<Cake[]>([]);
  return (
    <div className="space-y-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-full flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="text-sm font-semibold">Cakes</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <BinCakeSection cakes={cakes} setCakes={setCakes} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
