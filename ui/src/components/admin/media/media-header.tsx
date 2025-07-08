"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Box, CloudUpload, Search } from "lucide-react";
import NewMediaModal from "./NewMediaModal";

interface MediaHeaderProps {
  onUpload: () => void;
  totalItems: number;
}

export function MediaHeader({ onUpload, totalItems }: MediaHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media files..."
            className="pl-10 bg-white border-gray-200"
          />
        </div>
      </div>

      <NewMediaModal>
        <div
          className={`${buttonVariants({
            variant: "default",
          })} w-full text-start justify-start px-2 my-2`}
        >
          <CloudUpload />
          Upload
        </div>
      </NewMediaModal>
    </div>
  );
}
