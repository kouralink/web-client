import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Timestamp } from "@firebase/firestore";

export type sidebarNavItemType = {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};

export interface Member {
  uid: string;
  joinedAt: string;
  team_id: string;
  role: string;
  userInfo: User | null;
}
export interface Team {
  id: string;
  teamName: string;
  blackList?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  teamLogo: string;
  description: string;
  createdBy: string;
}

export interface TeamState {
  team: Team;
  members: Member[];
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

export interface User {
  username: string;
  accountType: "user" | "coach" | "tournement_manager" | "refree" | "player";
  bio?: string;
  birthday?: Timestamp;
  joinDate?: Timestamp;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female";
  phoneNumbers?: string[];
  address?: string;
  avatar?: string;
}
export interface UserUpdate {
  username?: string;
  bio?: string;
  birthday?: Timestamp;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female";
  phoneNumbers?: string[];
  address?: string;
  avatar?: string;
}

export interface UserState {
  user: User;
  uid: string;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
}

export interface Notification {
  id: string;
  from_id: string;
  to_id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
  type:
    | "info"
    | "request_to_join_team"
    | "request_to_join_tournement"
    | "match_chalenge"
    | "invite_to_team"
    | "invite_to_tournement";
}
