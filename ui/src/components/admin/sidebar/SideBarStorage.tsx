"use client";

import { GetStorageUsed } from "@/actions/Site";
import { Progress } from "@/components/ui/progress";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Cloud } from "lucide-react";
import { useEffect, useState } from "react";

export default function SideBarStorage() {
  const [storageUsed, setStorageUsed] = useState(0);
  const [maxStorage, setMaxStorage] = useState(20 * 2 ** 30);

  useEffect(() => {
    const getData = async () => {
      const data = await GetStorageUsed();
      setStorageUsed(data.data as number);
    };
    setMaxStorage(20 * 2 ** 30);
    getData();
  }, []);

  function showPercent(i: number) {
    return ((i / maxStorage) * 100).toFixed(2);
  }

  function formatStorage(gb: number): string {
    if (gb >= 1000) {
      return `${(gb / 1000).toFixed(1)} TB`;
    }
    return `${gb.toFixed(2)} GB`;
  }

  function bytesToGB(a: number) {
    return a / 2 ** 30;
  }

  return (
    <SidebarMenu className="pb-2">
      <SidebarMenuItem>
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Cloud Storage</span>
        </div>

        <div className="space-y-3">
          <Progress value={storageUsed / maxStorage} className="h-2" />

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formatStorage(bytesToGB(storageUsed))} used</span>
            <span>{bytesToGB(storageUsed).toFixed(2)}%</span>
          </div>
        </div>
        {/* <div className="mt-auto">
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
        </div> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
