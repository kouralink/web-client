import {
  ArrowLeftRight,
  BadgePlus,
  LogOut,
  PenLine,
  Send,
  UserPlus,
} from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
import { sendRequestToJoinTeam } from "@/state/notification/notificationSlice";
import SearchUsersProfile from "./SearchUsersProfile";
import { leaveTeam, leaveTeamForCoach } from "@/state/team/teamSlice";
import { InfoTeamProfileCard } from "@/components/global/cards/InfoTeamProfileCard";
import { Separator } from "@/components/ui/separator";
import { Timestamp } from "firebase/firestore";
import { ChangeCoach } from "./ChangeCoachMembersList";
import { SearchBlackListTeam } from "./SearchBlackListTeam";
import SearchTeamsForNewMatch from "./SearchTeamsForNewMatch";

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
    await dispatch(leaveTeam(teamId));
  };
  const handleLeaveTeamForCoach = async () => {
    console.log("Leave team for coach");
    await dispatch(leaveTeamForCoach(teamId));
  };

  const team = useSelector((state: RootState) => state.team.team);
  const timestamp = new Timestamp(
    team.createdAt.seconds || 0,
    team.createdAt.nanoseconds || 0
  );

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
            <DropdownMenuItem onSelect={(e) => {
              e.preventDefault();
            }}>
              <BadgePlus className="mr-2 h-4 w-4" />
              <span><SearchTeamsForNewMatch /></span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>
                <SearchUsersProfile />
              </span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>

            <Link to={`/team/update/${teamname}`}>
              <DropdownMenuItem>
                <PenLine className="mr-2 h-4 w-4" />
                <span>Update team</span>
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <SearchBlackListTeam />
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />

              <span>
                <ChangeCoach />
              </span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
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

                  <span>Leave team</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone, This team will be delete after coach left!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTeamForCoach}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        )}
        {role === "member" && (
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

                  <span>Leave team</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone, You will leave this team until
                    coach of team add you again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTeam}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

        <Dialog>
          <DialogTrigger asChild className="w-full">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <InfoTeamProfileCard
                description={team.description}
                createdBy={team.createdBy}
                createdAt={team.createdAt}
              />
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div>
              <h1 className="text-xl font-bold mb-2 p-5">Information</h1>
              <Separator className="border-r-2" />
              {team.description != undefined && (
                <p className="break-words w-[350px] flex flex-col p-3">
                  {" "}
                  <span className="font-bold">Description</span>{" "}
                  {team.description}
                </p>
              )}
              <Separator />
              {team.createdBy != undefined && (
                <p className="flex flex-col p-3">
                  <span className="font-bold">Create By</span> {team.createdBy}
                </p>
              )}
              <Separator />
              {team.createdAt != undefined && (
                <p className="flex flex-col p-3">
                  <span className="font-bold">Create At</span>{" "}
                  {timestamp.toDate().toDateString()
                    ? timestamp.toDate().toDateString()
                    : "add birthday in settings"}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
