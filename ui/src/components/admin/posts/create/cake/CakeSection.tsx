"use client";

import { GetAllCakes } from "@/actions/Cake";
import { GetMedia } from "@/actions/Media";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Cake, CakeType, CakeTypeColorClasses, Media, MetaData } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICakeTypesSection {
  data: Cake[];
}

export default function CakeSection() {
  const [cakeItems, setCakeItems] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 1,
    pageSize: 8,
    totalPages: 0,
  });

  useEffect(() => {
    setCakeItems([]);
    const getData = async () => {
      const data = await GetAllCakes({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });

      setCakeItems(data.data as Cake[]);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));

      setLoading(false);
    };
    getData();
  }, [pagination.pageNumber]);

  return (
    <div>
      <Header />
      <HandleDataSection data={cakeItems} />
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
        <h1 className="text-3xl font-bold text-gray-900">Cakes</h1>
        <p className="text-gray-600 mt-2">Create and manage your cakes here</p>
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

        <Link href={"/admin/cakes/create?type=cake"}>
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

function HandleDataSection({ data }: ICakeTypesSection) {
  if (data.length === 0) {
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
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img
              src={i.media?.url as string}
              alt={""}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {i.name as string}
              </h3>
              <div className="text-xs text-rose-600 font-bold">
                {"$" + i.price}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{i.description as string}</p>
            <Link
              href={`/admin/cakes/edit/cake/${i.uuid}`}
              className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
