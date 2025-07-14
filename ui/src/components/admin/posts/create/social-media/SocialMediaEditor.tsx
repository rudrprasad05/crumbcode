"use client";

import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { IconPicker } from "@/components/admin/socials/IconPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  SocialMediaProvider,
  useSocialMedia,
} from "@/context/SocialMediaContext";
import { SocialMedia } from "@/types";
import { ArrowLeft, CloudOff, CloudUpload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SocialMediaCardCreation from "./SocialMediaCardCreation";

export default function SocialMediaEditor({
  socialMedia,
}: {
  socialMedia?: SocialMedia;
}) {
  const { setInitialCakeState } = useSocialMedia();

  useEffect(() => {
    if (socialMedia) setInitialCakeState(socialMedia);
  }, [socialMedia]);

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
                  <SocialMediaCardCreation data={socialMedia as SocialMedia} />
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
  const { saveSocialMediaContext, hasChanged, isSaving } = useSocialMedia();

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
          {isSaving ? (
            <div className="flex gap-2 items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving
            </div>
          ) : (
            <div>Save</div>
          )}
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
  console.log(socialMedia);
  const [selectedIcon, setSelectedIcon] = useState<string>(
    socialMedia.icon || "default"
  );

  useEffect(() => {}, [selectedIcon]);

  useEffect(() => {
    setSelectedIcon(socialMedia.icon as string);
  }, [socialMedia]);

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
