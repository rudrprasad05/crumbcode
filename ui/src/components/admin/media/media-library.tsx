"use client";

import { Media } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MediaGrid } from "./media-grid";
import { MediaHeader } from "./media-header";

export function MediaLibrary({ mediaItemsData }: { mediaItemsData: Media[] }) {
  const [mediaItems, setMediaItems] = useState<Media[]>(mediaItemsData);
  const [filteredItems, setFilteredItems] = useState<Media[]>(mediaItemsData);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterItems(query, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterItems(searchQuery, type);
  };

  const filterItems = (query: string, type: string) => {
    let filtered = mediaItems;

    if (query) {
      filtered = filtered.filter(
        (item) =>
          item.fileName.toLowerCase().includes(query.toLowerCase()) ||
          item.altText?.toLowerCase().includes(query.toLowerCase()) ||
          item.contentType?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((item) => item.contentType === type);
    }

    setFilteredItems(filtered);
  };

  const handleDelete = (id: number) => {
    const updatedItems = mediaItems.filter((item) => item.id !== id);
    setMediaItems(updatedItems);
    filterItems(searchQuery, selectedType);
  };

  return (
    <div className="space-y-6">
      <MediaHeader
        onUpload={() => setIsUploadModalOpen(true)}
        onSearch={handleSearch}
        onFilter={handleTypeFilter}
        selectedType={selectedType}
        totalItems={filteredItems.length}
      />

      <MediaGrid items={filteredItems} onDelete={handleDelete} />
    </div>
  );
}
