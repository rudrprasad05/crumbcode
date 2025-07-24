"use client";

import { GetAllCakes } from "@/actions/Cake";
import {
  LoadingCard,
  LoadingHorizontialCard,
} from "@/components/global/LoadingContainer";
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
import { Cake, CakeTypeColorClasses, MetaData } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetAllNotifications } from "@/actions/Notifications";
import { Notification } from "@/types";
import { NotificationCard } from "./NotificationCard";

interface ICakeTypesSection {
  data: Notification[];
  isLoading: boolean;
}

export default function NotificationSection() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  useEffect(() => {
    setNotifications([]);
    const getData = async () => {
      const data = await GetAllNotifications({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });

      setNotifications(data.data as Notification[]);
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
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <div>
      <Header />
      <HandleDataSection isLoading={loading} data={notifications} />
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
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
