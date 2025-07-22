"use client";

import NotificationSection from "@/components/admin/notifications/NotificationSection";
import { NotificationProvider } from "@/context/NotificationContext";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <NotificationProvider>
        <NotificationSection />
      </NotificationProvider>
    </div>
  );
}
