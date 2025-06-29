"use client";

import { useState } from "react";
import { PostsHeader } from "./posts-header";

interface IPostManager {}

export function PostsManager() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  return (
    <div className="space-y-6">
      <PostsHeader />
    </div>
  );
}
