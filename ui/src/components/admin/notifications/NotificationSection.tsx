"use client";

import { GetAllNotifications } from "@/actions/Notifications";
import { LoadingHorizontialCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESortBy, MetaData, Notification, QueryObject } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { NotificationCard } from "./NotificationCard";
import { useQuery } from "@tanstack/react-query";
import { FIVE_MINUTE_CACHE } from "@/lib/const";

interface ICakeTypesSection {
  data: Notification[];
  isLoading: boolean;
}

export default function NotificationSection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
    sortBy: ESortBy.ASC,
  });

  const query = useQuery({
    queryKey: ["admin-notifications", pagination],
    queryFn: () => GetAllNotifications({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  if (query.isError) {
    return <div className="text-red-500">Error loading media.</div>;
  }

  const data = query.data?.data ?? [];

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
    <div className="flex flex-col gap-1">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Manage your notifications here</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notifications..."
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
      <div className="grid grid-cols-1 gap-4 py-4">
        {Array.from({ length: 8 }, (_, i) => (
          <LoadingHorizontialCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {data.map((i) => (
        <NotificationCard key={i.uuid} data={i} />
      ))}
    </div>
  );
}
