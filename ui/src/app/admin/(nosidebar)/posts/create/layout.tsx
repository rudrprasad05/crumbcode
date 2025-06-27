import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import PostHeader from "@/components/admin/posts/create/PostHeader";
import SideBar from "@/components/admin/posts/create/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
      <PostHeader />
      <div className="flex-1 min-h-screen flex flex-row">
        <main className="flex-1 p-6">{children}</main>
        <SideBar />
      </div>
    </div>
  );
}
