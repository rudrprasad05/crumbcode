"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Media } from "@/types";
import { Ban, Edit, FileText, ImageIcon, Trash2, Video } from "lucide-react";
import { useState } from "react";
import { DeleteMediaDialoge } from "./delete-media-dialoge";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  item: Media;
  onDelete: () => void;
}

export function MediaCard({ item, onDelete }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getTypeIcon = () => {
    const type = item.contentType;

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
    const type = item.contentType;
    if (type.startsWith("image/")) return "bg-green-100 text-green-800";
    else if (type.startsWith("video/")) return "bg-blue-100 text-blue-800";
    else if (type.startsWith("application/") || type.startsWith("text/"))
      return "bg-purple-100 text-purple-800";
    else return "bg-gray-100 text-gray-800";
  };

  return (
    <Card
      className="group bg-white p-0 transition-all duration-200 hover:shadow-md border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 bg-white">
        <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          {item.contentType.includes("image") && isImageValid ? (
            <>
              <Image
                width={100}
                height={100}
                src={item.url || "/image.svg"}
                onError={(e) => {
                  e.currentTarget.onerror = null; // prevent infinite loop
                  setIsImageValid(false);
                }}
                onLoad={() => setIsImageLoaded(true)}
                alt={item.altText || item.fileName}
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
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              {getTypeIcon()}
            </div>
          )}

          {isHovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-12 text-black transition-all bg-white/50 backdrop-blur-sm group-hover:opacity-100">
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <DeleteMediaDialoge id={item.uuid} />
            </div>
          )}

          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={`text-xs ${getTypeColor()}`}>
              {item.contentType.split("/")[0]}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div
            className="font-medium text-sm text-gray-900 truncate"
            title={item.fileName}
          >
            {item.fileName}
          </div>

          <div
            className="text-xs flex gap-1 text-gray-600 truncate"
            title={item.altText}
          >
            Alt:{" "}
            {item.altText.length > 0 ? (
              item.altText
            ) : (
              <Ban className="w-4 h-4 text-gray-600" />
            )}
          </div>

          <div className="text-xs text-gray-400">
            {new Date(item.createdOn).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
