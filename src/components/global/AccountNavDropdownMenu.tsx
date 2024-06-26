import {
  FlameKindling,
  Loader2,
  LogOut,
  Plus,
  RefreshCcw,
  Settings,
  TestTube,
  Timer,
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
import { ChangeAccountType } from "./ChangeAccountType";
import { useEffect, useState } from "react";
import { getMemberTeamName } from "@/state/team/teamSlice";
import { getTournamentManagerTournament } from "@/state/notification/notificationSlice";
import { Tournament } from "@/types/types";

export function AccountNavDropdownMenu() {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const auth = useSelector((state: RootState) => state.auth);
  const authUser = auth.user;
  const dispatch = useDispatch<AppDispatch>();
  const accountType = authUser?.accountType;
  const uid = auth?.uid;
  const [teamName, setTeamName] = useState<string | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    if (uid && (accountType === "coach" || accountType === "player")) {
      getMemberTeamName(uid).then((teamName) => {
        if (!teamName) {
          console.log("Error getting coach team name");
          return;
        }
        setTeamName(teamName);
      });
    } else if (uid && accountType === "tournament_manager") {
      getTournamentManagerTournament().then((tournament) => {
        if (!tournament) {
          console.log("Error getting tournament manager tournament");
          return;
        }
        if (typeof tournament === "object" && tournament !== null) {
          setTournament(tournament);
        }
      });
    }
  }, [accountType, uid]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={authUser?.avatar ? authUser?.avatar : ""}
            alt={"logo of " + authUser?.username}
            className="object-cover"
          />
          <AvatarFallback>
            {authUser?.username ? authUser?.username.charAt(0) : "N"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {authUser?.username ? authUser?.username : "My"} Account{" "}
          <span className="capitalize">({authUser?.accountType})</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"/users/profile/me"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to={"/settings"}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {teamName && (
          <DropdownMenuGroup>
            <Link to={`/team/page/${teamName}`}>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team {teamName}</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}

        {authUser?.accountType === "refree" && (
          <DropdownMenuGroup>
            <Link to={`/referee/matches/${uid}`}>
              <DropdownMenuItem>
                <Timer className="mr-2 h-4 w-4" />
                <span>Matches</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}

        {authUser?.accountType === "coach" && (
          <DropdownMenuGroup>
            <Link to={"/team/create"}>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}

        {authUser?.accountType === "tournament_manager" && (
          <DropdownMenuGroup>
            <Link to={"/tournament/create"}>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Tournament</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            {tournament?.id && (
              <Link to={`/tournament/page/${tournament?.id}`}>
                <DropdownMenuItem>
                  <FlameKindling className="mr-2 h-4 w-4" />
                  <span>Tournament ({tournament?.name})</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            <span>
              <ChangeAccountType />
            </span>
            <DropdownMenuShortcut>⌘+C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Link to={"/tournament/test"}>
          <DropdownMenuItem>
            <TestTube className="mr-2 h-4 w-4" />
            <span>Test brackets</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
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
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
