import {
  ArrowLeftRight,
  BadgePlus,
  Info,
  LogOut,
  PenLine,
  Send,
  UserPlus,
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { sendRequestToJoinTeam } from "@/state/notification/notificationSlice";
import {SearchTeamProfile} from "./SearchTeamProfile";
import { leaveTeam } from "@/state/team/teamSlice";


export function TeamDropDownMenu({
  teamname,
  role,
}: {
  teamname: string;
  role: "user" | "coach" | "member";
}) {
  const teamId = useSelector((state: RootState) => state.team.team.id);
  const dispatch = useDispatch<AppDispatch>();
  const handleRequistTojoin = async () => {
    console.log("Request to join 1");
    await dispatch(sendRequestToJoinTeam({ to: teamId }));
  };

  const handleLeaveTeam = async () => {
    console.log("Leave team");
    await dispatch(leaveTeam(teamId))
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
        {role === "coach" && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgePlus className="mr-2 h-4 w-4" />
              <span>New Match</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span><SearchTeamProfile /></span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>

            <Link to={`/team/update/${teamname}`}>
              <DropdownMenuItem>
                <PenLine className="mr-2 h-4 w-4" />
                <span>Update team</span>
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              <span>Change coach</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {role === "member" && (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLeaveTeam}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Leave team</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        {role === "user" && (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleRequistTojoin}>
              <Send className="mr-2 h-4 w-4" />
              <span>Request to join</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>Details</span>
            <DropdownMenuShortcut>info</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
