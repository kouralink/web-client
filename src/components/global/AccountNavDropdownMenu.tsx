import {
  Loader2,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { logout } from "@/state/auth/authSlice";

export function AccountNavDropdownMenu() {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={authUser?.avatar ? authUser?.avatar : ""}
            alt={"logo of " + authUser?.username}
          />
          <AvatarFallback>
            {authUser?.username
              ? authUser?.username.charAt(0)
              : "N"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {authUser?.username ? authUser?.username : "My"} Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link to={"/settings"}>Settings</Link>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <Link to="/">
          {authLoading ? (
            <DropdownMenuItem key={"ilorez_i_logout_1"}>
              <button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={"ilorez_i_logout_2"}
              onClick={() => {
                dispatch(logout());
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          )}
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
