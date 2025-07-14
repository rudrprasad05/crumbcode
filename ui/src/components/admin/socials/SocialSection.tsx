"use client";

import { GetAllSocialMedia } from "@/actions/SocialMedia";
import { LoadingCard } from "@/components/global/LoadingContainer";
import NoDataContainer from "@/components/global/NoDataContainer";
import PaginationSection from "@/components/global/PaginationSection";
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
import { MetaData, SocialMedia } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { FC, SVGProps, useEffect, useState } from "react";
import NewSocialDialog from "./NewSocialDialog";
import SocialMediaCardCreation from "../posts/create/social-media/SocialMediaCardCreation";
import { Default, SocialIcons } from "@/components/svg/icons";
import { parseSocialLink } from "@/lib/link-parse";

interface ISocialSection {
  data: SocialMedia[];
  isLoading: boolean;
}

export default function SocialSection() {
  const [socialItems, setSocialItems] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  useEffect(() => {
    setSocialItems([]);
    const getData = async () => {
      const data = await GetAllSocialMedia({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });
      console.log(data);

      setSocialItems(data.data as SocialMedia[]);
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
      <HandleDataSection isLoading={loading} data={socialItems} />
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
  console.log("sm123", data);
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
      (icon) => icon.name.toLowerCase() === data?.icon?.toLowerCase()
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
