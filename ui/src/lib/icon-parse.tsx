import { Media } from "@/types";
import { ImageIcon, Video, FileText } from "lucide-react";

export const getTypeIcon = (item: Media) => {
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
