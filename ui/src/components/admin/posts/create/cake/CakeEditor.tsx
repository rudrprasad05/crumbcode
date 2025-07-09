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
import { Cake, CakeType, Media, MetaData } from "@/types";
import { ArrowLeft, Check, CloudOff, CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CakeCardCreation from "./CakeCardCreation";
import { stringify } from "qs";

export default function CakeEditor({ cake }: { cake?: Cake }) {
  return (
    <CakeProvider>
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
                  <CakeCardCreation cakeData={cake} />
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
    </CakeProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveCakeContext, hasChanged } = useCake();

  useEffect(() => {}, [hasChanged]);

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-lg font-bold">
        <h1>Cake Editor</h1>
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
          onClick={saveCakeContext}
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
  const { cake, cakeTypes, updateCakeValues } = useCake();
  const [isMediaImageLoaded, setIsMediaImageLoaded] = useState(true);

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
              {isMediaImageLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
              )}

              <Image
                src={cake?.media?.url as string}
                alt={cake?.media?.altText as string}
                fill
                className={`object-cover rounded-lg transition-opacity duration-500 ${
                  isMediaImageLoaded ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsMediaImageLoaded(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaSelectDialog() {
  const { changeMedia, cake } = useCake();
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media>(
    cake.media as Media
  );

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
  const { changeMedia, cake, cakeTypes } = useCake();
  const [isImageLoading, setIsImageLoading] = useState<boolean[]>([]);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [isLoading, setisLoading] = useState(true);

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

      setisLoading(false);
    };
    if (open) getData();
  }, [open, pagination.pageNumber]);

  if (mediaItems.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-visible w-full">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingCard />
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

function LoadingCard() {
  return (
    <div className="flex flex-col space-y-3  bg-gray-100 rounded-lg">
      <Skeleton className="h-full aspect-square w-full rounded-t-xl rounded-b-none bg-gray-300" />
      <div className="space-y-2 p-2">
        <Skeleton className="h-4 w-full  bg-gray-300" />
      </div>
    </div>
  );
}
