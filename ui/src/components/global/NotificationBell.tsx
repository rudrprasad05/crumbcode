"use client";

import { useState } from "react";
import {
  Bell,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { Notification, NotificationTypes } from "@/types";

const mockNotifications: Partial<Notification>[] = [
  {
    id: 2,
    uuid: "q",
    title: "New User Registration",
    message: "John Doe has registered as a new user and is pending approval.",
    type: NotificationTypes.SUCCESS,
    isRead: false,
    createdOn: new Date(Date.now() - 5 * 60 * 1000).toDateString(), // 5 minutes ago
    actionUrl: "/admin/users/john-doe",
  },
  {
    id: 2,
    title: "System Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM UTC tomorrow.",
    type: NotificationTypes.ERROR,
    isRead: false,
    createdOn: new Date(Date.now() - 15 * 60 * 1000).toDateString(), // 15 minutes ago
  },
  {
    id: 2,
    title: "Payment Failed",
    message: "Payment processing failed for subscription #12345.",
    type: NotificationTypes.INFO,
    isRead: true,
    createdOn: new Date(Date.now() - 30 * 60 * 1000).toDateString(), // 30 minutes ago
    actionUrl: "/admin/payments/12345",
  },
  {
    id: 2,
    title: "Backup Completed",
    message: "Daily database backup completed successfully.",
    type: NotificationTypes.WARNING,
    isRead: true,
    createdOn: new Date(Date.now() - 60 * 60 * 1000).toDateString(), // 1 hour ago
  },
  {
    id: 2,
    title: "Security Alert",
    message: "Multiple failed login attempts detected from IP 192.168.1.100.",
    type: NotificationTypes.SUCCESS,
    isRead: false,
    createdOn: new Date(Date.now() - 2 * 60 * 60 * 1000).toDateString(), // 2 hours ago
    actionUrl: "/admin/security/alerts",
  },
  {
    id: 2,
    title: "New Feature Released",
    message: "Analytics dashboard v2.0 is now available.",
    type: NotificationTypes.SUCCESS,
    isRead: true,
    createdOn: new Date(Date.now() - 3 * 60 * 60 * 1000).toDateString(), // 3 hours ago
  },
  {
    id: 2,
    title: "Storage Warning",
    message: "Storage usage is at 85%. Consider upgrading your plan.",
    type: NotificationTypes.SUCCESS,
    isRead: false,
    createdOn: new Date(Date.now() - 4 * 60 * 60 * 1000).toDateString(), // 4 hours ago
  },
  {
    id: 2,
    title: "API Rate Limit",
    message: 'API rate limit exceeded for client app "Mobile App".',
    type: NotificationTypes.SUCCESS,
    isRead: true,
    createdOn: new Date(Date.now() - 6 * 60 * 60 * 1000).toDateString(), // 6 hours ago
  },
  {
    id: 2,
    title: "User Feedback",
    message: "New 5-star review received from premium user.",
    type: NotificationTypes.SUCCESS,
    isRead: true,
    createdOn: new Date(Date.now() - 8 * 60 * 60 * 1000).toDateString(), // 8 hours ago
  },
  {
    id: 2,
    title: "Server Update",
    message: "Server infrastructure updated to latest version.",
    type: NotificationTypes.SUCCESS,
    isRead: true,
    createdOn: new Date(Date.now() - 12 * 60 * 60 * 1000).toDateString(), // 12 hours ago
  },
  {
    id: 2,
    title: "License Expiring",
    message: "Your premium license will expire in 7 days.",
    type: NotificationTypes.SUCCESS,
    isRead: false,
    createdOn: new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString(), // 1 day ago
  },
  {
    id: 2,
    title: "Data Export Ready",
    message: "Your requested data export is ready for download.",
    type: NotificationTypes.SUCCESS,
    isRead: true,
    createdOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toDateString(), // 2 days ago
  },
];

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case NotificationTypes.ERROR:
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case NotificationTypes.WARNING:
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case NotificationTypes.SUCCESS:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
}

function formatTimeAgo(str: string) {
  const date = new Date(str);
  const now = new Date(date);
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;
  const recentNotifications = mockNotifications.slice(0, 10);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <Badge variant="secondary">{unreadCount} unread</Badge>
        </div>
        <ScrollArea className="h-96">
          <div className="p-2">
            {recentNotifications.map((notification, index) => (
              <div key={notification.id}>
                <Link
                  href={`/admin/notifications/${notification.id}`}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                      !notification.isRead ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(
                        notification.type as NotificationTypes
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.createdOn as string)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                {index < recentNotifications.length - 1 && (
                  <Separator className="my-1" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t">
          <Link href="/admin/notifications" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-center text-sm">
              See All Notifications
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
