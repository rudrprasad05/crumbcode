"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Star,
  Share2,
  MessageSquare,
  Database,
  Tag,
  Cake,
  Bell,
  Globe,
  Cloud,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GetStorageUsed } from "@/actions/Site";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Cakes",
    href: "/admin/cakes",
    icon: Cake,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  //   {
  //     title: "Site",
  //     href: "/admin/site",
  //     icon: Globe,
  //   },
  {
    title: "Socials",
    href: "/admin/socials",
    icon: Share2,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Database,
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Recycle Bin",
    href: "/admin/bin",
    icon: Trash2,
  },
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <SidebarGroup className="h-full">
      <SidebarGroupContent className="h-full">
        <SidebarMenu className="h-full">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
