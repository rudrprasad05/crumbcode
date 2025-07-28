import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reply, Forward, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactMessage, ContactMessageTypes } from "@/types";

interface MessageDetailProps {
  message: ContactMessage;
}

const getTypeColor = (type: ContactMessageTypes) => {
  switch (type) {
    case ContactMessageTypes.INFO:
      return "bg-blue-100 text-blue-800";
    case ContactMessageTypes.ORDER:
      return "bg-green-100 text-green-800";
    case ContactMessageTypes.UPDATE:
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function MessageDetail({ message }: MessageDetailProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(message.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold">{message.name}</h2>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", getTypeColor(message.type))}
                >
                  {message.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{message.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatFullDate(message.createdOn)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.message}
          </div>
        </div>
      </div>

      {/* Message Info */}
      <div className="border-t p-4 bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Message ID: {message.uuid}</div>
          <div>Created: {formatFullDate(message.createdOn)}</div>
          {message.updatedOn !== message.createdOn && (
            <div>Updated: {formatFullDate(message.updatedOn)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
