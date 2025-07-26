"use client";

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
import { ApiResponse, Cake } from "@/types";
import { Loader2, RefreshCcw, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function RestoreButton({
  uuid,
  onDelete,
}: {
  uuid: string;
  onDelete: (uuid?: string) => Promise<ApiResponse<Cake>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const res = await onDelete(uuid);

      setIsLoading(false);
      toast.success("Object Restored");
      setIsOpen(false);

      if (res.success) {
        window.location.reload();
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
          className="w-24 flex items-center justify-between"
        >
          Restore <RefreshCcw className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Restore Cake</DialogTitle>
          <DialogDescription>
            Restore your cake so your users can see it
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
            Restore
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
