import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
}
