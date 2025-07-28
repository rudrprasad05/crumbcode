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
import {
  LoadingCard,
  SmallMediaLoadingCard,
} from "@/components/global/LoadingContainer";
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
import { cn } from "@/lib/utils";
import { CakeType, Media, MetaData } from "@/types";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTypeIcon } from "@/lib/icon-parse";

export default function SidebarDetailsTab() {
  const { cake, cakeTypes, updateCakeValues } = useCake();
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    console.log("uf hit");
    setIsImageValid(true);
    setIsImageLoaded(false);
  }, [cake?.media]);
  return (
    <div className="grow">
      <div className="space-y-6 w-full py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={cake.name ?? ""}
            onChange={(e) => updateCakeValues("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={cake.description ?? ""}
            onChange={(e) => updateCakeValues("description", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="Category">Category</Label>
          <Select
            value={(cake.cakeType?.id as unknown as string) ?? ""}
            onValueChange={(val) => {
              const selectedType = cakeTypes?.find(
                (ct) => (ct?.id as unknown as string) === val
              );
              updateCakeValues("cakeType", selectedType as CakeType);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a cake category" />
            </SelectTrigger>
            <SelectContent>
              {!cakeTypes && (
                <div className="flex gap-2 justify-center items-center text-sm">
                  Loading <Loader2 className="animate-spin" />
                </div>
              )}
              {cakeTypes?.length == 0 && <>No dats</>}
              {cakeTypes?.map((type) => (
                <SelectItem
                  key={type?.id}
                  value={type?.id as unknown as string}
                >
                  {type?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={cake.price ?? 0}
            onChange={(e) =>
              updateCakeValues("price", Number.parseInt(e.target.value))
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="isAvailable">Available</Label>
          <Switch
            id="isAvailable"
            checked={cake.isAvailable ?? false}
            onCheckedChange={(val) => updateCakeValues("isAvailable", val)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="mediaUrl">Media</Label>
          <MediaSelectDialog />

          <div className="relative w-64 h-64">
            {isImageValid ? (
              <>
                <Image
                  width={100}
                  height={100}
                  src={cake.media?.url || "/image.svg"}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    setIsImageValid(false);
                  }}
                  onLoad={() => setIsImageLoaded(true)}
                  alt={(cake.media?.altText || cake.media?.fileName) as string}
                  className={cn(
                    "w-full h-full object-cover",
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
                {!isImageLoaded && (
                  <div
                    className={cn(
                      "absolute top-0 left-0 w-full h-full object-cover bg-gray-300 animate-pulse"
                    )}
                  ></div>
                )}
              </>
            ) : (
              <div className="border border-solid w-full h-full flex items-center justify-center bg-gray-50">
                {getTypeIcon(cake.media as Media)}
              </div>
            )}
          </div>
        </div>
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
          <SmallMediaLoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-visible w-full">
      {mediaItems.map((media, index) => (
        <div
          onClick={() => {
            console.log("hit");
            changeMedia(media);
            setOpen(false);
          }}
          key={media.uuid}
          className={cn(
            "relative rounded-lg overflow-visible border hover:ring-2 ring-primary transition cursor-pointer"
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
              className={`object-cover rounded-t-lg h-full w-full transition-opacity duration-500 ${
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
