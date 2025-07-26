"use client";

import { DeleteForever, SafeDeleteMedia } from "@/actions/Media";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteMediaDialoge({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await SafeDeleteMedia(id);
      setIsLoading(false);
      toast.success("Media Deleted");
      setIsOpen(false);

      if (res.success) {
        router.push("/admin/media");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error Occured");
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-between"
        >
          Delete <Trash className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Delete Media</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleDelete()}
            className="bg-rose-500 hover:bg-red-600"
            variant={"destructive"}
          >
            Delete
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
