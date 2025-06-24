"use client";

import { useState } from "react";
import { MediaHeader } from "./media-header";
import { MediaGrid } from "./media-grid";
import { UploadModal } from "./upload-modal";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: number;
  alt?: string;
  caption?: string;
  uploadedAt: Date;
  dimensions?: {
    width: number;
    height: number;
  };
}

// Mock data for demonstration
const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    name: "chocolate-cake.jpg",
    url: "/placeholder.svg?height=300&width=300",
    type: "image",
    size: 245760,
    alt: "Delicious chocolate cake with berries",
    caption: "Our signature chocolate cake",
    uploadedAt: new Date("2024-01-15"),
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "2",
    name: "vanilla-cupcakes.jpg",
    url: "https://bucket.procyonfiji.com/procyon/cc-pop-5.png",
    type: "image",
    size: 189440,
    alt: "Vanilla cupcakes with frosting",
    uploadedAt: new Date("2024-01-14"),
    dimensions: { width: 800, height: 600 },
  },
  {
    id: "3",
    name: "bakery-video.mp4",
    url: "/placeholder.svg?height=300&width=300",
    type: "video",
    size: 15728640,
    alt: "Behind the scenes bakery video",
    uploadedAt: new Date("2024-01-13"),
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "4",
    name: "menu-2024.pdf",
    url: "/placeholder.svg?height=300&width=300",
    type: "document",
    size: 524288,
    uploadedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    name: "wedding-cake.jpg",
    url: "/placeholder.svg?height=300&width=300",
    type: "image",
    size: 367616,
    alt: "Three-tier wedding cake",
    caption: "Custom wedding cake design",
    uploadedAt: new Date("2024-01-11"),
    dimensions: { width: 1000, height: 1200 },
  },
  {
    id: "6",
    name: "birthday-setup.jpg",
    url: "/placeholder.svg?height=300&width=300",
    type: "image",
    size: 298752,
    alt: "Birthday party cake setup",
    uploadedAt: new Date("2024-01-10"),
    dimensions: { width: 1400, height: 900 },
  },
];

export function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [filteredItems, setFilteredItems] =
    useState<MediaItem[]>(mockMediaItems);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

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
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.alt?.toLowerCase().includes(query.toLowerCase()) ||
          item.caption?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((item) => item.type === type);
    }

    setFilteredItems(filtered);
  };

  const handleUpload = (newItem: Omit<MediaItem, "id" | "uploadedAt">) => {
    const mediaItem: MediaItem = {
      ...newItem,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    };

    const updatedItems = [mediaItem, ...mediaItems];
    setMediaItems(updatedItems);
    setFilteredItems(updatedItems);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
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

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
