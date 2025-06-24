import { Media } from "@/types";
import { MediaCard } from "./media-card";

interface MediaGridProps {
  items: Media[];
  onDelete: (id: number) => void;
}

export function MediaGrid({ items, onDelete }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No media files found</div>
        <div className="text-gray-500 text-sm">
          Try adjusting your search or filter criteria
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
}
