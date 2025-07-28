"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useMedia } from "@/context/MediaContext";
import { cn } from "@/lib/utils";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function SidebarDetailsTab() {
  const { media, updateValues, previewUrl, handleFileChange } = useMedia();

  return (
    <div className="grow">
      <div className="space-y-6 w-full py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">File Name</Label>
          <Input
            id="fileName"
            value={media.fileName ?? ""}
            onChange={(e) => updateValues("fileName", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Alt text</Label>
          <Textarea
            id="altText"
            value={media.altText ?? ""}
            onChange={(e) => updateValues("altText", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="showInGallery">Show in gallery</Label>
          <Switch
            checked={media.showInGallery}
            onCheckedChange={(e) => updateValues("showInGallery", e)}
          />
        </div>

        {!previewUrl && (
          <label
            htmlFor="file"
            className={cn(
              "cursor-pointer flex items-center p-2 bg-secondary rounded hover:bg-secondary/80"
            )}
          >
            <Upload className="mr-2" />
            <span>Upload File</span>
            <input
              id="file"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </label>
        )}
        {previewUrl && (
          <div className="relative w-1/2">
            <div
              onClick={(e) =>
                handleFileChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>,
                  true
                )
              }
              className="rounded-full p-1 absolute -top-2 cursor-pointer -right-2 bg-rose-500"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </div>
            <Image
              width={200}
              height={200}
              src={previewUrl}
              alt="Preview"
              className="max-w-xs rounded border object-cover w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
