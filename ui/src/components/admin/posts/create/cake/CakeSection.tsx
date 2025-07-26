"use client";

import { GetAllCakes } from "@/actions/Cake";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Cake, CakeTypeColorClasses, ESortBy, Media, MetaData } from "@/types";
import { FileText, ImageIcon, Plus, Search, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICakeTypesSection {
  data: Cake[];
  isLoading: boolean;
}

interface Filters {
  search: string;
  isAvailable?: boolean;
  sortBy?: ESortBy;
}

export default function CakeSection() {
  const [cakeItems, setCakeItems] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const [filters, setFilters] = useState<Filters>({
    sortBy: ESortBy.DSC,
    search: "",
    isAvailable: undefined,
  });

  useEffect(() => {
    setCakeItems([]);
    console.log(filters);
    // return;
    const getData = async () => {
      const data = await GetAllCakes({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        sortBy: filters.sortBy,
      });

      setCakeItems(data.data as Cake[]);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.meta?.totalCount as number,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));

      setLoading(false);
    };
    getData();
  }, [pagination.pageNumber, pagination.pageSize, filters]);

  return (
    <div>
      <Header filters={filters} onChange={setFilters} />
      <HandleDataSection isLoading={loading} data={cakeItems} />
      <div className="py-8">
        <PaginationSection
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}

function Header({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (newFilters: Filters) => void;
}) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cakes</h1>
        <p className="text-gray-600 mt-2">Create and manage your cakes here</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search cakes..."
              className="pl-10 bg-white border-gray-200"
              value={filters.search || ""}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
            />
          </div>

          <Select
            value={String(filters.sortBy) || "DSC"}
            onValueChange={(val) =>
              onChange({ ...filters, sortBy: val as unknown as ESortBy })
            }
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DSC">Newest</SelectItem>
              <SelectItem value="ASC">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={String(filters.isAvailable || "all")}
            onValueChange={(val) =>
              onChange({ ...filters, isAvailable: val as unknown as boolean })
            }
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href={"/admin/cakes/create"}>
          <div
            className={`${buttonVariants({
              variant: "default",
            })} w-full text-start justify-start px-2 my-2`}
          >
            <Plus />
            New Cake
          </div>
        </Link>
      </div>
    </>
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
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
            {!isImageLoaded && (
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover bg-gray-300 animate-pulse"
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
          <Link
            href={`/admin/cakes/edit/${data.uuid}`}
            className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
          >
            Edit
          </Link>
          <Badge
            className={cn(
              "text-white",
              CakeTypeColorClasses[data.cakeType?.color as string]
            )}
          >
            {data.cakeType?.name || "no tag"}
          </Badge>
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
