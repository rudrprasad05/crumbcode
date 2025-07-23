"use client";

import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useCakeType } from "@/context/CakeTypeContext";
import { MediaProvider, useMedia } from "@/context/MediaContext";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft, CloudOff, CloudUpload, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Ban, FileText, ImageIcon, Trash2, Video } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SidebarDetailsTab from "./SidebarDetailsTab";
import SideBarConfigTab from "./SideBarConfigTab";

export default function MediaEditorContainer() {
  return (
    <MediaProvider>
      <MediaEditor />
    </MediaProvider>
  );
}

function MediaEditor() {
  const { media, previewUrl } = useMedia();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getTypeIcon = () => {
    const type = media?.contentType as string;

    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (type.startsWith("video/")) {
      return <Video className="h-4 w-4" />;
    } else if (type.startsWith("application/") || type.startsWith("text/")) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    const type = media?.contentType as string;
    if (type.startsWith("image/")) return "bg-green-100 text-green-800";
    else if (type.startsWith("video/")) return "bg-blue-100 text-blue-800";
    else if (type.startsWith("application/") || type.startsWith("text/"))
      return "bg-purple-100 text-purple-800";
    else return "bg-gray-100 text-gray-800";
  };

  return (
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
                <Card className="group bg-white p-0 transition-all duration-200 hover:shadow-md border-gray-200 max-w-[300px]">
                  <CardContent className="p-0 bg-white">
                    <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      {previewUrl ? (
                        <>
                          <Image
                            width={100}
                            height={100}
                            src={previewUrl || "/image.svg"}
                            alt={media.altText || (media.fileName as string)}
                            className={cn("w-full h-full object-cover")}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          {getTypeIcon()}
                        </div>
                      )}

                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getTypeColor()}`}
                        >
                          {media?.contentType?.split("/")[0]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div
                        className="font-medium text-sm text-gray-900 truncate"
                        title={media?.fileName}
                      >
                        {media?.fileName}
                      </div>

                      <div
                        className="text-xs flex gap-1 text-gray-600 truncate"
                        title={media?.altText}
                      >
                        Alt:
                        {(media?.altText?.length as number) > 0 ? (
                          media?.altText
                        ) : (
                          <Ban className="w-4 h-4 text-gray-600" />
                        )}
                      </div>

                      <div className="text-xs text-gray-400">
                        {new Date(
                          media?.createdOn as string
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
  );
}

function Header() {
  const router = useRouter();
  const { saveContext, hasChanged } = useMedia();

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
          disabled={!hasChanged}
          onClick={saveContext}
          variant={"outline"}
        >
          Save
        </Button>
      </div>
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}

function SideBar() {
  const { media, updateValues, file, previewUrl, handleFileChange } =
    useMedia();
  const [state, setState] = useState<"edit" | "config">("edit");

  useEffect(() => {
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
