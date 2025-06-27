"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import NewPostModal from "./NewPostModal";

interface PostsHeaderProps {
  onCreatePost: () => void;
  onSearch: (query: string) => void;
  onTypeFilter: (type: string) => void;
  onStatusFilter: (status: string) => void;
  selectedType: string;
  selectedStatus: string;
  totalPosts: number;
}

export function PostsHeader({
  onCreatePost,
  onSearch,
  onTypeFilter,
  onStatusFilter,
  selectedType,
  selectedStatus,
  totalPosts,
}: PostsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            className="pl-10 bg-white border-gray-200"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select value={selectedType} onValueChange={onTypeFilter}>
          <SelectTrigger className="w-32 bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="cake">Cakes</SelectItem>
            <SelectItem value="feature">Features</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusFilter}>
          <SelectTrigger className="w-32 bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <NewPostModal>
        <div
          className={`${buttonVariants({
            variant: "default",
          })} w-full text-start justify-start px-2 my-2`}
        >
          <Plus />
          Create Post
        </div>
      </NewPostModal>
    </div>
  );
}
