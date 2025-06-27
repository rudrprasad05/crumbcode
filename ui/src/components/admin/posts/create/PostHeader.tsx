"use client";

import { SidebarHeader } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { PostSidebarLogo } from "../../sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";

export default function PostHeader() {
  const router = useRouter();
  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-xl font-bold">
        <h1>Create Cake Card</h1>
      </div>
      <div className="flex gap-2 ml-auto">
        <Button variant={"outline"}>Save</Button>
        <Button>Publish</Button>
      </div>
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}
