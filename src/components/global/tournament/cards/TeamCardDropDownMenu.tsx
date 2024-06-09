import { Ban, Users } from "lucide-react";

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
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { kickTeam } from "@/state/tournament/tournamentSlice";

export function TeamDropDownMenu({
  role,
  teamId,
  teamName,
}: {
  role: "tournament_manager" | "user";
  teamId: string;
  teamName: string;
}) {

  const tournament = useSelector((state: RootState) => state.tournament.tournament);

  const dispatch = useDispatch<AppDispatch>();
  const handleKickAciton = async () => {
    // confirm kick
    dispatch(kickTeam({ teamId, tournamentId: tournament.id }))
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
        <DropdownMenuLabel>Team Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/team/page/${teamName}`}>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Team Page</span>
              <DropdownMenuShortcut>open</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          {role === "tournament_manager" && (
            <DropdownMenuGroup>
              <AlertDialog>
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
                      This action cannot be undone, and will remove the Team{" "}
                      {teamName} from team
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
            </DropdownMenuGroup>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
