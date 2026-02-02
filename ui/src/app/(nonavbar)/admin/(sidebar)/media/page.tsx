"use client";

import { GetMedia } from "@/actions/Media";
import { MediaGrid } from "@/components/admin/media/media-grid";
import { H1, P } from "@/components/font/HeaderFonts";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { RoleWrapper } from "@/components/global/RoleWrapper";
import { SectionHeader } from "@/components/global/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { FIVE_MINUTE_CACHE } from "@/lib/const";
import { ApiResponse, ESortBy, Media, QueryObject, UserRoles } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MediaPage() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    pageSize: 10,
    search: "",
    sortBy: ESortBy.DSC,
    isDeleted: false as boolean | undefined,
    showInGallery: undefined,
  });

  const query = useQuery({
    queryKey: ["admin-media", pagination],
    queryFn: () => GetMedia({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  return (
    <>
      <SectionHeader
        pagination={pagination}
        setPagination={setPagination}
        newButton={<NewProjectButton />}
      >
        <H1>Media</H1>
        <P className="text-muted-foreground">
          Create and manage your media here
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
      <Link href={"/admin/media/create"}>
        <div
          className={`${buttonVariants({
            variant: "default",
          })} w-full text-start justify-start px-2 my-2`}
        >
          <Plus />
          New Media
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
  query: UseQueryResult<ApiResponse<Media[]>, Error>;
  pagination: QueryObject;
  setPagination: React.Dispatch<React.SetStateAction<QueryObject>>;
}) {
  if (query.isError) {
    return <div className="text-red-500">Error loading media.</div>;
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
      <MediaGrid items={data} />
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
