import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { SidebarLogo } from "./sidebar/sidebar-logo"
import { SidebarNavigation } from "./sidebar/sidebar-navigation"
import { SidebarUserMenu } from "./sidebar/sidebar-user-menu"

export function AdminSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarNavigation />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-2">
        <SidebarUserMenu />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
