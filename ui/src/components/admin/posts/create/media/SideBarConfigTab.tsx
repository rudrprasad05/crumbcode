"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCake } from "@/context/CakeContext";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteMedia } from "./DeleteMedia";
import { useMedia } from "@/context/MediaContext";

export default function SideBarConfigTab() {
  const { media } = useMedia();

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // set to false for 24h format
  };

  const parseDate = (
    options: Intl.DateTimeFormatOptions,
    date?: string
  ): string => {
    date = date?.trim();
    if (!date || date.length == 0) {
      return new Date(Date.now()).toLocaleDateString(
        undefined,
        dateFormatOptions
      );
    }
    return new Date(date).toLocaleDateString(undefined, dateFormatOptions);
  };
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="grow">
      <div className="space-y-6 w-full py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="co">Created On</Label>
          <Input
            id="co"
            disabled
            value={parseDate(dateFormatOptions, media.createdOn)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="uo">Updated On</Label>
          <Input
            id="uo"
            disabled
            value={parseDate(dateFormatOptions, media.updatedOn)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="uo">File Size</Label>
          <Input
            id="uo"
            disabled
            value={formatFileSize(media.sizeInBytes as number)}
          />
        </div>

        {media.id != 0 && (
          <Card className="flex flex-col border border-dashed border-rose-400 rounded-lg">
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div>
                <Label>Delete Cake</Label>
                <CardDescription>
                  This action is reversable but will remove the item from user
                  view
                </CardDescription>
              </div>
              <DeleteMedia uuid={media.uuid as string} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
