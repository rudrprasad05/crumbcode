import { LoadingCard } from "@/components/global/LoadingContainer";
import { Media } from "@/types";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  items: Media[] | undefined;
}

export function MediaGrid({ items }: MediaGridProps) {
  if (items?.length === 0 || !items)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
