import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Timestamp } from "@firebase/firestore-types";

export type sidebarNavItemType = {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};

export interface Member {
  uid: string;
  joinedAt: string;
  role: string;
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
  members: Member[];
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
