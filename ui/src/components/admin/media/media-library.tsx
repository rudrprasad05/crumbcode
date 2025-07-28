"use client";

import { GetMedia } from "@/actions/Media";
import { Media, MetaData } from "@/types";
import { useEffect, useState } from "react";
import { MediaGrid } from "./media-grid";
import { MediaHeader } from "./media-header";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import PaginationSection from "@/components/global/PaginationSection";

export function MediaLibrary() {
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
      const data = await GetMedia({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
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

  const handleDelete = (id: number) => {
    const updatedItems = mediaItems.filter((item) => item.id !== id);
    setMediaItems(updatedItems);
  };

  return (
    <div className="space-y-6">
      <MediaHeader />
      <MediaGrid items={mediaItems} onDelete={handleDelete} />
      <PaginationSection
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
