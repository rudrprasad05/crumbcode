"use client";

import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MediaProvider, useMedia } from "@/context/MediaContext";
import { cn } from "@/lib/utils";
import { Media } from "@/types";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  ArrowLeft,
  Ban,
  CloudOff,
  CloudUpload,
  FileText,
  ImageIcon,
  Loader2,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideBarConfigTab from "./SideBarConfigTab";
import SidebarDetailsTab from "./SidebarDetailsTab";
import MediaCard from "./MediaCard";

export default function MediaEditor({ media }: { media?: Media }) {
  console.log(media);
  return (
    <MediaProvider>
      <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
        <Header />
        <div className="flex-1 min-h-screen flex flex-row">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-1 overflow-hidden"
          >
            <ResizablePanel defaultSize={60} minSize={30}>
              <main className="w-full h-full p-6">
                <div className="w-full h-full grid place-items-center">
                  <MediaCard data={media} />
                </div>
              </main>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={40} minSize={20}>
              <SideBar />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </MediaProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveContext, hasChanged, isSaving } = useMedia();

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-xl font-bold">
        <h1>Create New Media</h1>
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
        <Button
          disabled={!hasChanged || isSaving}
          onClick={saveContext}
          variant={"outline"}
        >
          {!hasChanged && "Saved"}
          {hasChanged && "Save"}
          {isSaving && <Loader2 className="animate-spin w-4 h-4" />}
        </Button>
      </div>
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}

function SideBar() {
  const { previewUrl } = useMedia();
  const [state, setState] = useState<"edit" | "config">("edit");

  useEffect(() => {
    console.log("rerun");
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Tabs
      defaultValue="edit"
      className="w-full overflow-hidden relative h-screen px-6 pb-6 border border-gray-200 border-t-0 flex flex-col"
    >
      <TabsPrimitive.List className="w-full border-solid border-b flex flex-row pt-2">
        <TabsPrimitive.Trigger
          onClick={() => setState("edit")}
          className={cn(
            "text-sm text-black/60 flex-grow px-8 cursor-pointer py-4 text-center border-solid border-blue-500 hover:border-b transition",
            state == "edit" ? "border-b" : "border-none"
          )}
          value="edit"
        >
          Edit
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          onClick={() => setState("config")}
          className={cn(
            "text-sm text-black/60  flex-grow px-8 cursor-pointer py-2 text-center border-solid border-blue-500 hover:border-b transition",
            state == "config" ? "border-b" : "border-none"
          )}
          value="config"
        >
          Config
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsContent value="edit">
        <SidebarDetailsTab />
      </TabsContent>
      <TabsContent value="config">
        <SideBarConfigTab />
      </TabsContent>
    </Tabs>
  );
}
