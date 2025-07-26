"use client";

import { GetOneMedia, UploadOneFile } from "@/actions/Media";
import { Button } from "@/components/ui/button";
import { useCake } from "@/context/CakeContext";
import { cn } from "@/lib/utils";
import { Media } from "@/types";
import { NewMediaFormSchema, NewMediaFormType } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Loader2, Trash, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewMediaForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { changeMedia, cake } = useCake();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewMediaFormType>({
    resolver: zodResolver(NewMediaFormSchema),
  });

  const file = watch("file");

  const onSubmit: SubmitHandler<NewMediaFormType> = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("altText", data.altText);
      formData.append("fileName", data.fileName);
      formData.append("file", data.file);
      //   formData.append("showInGallery", data)

      const res = await UploadOneFile(formData);
      console.log(res);
      const getMedia = await GetOneMedia(res?.data?.uuid as string);

      changeMedia(getMedia.data as Media);

      if (!res) throw new Error("Upload failed");

      toast.success("Uploaded successfully");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => setValue("file", undefined as any);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm mb-1">Alt Text</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          {...register("altText")}
        />
        {errors.altText && (
          <p className="text-red-500 text-sm">{errors.altText.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">File Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          {...register("fileName")}
        />
        {errors.fileName && (
          <p className="text-red-500 text-sm">{errors.fileName.message}</p>
        )}
      </div>

      {!file ? (
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
              const f = e.target.files?.[0];
              if (f) {
                setValue("file", f, { shouldValidate: true });
              }
            }}
          />
        </label>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <ImageIcon className="w-6 h-6" />
          <div className="truncate w-full">{file.name}</div>
          <Button variant="destructive" onClick={removeFile} type="button">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      )}
      {errors.file && (
        <p className="text-red-500 text-sm">{errors.file.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
        Upload
      </Button>
    </form>
  );
}
