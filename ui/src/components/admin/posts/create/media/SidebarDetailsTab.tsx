"use client";

import { GetMedia } from "@/actions/Media";
import NewMediaForm from "@/components/admin/media/NewMediaForm";
import { LoadingCard } from "@/components/global/LoadingContainer";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCake } from "@/context/CakeContext";
import { useMedia } from "@/context/MediaContext";
import { cn } from "@/lib/utils";
import { Media, MetaData } from "@/types";
import { Check, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function SidebarDetailsTab() {
  const { media, updateValues, file, previewUrl, handleFileChange } =
    useMedia();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
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
            defaultChecked={media.showInGallery as boolean}
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

function MediaSelectDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select New Image</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select a Media</DialogTitle>
          <DialogDescription>
            Chose an appropriate media for your cake
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="Select">Select</TabsTrigger>
            <TabsTrigger value="Upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="Select" className="w-full">
            <MediaListTab open={open} setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="Upload">
            <NewMediaForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function MediaListTab({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { changeMedia, cake } = useCake();
  const [isImageLoading, setIsImageLoading] = useState<boolean[]>([]);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 1,
    pageSize: 6,
    totalPages: 0,
  });

  useEffect(() => {
    setMediaItems([]);
    const getData = async () => {
      const data = await GetMedia({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });

      console.log(data);

      setMediaItems(data.data as Media[]);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));
    };
    if (open) getData();
  }, [open, pagination.pageNumber, pagination.pageSize]);

  if (mediaItems.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-visible w-full">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-visible w-full">
      {mediaItems.map((media, index) => (
        <div
          onClick={() => {
            changeMedia(media);
            setOpen(false);
          }}
          key={media.uuid}
          className={cn(
            "relative overflow-visible border rounded hover:ring-2 ring-primary transition cursor-pointer"
          )}
        >
          {cake.media?.objectKey == media.objectKey && (
            <div className="bg-blue-500 rounded-full p-0.5 absolute top-[-5px] right-[-5px] z-10">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="relative w-full h-32">
            {isImageLoading[index] && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
            )}

            <Image
              width={50}
              height={50}
              src={media.url || "/placeholder.svg"}
              alt={media.fileName}
              className={`object-cover h-full w-full transition-opacity duration-500 ${
                isImageLoading[index] ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() =>
                setIsImageLoading((prev) => {
                  const updated = [...prev];
                  updated[index] = false;
                  return updated;
                })
              }
            />
          </div>
          <p className="text-xs truncate p-1 text-center">{media.fileName}</p>
        </div>
      ))}

      <PaginationSection
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
