import NoDataContainer from "@/components/global/NoDataContainer";
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
import { CakeType, CakeTypeColorClasses } from "@/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

interface ICakeTypesSection {
  data: CakeType[];
}

export default function CakeTypesSection({ data }: ICakeTypesSection) {
  return (
    <div>
      <Header />
      <HandleDataSection data={data} />
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

        <Link href={"/admin/posts/create?type=category"}>
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

function HandleDataSection({ data }: ICakeTypesSection) {
  if (data.length === 0) {
    return <NoDataContainer />;
  }
  return (
    <div>
      {data.map((i) => (
        <Badge
          className={cn("text-white", CakeTypeColorClasses[i.color as string])}
        >
          {i.name}
        </Badge>
      ))}
    </div>
  );
}
