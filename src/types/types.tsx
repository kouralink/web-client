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
  blackListInfos: {user_info:User,uid:string}[];
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
}




// this interface is old and it well replaced with above one when update matchrecordcardIteam component
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

export type Action = "accept" | "decline" | "view" ;
// export interface NotificationAction {
//   actionType: Action | null;
// }

export type NotificationType = "info" | "request_to_join_team" | "request_to_join_tournement" | "match_chalenge" | "invite_to_team" | "invite_to_tournement";
export interface Notification {
  id: string;
  from_id: string;
  to_id: string;
  title: string;
  message: string;
  createdAt: Timestamp;
  action: Action | null;
  type: NotificationType;
}




// ------------- team Match State -------------
export interface TeamMatchState {
  teamId: string;
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
// tournament

 
  
  // ------------- Tournament Stages State -------------
  export interface TournamentStage {
    stage_number: string;
    matches: Match[];
  }
  
  // ------------- Tournament State -------------
  export interface tournament {
    id: string;
    tournamentName: string;
    tournamentLogo: string;
    description: string;
    startDate: string;
    endDate: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    createdBy: string;
    participants: string[];
    status: "pending" | "in-progress" | "finish" | "cancled";
    stages: TournamentStage[];
  }