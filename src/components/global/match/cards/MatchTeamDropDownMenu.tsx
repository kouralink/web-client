import { LogOut, Users } from "lucide-react";

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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { cancelMatchForCoach } from "@/state/match/matchSlice";

export default function MatchTeamDropDownMenu({
  teamname,
  role,
}: {
  teamname: string;
  role: "user" | "coach" | "member";
}) {
  const matchStatus = useSelector(
    (state: RootState) => state.match.match.status
  );
  const dispatch = useDispatch<AppDispatch>();
  const handelLeaveMatch = () => {
    dispatch(cancelMatchForCoach());
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
        <DropdownMenuLabel>Match Team Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* the match cancel working coachs_edit or refree_waiting or pending satus just */}
        {role === "coach" &&
          ["coachs_edit", "refree_waiting", "pending"].includes(
            matchStatus
          ) && (
            <DropdownMenuGroup>
              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  {" "}
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    className="text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />

                    <span>Leave Match</span>
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone, This team will be cancel the
                      match!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handelLeaveMatch}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuGroup>
          )}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={`/team/page/${teamname}`}>
              <Users className="mr-2 h-4 w-4" />
              <span>Team Page</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
