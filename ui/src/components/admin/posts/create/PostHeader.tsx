"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import { ArrowLeft, CloudOff, CloudUpload, FileWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { PostSidebarLogo } from "../../sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";
import { useCake } from "@/context/CakeContext";

type PostHeader = {
  header: string;
  hasChanged: boolean;
  onSave: () => void;
};

export default function PostHeader({ header, hasChanged, onSave }: PostHeader) {
  const router = useRouter();
  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-xl font-bold">
        <h1>{header}</h1>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <div className="text-sm text-gray-500 ">
          {hasChanged ? (
            <div className="flex items-center gap-2">
              <CloudOff className="w-4 h-4 " /> Changes not saved
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CloudUpload className="w-4 h-4 " /> Saved to Cloud
            </div>
          )}
        </div>
        <Button disabled={!hasChanged} onClick={onSave} variant={"outline"}>
          Save
        </Button>
      </div>
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}
