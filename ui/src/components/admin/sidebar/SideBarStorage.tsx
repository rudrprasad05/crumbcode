"use client";

import { GetStorageUsed } from "@/actions/Site";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Cloud } from "lucide-react";
import { useEffect, useState } from "react";

export default function SideBarStorage() {
  const [storageUsed, setStorageUsed] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await GetStorageUsed();
      console.log(data);

      setStorageUsed(data.data as number);
    };
    getData();
  }, []);

  function showPercent(i: number) {
    let max = 20 * 2 ** 30;
    return ((i / max) * 100).toFixed(2);
  }

  return (
    <SidebarMenu className="pb-2">
      <SidebarMenuItem>
        <div className="mt-auto">
          <div
            className={
              "flex items-center w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors"
            }
          >
            <Cloud className="h-4 w-4" />
            <span>Storage ({showPercent(storageUsed)}% full)</span>
          </div>
          <div className="px-2">
            <div className="w-full bg-gray-200 h-2 rounded-2xl relative">
              <div
                className={`bg-rose-500 h-2 rounded-2xl absolute top-0 left-0 `}
                style={{ width: `${showPercent(storageUsed)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
