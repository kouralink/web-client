import { SidebarNav } from "./components/sidebar-nav"
import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import Navbar from "@/components/global/Navbar"
import ProfileCard from "@/components/global/cards/ProfileCard"
import { sidebarNavItemType } from "@/types/types"

const sidebarNavItems:sidebarNavItemType[] = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: "user",
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: "settings",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: "palette",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: "bell",
  }
]


export default function SettingsLayout() {
  return (
    <>
      <div>
        <Navbar navHeight={2} />
      </div>
        <div className="hidden xs:flex  py-2">
          <ProfileCard />
        </div>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl"><Outlet/></div>
        </div>
      </div>
    </>
  )
}
