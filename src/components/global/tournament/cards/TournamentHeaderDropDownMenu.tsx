import { Info, LogOut, PenLine, Play, Plus, Send } from "lucide-react";

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
import { useDispatch } from "react-redux";
import { sendRequestToJoinTournament } from "@/state/notification/notificationSlice";
import { AppDispatch } from "@/state/store";
import SearchTeamsForInvite from "./SearchTeamsForInvite";

export default function TournamentDropDownMenu({
  role,
  tourid,
}: {
  tourid: string;
  role:
    | "user"
    | "coach_inside"
    | "refree"
    | "tournament_manager"
    | "coach_outside";
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleRequistTojoin = async () => {
    console.log("Request to join 1");
    await dispatch(sendRequestToJoinTournament({ to: tourid }));
  };
  const handleLeaveTournament = async () => {
    console.log("Leave Tournament");
  };
  const handleLeaveTournamentForRefree = async () => {
    console.log("Leave Tournament for Refree");
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
        <DropdownMenuLabel>Tournament Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === "tournament_manager" && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>
                <SearchTeamsForInvite />
              </span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>

            <Link to={`/tournament/update/${tourid}`}>
              <DropdownMenuItem>
                <PenLine className="mr-2 h-4 w-4" />
                <span>Update Tournament</span>
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Play className="mr-2 h-4 w-4" />
              <span>Start Tournament</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {role === "coach_inside" && (
          <DropdownMenuGroup>
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                {" "}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />

                  <span>Leave Tournament</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone, Team will leave tournament
                    until tournament manager add it again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTournament}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        )}
        {role === "coach_outside" && (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleRequistTojoin}>
              <Send className="mr-2 h-4 w-4" />
              <span>Request to join</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {role === "refree" && (
          <DropdownMenuGroup>
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                {" "}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />

                  <span>Leave Tournament</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone, You will leave tournament
                    until tournament manager add you again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTournamentForRefree}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>Info</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
