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
import { CloudUpload, Filter, Search } from "lucide-react";
import NewMediaModal from "./NewMediaModal";

interface MediaHeaderProps {
  onUpload: () => void;
  onSearch: (query: string) => void;
  onFilter: (type: string) => void;
  selectedType: string;
  totalItems: number;
}

export function MediaHeader({
  onUpload,
  onSearch,
  onFilter,
  selectedType,
  totalItems,
}: MediaHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search media files..."
            className="pl-10 bg-white border-gray-200"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select value={selectedType} onValueChange={onFilter}>
          <SelectTrigger className="w-40 bg-white border-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
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
