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
  role: "coach" | "member";
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



// ------------- team Match State -------------
export interface TeamMatchState {
  teamId: string;
  teamLogo: string;
  teamName: string;
  teamScore: number | null;
}

export interface Match {
  id: string;
  team1: TeamMatchState;
  team2: TeamMatchState;
  referee_id: string|null;
  matchStartDate: Timestamp|null;
  matchLocation: string|null;
  matchStatus: "pending"|"finish"|"cancled";
  type:"tournement"|"classic_match"
  
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

export interface NotificationAction {
  actionType: "accept" | "decline" | "view" | null;
  actionUrl: string;
}

export interface Notification {
  id: string;
  from_id: string;
  to_id: string;
  title: string;
  message: string;
  createdAt: Timestamp;
  action: NotificationAction;
  type:
    | "info"
    | "request_to_join_team"
    | "request_to_join_tournement"
    | "match_chalenge"
    | "invite_to_team"
    | "invite_to_tournement"
    
    ;
}
