import { GallerySection } from "@/components/gallery/GallerySection";
import React from "react";

export default function page() {
  return (
    <div className="space-y-6 py-12 px-18">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CrumbCode Gallery</h1>
        <p className="text-gray-600 mt-2">
          A collection of memories, cakes and events from crumbcode
        </p>
      </div>

      <GallerySection />
    </div>
  );
}
