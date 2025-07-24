"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMedia } from "@/context/MediaContext";
import { cn } from "@/lib/utils";
import { Media } from "@/types";
import { ImageIcon, Video, FileText, Ban } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function MediaCard({ data }: { data?: Media }) {
  const { media, previewUrl, setInitialState } = useMedia();

  useEffect(() => {
    console.log("rerun");
    if (data) setInitialState(data);
  }, []);

  const getTypeIcon = () => {
    const type = media?.contentType as string;

    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (type.startsWith("video/")) {
      return <Video className="h-4 w-4" />;
    } else if (type.startsWith("application/") || type.startsWith("text/")) {
      return <FileText className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    const type = media?.contentType as string;
    if (type.startsWith("image/")) return "bg-green-100 text-green-800";
    else if (type.startsWith("video/")) return "bg-blue-100 text-blue-800";
    else if (type.startsWith("application/") || type.startsWith("text/"))
      return "bg-purple-100 text-purple-800";
    else return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="group bg-white p-0 transition-all duration-200 hover:shadow-md border-gray-200 w-[300px] max-w-[300px]">
      <CardContent className="p-0 bg-white">
        <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          {previewUrl ? (
            <>
              <Image
                width={100}
                height={100}
                src={previewUrl || "/image.svg"}
                alt={media.altText || (media.fileName as string)}
                className={cn("w-full h-full object-cover")}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              {getTypeIcon()}
            </div>
          )}

          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={`text-xs ${getTypeColor()}`}>
              {media?.contentType?.split("/")[0]}
            </Badge>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div
            className="font-medium text-sm text-gray-900 truncate"
            title={media?.fileName}
          >
            {media?.fileName}
          </div>

          <div
            className="text-xs flex gap-1 text-gray-600 truncate"
            title={media?.altText}
          >
            Alt:
            {(media?.altText?.length as number) > 0 ? (
              media?.altText
            ) : (
              <Ban className="w-4 h-4 text-gray-600" />
            )}
          </div>

          <div className="text-xs text-gray-400">
            {new Date(media?.createdOn as string).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
