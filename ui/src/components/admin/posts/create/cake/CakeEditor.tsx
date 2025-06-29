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
import { Textarea } from "@/components/ui/textarea";
import { CakeProvider, useCake } from "@/context/CakeContext";
import { axiosGlobal } from "@/lib/axios";
import { Media } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CakeCardCreation from "./CakeCardCreation";
import { useRouter } from "next/navigation";
import { SidebarHeader } from "@/components/ui/sidebar";
import { ArrowLeft, CloudOff, CloudUpload, FileWarning } from "lucide-react";
import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { useCakeType } from "@/context/CakeTypeContext";

export default function CakeEditor() {
  const { saveCakeContext, hasChanged } = useCake();
  return (
    <CakeProvider>
      <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
        <Header />
        <div className="flex-1 min-h-screen flex flex-row">
          <main className="flex-1 p-6">
            <div className="w-full h-full grid grid-cols-1 place-items-center">
              <CakeCardCreation />
            </div>
          </main>
          <SideBar />
        </div>
      </div>
    </CakeProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveContext, hasChanged } = useCakeType();

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-xl font-bold">
        <h1>Create New Category</h1>
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
  const { cake, setCake, updateCakeValues } = useCake();

  return (
    <div className="overflow-hidden relative h-screen w-[500px] p-4 border border-gray-200 border-t-0 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="font-bold">Enter details</div>
      </div>
      <div className="grow">
        <div className="space-y-6 w-full py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={cake.name ?? ""}
              onChange={(e) => updateCakeValues("name", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={cake.description ?? ""}
              onChange={(e) => updateCakeValues("description", e.target.value)}
            />
          </div>

          <div>
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

          <div>
            <MediaSelectDialog
              onSelect={(media) => setCake((prev) => ({ ...prev, media }))}
            />
            <Label htmlFor="mediaUrl">Media</Label>
            {cake.media?.url && (
              <img
                src={cake.media.url}
                alt={cake.media.altText}
                className="w-full rounded-md border aspect-video object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaSelectDialog({ onSelect }: { onSelect: (media: Media) => void }) {
  const [open, setOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      setisLoading(true);
      try {
        const res = await axiosGlobal.get("/media/get-all");
        setMediaItems(res.data);
        setisLoading(false);
      } catch {
        toast.error("Failed to fetch media");
        setisLoading(false);
      }
    };

    if (open) fetchMedia();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Image</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select a Media</DialogTitle>
          <DialogDescription>
            Chose an appropriate media for your cake
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
          {mediaItems.map((media) => (
            <div
              key={media.uuid}
              className="border rounded hover:ring-2 ring-primary transition cursor-pointer"
              onClick={() => {
                onSelect(media);
                setOpen(false);
              }}
            >
              <img
                src={media.url}
                alt={media.altText}
                className="object-cover aspect-square w-full"
              />
              <p className="text-xs truncate p-1 text-center">
                {media.fileName}
              </p>
            </div>
          ))}
          {mediaItems.length === 0 && !isLoading && <div>No items to show</div>}
          {mediaItems.length === 0 && isLoading && <div>Loading</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
