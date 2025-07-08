"use client";

import { GetAllCakeTypes } from "@/actions/CakeType";
import {
  LoadingContainer,
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
import { CakeType } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

interface ICakeTypesSection {
  data: CakeType[];
}

export default function CakeTypesSection() {
  return (
    <div>
      <Header />
      <HandleDataSection />
    </div>
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
  const [data, setData] = useState<CakeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const cake = await GetAllCakeTypes();
      setData(cake);

      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return <TableSkeleton columns={3} rows={8} showHeader />;
  }

  if (!data) {
    return <>Invalid URL</>;
  }
  if (data.length === 0) {
    return <NoDataContainer />;
  }
  return <DataTable columns={columns} data={data} />;
}
