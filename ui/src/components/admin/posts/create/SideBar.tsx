"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCake } from "@/context/CakeContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Media } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { axiosGlobal } from "@/lib/axios";

export default function SideBar() {
  const { cake, setCake } = useCake();
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
              onChange={(e) =>
                setCake((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={cake.description ?? ""}
              onChange={(e) =>
                setCake((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={cake.price ?? 0}
              onChange={(e) =>
                setCake((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="isAvailable">Available</Label>
            <Switch
              id="isAvailable"
              checked={cake.isAvailable ?? false}
              onCheckedChange={(val) =>
                setCake((prev) => ({ ...prev, isAvailable: val }))
              }
            />
          </div>

          <div>
            <Label htmlFor="mediaUrl">Media</Label>
            {cake.media?.url && (
              <img
                src={cake.media.url}
                alt={cake.media.altText}
                className="w-full rounded-md border aspect-video object-cover"
              />
            )}
            <MediaSelectDialog
              onSelect={(media) => setCake((prev) => ({ ...prev, media }))}
            />
          </div>
        </div>
        );
      </div>
    </div>
  );
}

function MediaSelectDialog({ onSelect }: { onSelect: (media: Media) => void }) {
  const [open, setOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axiosGlobal.get("/media/get-all");
        setMediaItems(res.data);
      } catch {
        toast.error("Failed to fetch media");
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
          {mediaItems.length === 0 && <div>No items to show</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
