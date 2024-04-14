import {
    ArrowLeftRight,
    BadgePlus,
    Info,
    LogOut,
    UserPlus
  } from "lucide-react";
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
  export function TeamDropDownMenu() {
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-ellipsis-vertical"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Team Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgePlus className="mr-2 h-4 w-4" />
              <span>New Match</span>
              <DropdownMenuShortcut>coach</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite Player</span>
              <DropdownMenuShortcut>coach</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              <span>Change coach</span>
              <DropdownMenuShortcut>owner</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Leave team</span>
              <DropdownMenuShortcut>Member</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              <span>Details</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  