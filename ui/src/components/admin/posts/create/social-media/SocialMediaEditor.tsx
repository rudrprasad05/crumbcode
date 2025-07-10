"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GetMedia } from "@/actions/Media";
import NewMediaForm from "@/components/admin/media/NewMediaForm";
import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import PaginationSection from "@/components/global/PaginationSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CakeProvider, useCake } from "@/context/CakeContext";
import { cn } from "@/lib/utils";
import { CakeType, Media, MetaData, SocialMedia } from "@/types";
import { ArrowLeft, Check, CloudOff, CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SocialMediaCardCreation from "./SocialMediaCardCreation";
import {
  SocialMediaProvider,
  useSocialMedia,
} from "@/context/SocialMediaContext";
import { IconPicker } from "@/components/admin/socials/IconPicker";

export default function SocialMediaEditor({
  socialMedia,
}: {
  socialMedia?: SocialMedia;
}) {
  return (
    <SocialMediaProvider>
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
                  <SocialMediaCardCreation data={socialMedia} />
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
    </SocialMediaProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveSocialMediaContext, hasChanged } = useSocialMedia();

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-lg font-bold">
        <h1>Links Editor</h1>
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
          onClick={saveSocialMediaContext}
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
  const { socialMedia, updateSocialMediaValues } = useSocialMedia();
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [isMediaImageLoaded, setIsMediaImageLoaded] = useState(true);

  useEffect(() => {
    updateSocialMediaValues("icon", selectedIcon);
  }, [selectedIcon]);

  return (
    <div className="overflow-hidden relative h-screen p-6 border border-gray-200 border-t-0 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="font-bold">Enter details</div>
      </div>
      <div className="grow">
        <div className="space-y-6 w-full py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={socialMedia.name ?? ""}
              onChange={(e) => updateSocialMediaValues("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={socialMedia.url ?? ""}
              onChange={(e) => updateSocialMediaValues("url", e.target.value)}
            />
          </div>

          <IconPicker value={selectedIcon} setValue={setSelectedIcon} />
          <div className="flex items-center gap-2">
            <Label htmlFor="isAvailable">Available</Label>
            <Switch
              id="isAvailable"
              checked={socialMedia.isActive ?? false}
              onCheckedChange={(val) =>
                updateSocialMediaValues("isActive", val)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
