"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ContactMessage, ContactMessageTypes } from "@/types";

interface MessageListProps {
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  onSelectMessage: (message: ContactMessage) => void;
}

const getTypeColor = (type: ContactMessageTypes) => {
  switch (type) {
    case ContactMessageTypes.INFO:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case ContactMessageTypes.ORDER:
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case ContactMessageTypes.UPDATE:
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays <= 7) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
};

export function MessageList({
  messages,
  selectedMessage,
  onSelectMessage,
}: MessageListProps) {
  return (
    <div className="h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          <p>No messages found</p>
        </div>
      ) : (
        <div className="divide-y">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                selectedMessage?.id === message.id && "bg-muted"
              )}
              onClick={() => onSelectMessage(message)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{message.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {message.email}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 ml-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.createdOn)}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn("text-xs", getTypeColor(message.type))}
                  >
                    {message.type}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
