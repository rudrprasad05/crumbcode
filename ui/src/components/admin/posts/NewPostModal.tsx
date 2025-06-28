"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const selVal = ["cake", "services", "allergen", "category"];

export default function NewPostModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTypeError, setSelectedTypeError] = useState<
    string | undefined
  >("");

  function handleClick() {
    if (!selectedType) setSelectedTypeError("Select type first");
    else router.push("/admin/posts/create?type=" + selectedType);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Post Type</DialogTitle>
          <DialogDescription>
            Select the type of post you want to create
          </DialogDescription>
        </DialogHeader>
        <Select
          value={selectedType}
          onValueChange={(val) => setSelectedType(val)}
        >
          <SelectTrigger id="typeSelect" className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {selVal.map((i) => (
              <SelectItem value={i}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="text-sm text-rose-500">{selectedTypeError}</Label>
        <Button onClick={handleClick}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
