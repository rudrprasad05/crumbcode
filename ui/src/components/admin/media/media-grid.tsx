import { LoadingCard } from "@/components/global/LoadingContainer";
import { Media } from "@/types";
import { MediaCard } from "./media-card";

interface MediaGridProps {
  items: Media[];
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
