"use client";

import { GetAllCakes, RestoreCake } from "@/actions/Cake";
import Header from "@/components/global/header";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { cn } from "@/lib/utils";
import { Cake, MetaData, ESortBy, CakeTypeColorClasses, Media } from "@/types";
import { Badge, FileText, ImageIcon, RefreshCcw, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RestoreButton } from "./RestoreButton";

interface Filters {
  search: string;
  isAvailable?: boolean;
  sortBy?: ESortBy;
}

interface ICakeTypesSection {
  data: Cake[];
  isLoading: boolean;
}

interface Props {
  cakes: Cake[];
  setCakes: React.Dispatch<React.SetStateAction<Cake[]>>;
}

export function BinCakeSection({ cakes, setCakes }: Props) {
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const getData = async () => {
    const data = await GetAllCakes({
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize,
      sortBy: ESortBy.DSC,
      isDeleted: true,
    });

    setCakes(data.data as Cake[]);
    setPagination((prev) => ({
      ...prev,
      totalCount: data.meta?.totalCount as number,
      totalPages: Math.ceil(
        (data.meta?.totalCount as number) / pagination.pageSize,
      ),
    }));

    setLoading(false);
  };

  useEffect(() => {
    setCakes([]);

    getData();
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <div>
      <HandleDataSection isLoading={loading} data={cakes} />
      <div className="py-8">
        {/* <PaginationSection
          pagination={pagination}
          setPagination={setPagination}
        /> */}
      </div>
    </div>
  );
}

function CakeCard({ data }: { data: Cake }) {
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const getTypeIcon = (item: Media) => {
    const type = item.contentType;

    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (type.startsWith("video/")) {
      return <Video className="h-4 w-4" />;
    } else if (type.startsWith("application/") || type.startsWith("text/")) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };
  return (
    <div
      key={data.uuid}
      className="bg-white flex flex-col rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative aspect-square h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        {isImageValid ? (
          <>
            <Image
              width={100}
              height={100}
              src={data.media?.url || "/image.svg"}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                setIsImageValid(false);
              }}
              onLoad={() => setIsImageLoaded(true)}
              alt={(data.media?.altText || data.media?.fileName) as string}
              className={cn(
                "w-full h-full object-cover",
                isImageLoaded ? "opacity-100" : "opacity-0",
              )}
            />
            {!isImageLoaded && (
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover bg-gray-300 animate-pulse",
                )}
              ></div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            {getTypeIcon(data.media as Media)}
          </div>
        )}
      </div>
      <div className="p-4 flex-1/2 flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {data.name as string}
          </h3>
          <div className="text-xs text-rose-600 font-bold">
            {"$" + data.price}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{data.description as string}</p>
        <div className="mt-auto flex justify-between items-center">
          <RestoreButton uuid={data.uuid} onDelete={RestoreCake} />
        </div>
      </div>
    </div>
  );
}

function HandleDataSection({ data, isLoading }: ICakeTypesSection) {
  if (data.length === 0 && !isLoading) {
    return <NoDataContainer />;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
        {Array.from({ length: 8 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
      {data.map((i) => (
        <CakeCard data={i} key={i.uuid} />
      ))}
    </div>
  );
}
