import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

const;

export default function Notification() {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </PopoverTrigger>
        <PopoverContent align="end" className="bg-white">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
}
