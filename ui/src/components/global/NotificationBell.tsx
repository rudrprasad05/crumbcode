"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import React from "react";
import { Notification } from "@/types";
import NoDataContainer from "./NoDataContainer";
import { Badge } from "../ui/badge";

let tempNotifications: Partial<Notification>[] = [
  {
    id: 1,
    title: "Server Update",
    message: "Server will restart at 2 AM.",
    isRead: false,
    type: "info",
    createdOn: "2025-07-02T08:30:00Z",
    updatedOn: "2025-07-02T08:30:00Z",
    userId: 12,
  },
  {
    id: 2,
    title: "Disk Usage Alert",
    message: "RAID volume is 90% full.",
    isRead: true,
    type: "warning",
    createdOn: "2025-07-02T08:30:00Z",
    updatedOn: "2025-07-02T08:30:00Z",
  },
];

export default function NotificationBell() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Bell className="w-6 h-6 " />
          <Badge className="h-4 absolute top-[-5px] right-[-5px] min-w-4 rounded-full px-1 font-mono tabular-nums">
            {tempNotifications.length}
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <Label>Notifications</Label>
          <div className="flex flex-col gap-2">
            {tempNotifications.length == 0 && <NoDataContainer />}
            {tempNotifications.map((n) => (
              <NotificationCard notification={n as Notification} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <div className="border-t border-solid">
      <div className="flex justify-between items-center">
        <div>{notification.title}</div>
        <Badge className="text-xs">{notification.type}</Badge>
      </div>
      <div>{notification.message}</div>
    </div>
  );
}
