import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Bell } from "lucide-react"
  import NotificationMessage from "./NotificationMessage"
  
  const SheetDemo = () => {
  
    return (
      <Sheet>
        <SheetTrigger asChild>
        <Bell className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"/>
        </SheetTrigger>
        <SheetContent>
        <SheetHeader className="py-10">
            <SheetTitle>Notification</SheetTitle>
        </SheetHeader>
  
        <NotificationMessage/>
  
        </SheetContent>
        </Sheet>
    )
  }
  
  
  export default SheetDemo;