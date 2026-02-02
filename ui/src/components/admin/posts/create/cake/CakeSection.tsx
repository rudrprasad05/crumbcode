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
import {
  ApiResponse,
  Cake,
  CakeTypeColorClasses,
  ESortBy,
  Media,
  MetaData,
  QueryObject,
  UserRoles,
} from "@/types";
import { FileText, ImageIcon, Plus, Search, Video } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTypeIcon } from "@/lib/icon-parse";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FIVE_MINUTE_CACHE } from "@/lib/const";
import { SectionHeader } from "@/components/global/SectionHeader";
import { RoleWrapper } from "@/components/global/RoleWrapper";
import { H1, P } from "@/components/font/HeaderFonts";

export default function CakeSection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const query = useQuery({
    queryKey: ["admin-cake", pagination],
    queryFn: () => GetAllCakes({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  return (
    <>
      <SectionHeader
        pagination={pagination}
        setPagination={setPagination}
        newButton={<NewProjectButton />}
      >
        <H1>Cakes</H1>
        <P className="text-muted-foreground">
          Create and manage your cakes here
        </P>
      </SectionHeader>

      <HandleDataSection
        query={query}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

function NewProjectButton() {
  return (
    <RoleWrapper allowedRoles={[UserRoles.ADMIN]}>
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
    </RoleWrapper>
  );
}

function HandleDataSection({
  query,
  pagination,
  setPagination,
}: {
  query: UseQueryResult<ApiResponse<Cake[]>, Error>;
  pagination: QueryObject;
  setPagination: React.Dispatch<React.SetStateAction<QueryObject>>;
}) {
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
        {data.map((i) => (
          <CakeCard data={i} key={i.uuid} />
        ))}
      </div>
      <div className="py-8">
        <PaginationSection
          pagination={{
            ...pagination,
            totalCount: meta?.totalCount ?? 0,
            totalPages: meta?.totalPages ?? 0,
          }}
          setPagination={setPagination}
        />
      </div>
    </>
  );
}

function CakeCard({ data }: { data: Cake }) {
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  console.log(data.media);

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
          <Link
            href={`/admin/cakes/edit/${data.uuid}`}
            className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
          >
            Edit
          </Link>
          <Badge
            className={cn(
              "text-white",
              CakeTypeColorClasses[data.cakeType?.color as string],
            )}
          >
            {data.cakeType?.name || "no tag"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
