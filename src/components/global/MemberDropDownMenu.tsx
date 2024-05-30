import { Ban, User } from "lucide-react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { kickMember, banMember } from "@/state/team/teamSlice";
import {InfoMemberProfileCard} from "@/components/global/cards/InfoMemberProfileCard"
import { Link } from "react-router-dom";
import { User as userType} from "@/types/types";

export function MemberDropDownMenu({
  role,
  isAdmin,
  teamId,
  uid,
  username,
  userInfo,
}: {
  role: "user" | "coach" | "member";
  isAdmin: boolean;
  teamId: string;
  uid: string;
  username: string;
  userInfo: userType | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleKickAciton = async () => {
    // confirm kick
    dispatch(kickMember({ teamId, uid }));
  };
  const handleBanAciton = async () => {
    dispatch(banMember({ teamId, uid }));
  };

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
        <DropdownMenuLabel>Member Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/users/profile/${username}`}>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>open</DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            {userInfo && <InfoMemberProfileCard firstName={userInfo?.firstName} lastName={userInfo?.lastName} bio={userInfo?.bio} joinDate={userInfo?.joinDate} gender={userInfo?.gender}/>}
          </DropdownMenuItem>

          {role === "coach" && !isAdmin && (
            <DropdownMenuGroup>
              <AlertDialog >
                <AlertDialogTrigger className="w-full">
                  {" "}
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    <span>Kick</span>
                    <DropdownMenuShortcut>remove</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone, and will remove the member{" "}
                      {username} from team
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleKickAciton}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog >
                <AlertDialogTrigger className="w-full">
                  {" "}
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    <span>Ban</span>
                    <DropdownMenuShortcut>blacklist</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      By this action you will kick and add {" "}
                      {username} to black list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBanAciton}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              
            </DropdownMenuGroup>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
