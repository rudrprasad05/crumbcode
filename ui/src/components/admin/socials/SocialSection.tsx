"use client";

import { GetAllSocialMedia } from "@/actions/SocialMedia";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
import { Default, SocialIcons } from "@/components/svg/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FIVE_MINUTE_CACHE } from "@/lib/const";
import { parseSocialLink } from "@/lib/link-parse";
import { MetaData, QueryObject, SocialMedia } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { FC, SVGProps, useEffect, useState } from "react";

interface ISocialSection {
  data: SocialMedia[];
  isLoading: boolean;
}

export default function SocialSection() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });
  const query = useQuery({
    queryKey: ["admin-social", pagination],
    queryFn: () => GetAllSocialMedia({ ...pagination }),
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
        <h1 className="text-3xl font-bold text-gray-900">Social Links</h1>
        <p className="text-gray-600 mt-2">Create and manage your links here</p>
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

        <Link href={"/admin/socials/create"}>
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

type IconType = FC<SVGProps<SVGSVGElement>>;

function HandleDataSection({ data, isLoading }: ISocialSection) {
  if (data.length === 0 && !isLoading) {
    return <NoDataContainer />;
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
        {Array.from({ length: 8 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
      {data.map((i, index) => (
        <SocialMediaCard data={i} key={index} />
      ))}
    </div>
  );
}

export function SocialMediaCard({ data }: { data: SocialMedia }) {
  const [username, setUsername] = useState<string>("");
  const [Icon, setIcon] = useState<IconType>(() => Default);

  useEffect(() => {
    setUsername(parseSocialLink(data.url as string).username as string);
  }, [data.url]);

  useEffect(() => {
    const foundIcon = SocialIcons.find(
      (icon) => icon.name.toLowerCase() === data?.icon?.toLowerCase(),
    )?.Icon;

    setIcon(() => foundIcon || Default);
  }, [data.icon]);

  return (
    <Card
      className={`grow w-full max-w-sm transition-colors cursor-pointer border-0 shadow-sm hover:shadow-md`}
    >
      <CardContent className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full bg-white shadow-sm`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {data.name}
            </p>
            <p className="text-sm text-gray-500 truncate">@{username}</p>
          </div>
        </div>
        <div className="text-end text-sm flex flex-col">
          <Link
            className="underline-offset-4 hover:underline"
            href={"/admin/socials/edit/" + data.uuid}
          >
            Edit
          </Link>
          <Link
            className="underline-offset-4 hover:underline"
            href={"//" + data.url}
          >
            Open
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
