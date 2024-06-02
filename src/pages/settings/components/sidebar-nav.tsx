
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import SettingsMenuItem from "@/components/global/ListIteam"
import { sidebarNavItemType } from "@/types/types"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: sidebarNavItemType[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation()
  const pathname = location.pathname
  console.log("pathis :",pathname)
  
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <SettingsMenuItem iocn_name={item.icon} title={item.title} arrow={false} />
        </Link>
      ))}
    </nav>
  )
}
