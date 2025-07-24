"use client";

import { GetMediaSite } from "@/actions/Site";
import { Media, MetaData } from "@/types";
import { useEffect, useState } from "react";
import PaginationSection from "@/components/global/PaginationSection";
import { MediaGrid } from "./MediaGrid";

export function GallerySection() {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 1,
    pageSize: 10,
    totalPages: 0,
  });

  useEffect(() => {
    setMediaItems([]);
    const getData = async () => {
      const data = await GetMediaSite({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        showInGallery: true,
      });

      setMediaItems(data.data as Media[]);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));

      //   setLoading(false);
    };
    getData();
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <div className="space-y-6">
      <MediaGrid items={mediaItems} />
      <PaginationSection
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
