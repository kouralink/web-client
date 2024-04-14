import dynamicIconImports from "lucide-react/dynamicIconImports";

export type sidebarNavItemType = {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}
export interface Team {
  id: string;
  teamName: string;
  blackList: string[];
  coach: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  teamLogo: string | null | undefined;
  description: string | null;
  createdBy: string;
}

export interface TeamState {
  team: Team;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
}

export interface TeamMatchState {
  teamId: string;
  teamLogo: string;
  teamName: string;
  teamScore: number;
}

export interface MatchState {
  team1: TeamMatchState;
  team2: TeamMatchState;
  referee: string;
  matchDate: string;
  matchTime: string;
  matchLocation: string;
  matchStatus: string;
}

export interface MemberState {
  username: string;
  logo: string;
  uid: string;
}

