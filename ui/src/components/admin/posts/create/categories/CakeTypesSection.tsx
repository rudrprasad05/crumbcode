"use client";

import { GetAllCakeTypes } from "@/actions/CakeType";
import {
  LoadingCard,
  TableSkeleton,
} from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CakeTypeProvider, useCakeType } from "@/context/CakeTypeContext";
import { CakeType, MetaData, QueryObject } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import PaginationSection from "@/components/global/PaginationSection";
import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTE_CACHE } from "@/lib/const";

export default function CakeTypesSection() {
  return (
    <CakeTypeProvider>
      <Header />
      <HandleDataSection />
    </CakeTypeProvider>
  );
}

function Header() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-2">
          Create and manage your cake categories
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search posts..."
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          <Select>
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue defaultValue={"all"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cake">Cakes</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href={"/admin/category/create"}>
          <div
            className={`${buttonVariants({
              variant: "default",
            })} w-full text-start justify-start px-2 my-2`}
          >
            <Plus />
            New Catgory
          </div>
        </Link>
      </div>
    </>
  );
}

function HandleDataSection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const query = useQuery({
    queryKey: ["admin-cake-type", pagination],
    queryFn: () => GetAllCakeTypes({ ...pagination }),
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
    <>
      <DataTable columns={columns} data={data} />
      <div className="py-8">
        <PaginationSection
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
}
