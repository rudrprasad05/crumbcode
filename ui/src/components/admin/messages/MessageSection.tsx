"use client";

import { GetAllContactMessages } from "@/actions/ContactMessage";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FIVE_MINUTE_CACHE } from "@/lib/const";
import { ContactMessage, MetaData, QueryObject } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICakeTypesSection {
  data: ContactMessage[];
  isLoading: boolean;
}

export default function MessageSection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const query = useQuery({
    queryKey: ["admin-messages", pagination],
    queryFn: () => GetAllContactMessages({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  if (query.isError) {
    return <div className="text-red-500">Error loading media.</div>;
  }

  const data = query.data?.data ?? [];
  const meta = query.data?.meta;

  return (
    <div>
      <Header />
      <HandleDataSection isLoading={query.isLoading} data={data} />
      <div className="py-8">
        <PaginationSection
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Create and manage your messages here
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
              <SelectValue />
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

function HandleDataSection({ data, isLoading }: ICakeTypesSection) {
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
        <div
          key={i.uuid}
          className="bg-white flex flex-col rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-4 flex-1/2 flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {i.name as string}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{i.message as string}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
