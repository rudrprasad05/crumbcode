"use client";

import { GetMediaSite } from "@/actions/Site";
import { Media, MetaData, QueryObject } from "@/types";
import { useEffect, useState } from "react";
import PaginationSection from "@/components/global/PaginationSection";
import { MediaGrid } from "./MediaGrid";
import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTE_CACHE } from "@/lib/const";
import { LoadingCard } from "../global/LoadingContainer";
import NoDataContainer from "../global/NoDataContainer";

export function GallerySection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const query = useQuery({
    queryKey: ["site-gallery", pagination],
    queryFn: () => GetMediaSite({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });
  if (query.isError) {
    return <div className="text-red-500">Error loading cakes.</div>;
  }

  const data = query.data?.data ?? [];
  const meta = query.data?.meta;

  console.log(data);

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (data.length == 0) {
    return <NoDataContainer />;
  }

  return (
    <div className="space-y-6">
      <MediaGrid items={data} />
      <PaginationSection
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
