import { LoadingCard } from "@/components/global/LoadingContainer";
import { Media } from "@/types";
import { MediaCard } from "./media-card";

interface MediaGridProps {
  items: Media[] | undefined;
  onDelete: (id: number) => void;
}

export function MediaGrid({ items, onDelete }: MediaGridProps) {
  if (items?.length === 0 || !items)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <LoadingCard />
        ))}
      </div>
    );

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
