"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
  FileText,
  Video,
  ImageIcon,
} from "lucide-react";
import type { MediaItem } from "./media-library";

interface MediaCardProps {
  item: MediaItem;
  onDelete: () => void;
}

export function MediaCard({ item, onDelete }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);

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
    switch (item.type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case "image":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-blue-100 text-blue-800";
      case "document":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-md border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          {item.type === "image" && isImageValid ? (
            <img
              src={item.url || "/image.svg"}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                setIsImageValid(false);
              }}
              alt={item.alt || item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              {getTypeIcon()}
            </div>
          )}

          {isHovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-12 text-black transition-all bg-white/50 backdrop-blur-sm group-hover:opacity-100">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}

          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={`text-xs ${getTypeColor()}`}>
              {item.type}
            </Badge>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div
            className="font-medium text-sm text-gray-900 truncate"
            title={item.name}
          >
            {item.name}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatFileSize(item.size)}</span>
            {item.dimensions && (
              <span>
                {item.dimensions.width} × {item.dimensions.height}
              </span>
            )}
          </div>

          {item.alt && (
            <div className="text-xs text-gray-600 truncate" title={item.alt}>
              Alt: {item.alt}
            </div>
          )}

          <div className="text-xs text-gray-400">
            {item.uploadedAt.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
