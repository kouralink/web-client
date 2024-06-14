import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Timestamp } from "@firebase/firestore";

export type sidebarNavItemType = {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};

export type FilterProgressStatus =
  | "pending"
  | "in_progress"
  | "finish"
  | "cancled"
  | "all"
  | null

export interface Member {
  uid: string;
  joinedAt: Timestamp;
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
  blackListInfos: { user_info: User; uid: string }[];
  MatchesHistory: Match[];
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
  trackQuery: { lastDoc: any, status: FilterProgressStatus };
}

// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// this interface is old and it well replaced with above one when update matchrecordcardIteam component
// Warning : this interface is not used in the project
export interface TeamMatchState {
  teamId: string;
  teamLogo: string;
  teamName: string;
  teamScore: number | null;
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
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
export interface MemberState {
  username: string;
  logo: string;
  uid: string;
}
type accountT = "user" | "coach" | "refree" | "tournament_manager" | "player";

export interface User {
  username: string;
  accountType: accountT;
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
  refereeMatches: Match[];
  team: Team | null;
}

export type Action = "accept" | "decline" | "view";
// export interface NotificationAction {
//   actionType: Action | null;
// }

type NotificationType = "info"
  | "request_to_join_team"
  | "request_to_join_tournament"
  | "match_chalenge"
  | "refree_invite"
  | "invite_to_team"
  | "invite_to_tournament"
  | "invite_referee_to_tournament";
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

interface AddedToTeamMatch {
  logo: string;
  name: string;
}

export interface TeamMatch {
  id: string;
  score: number | null;
  isAgreed: boolean;
}
export type MatchStatus =
  | "coachs_edit"
  | "refree_waiting"
  | "pending"
  | "in_progress"
  | "finish"
  | "cancled";

export interface MatchFirestore {
  id: string;
  team1: TeamMatch;
  team2: TeamMatch;
  refree: {
    id: string | null;
    isAgreed: boolean;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startIn: Timestamp | null;
  endedAt: Timestamp | null;
  location: string | null;
  status: MatchStatus;
  type: "tournament" | "classic_match";
}

export interface Match {
  id: string;
  team1: TeamMatch & AddedToTeamMatch;
  team2: TeamMatch & AddedToTeamMatch;
  refree: {
    id: string;
    isAgreed: boolean;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startIn: Timestamp | null;
  endedAt: Timestamp | null;
  location: string | null;
  status: MatchStatus;
  type: "tournament" | "classic_match";
}
// tournament

// ------------- Tournament Stages State -------------
export interface TournamentStage {
  stage_number: string;
  matches: Match[];
}


// -------------------------------
export interface SearchedTournament {
  id: string;
  tournament_info: Tournament;
}

// ------------- Tournament State -------------
export interface Tournament {
  id: string;
  name: string;
  logo: string;
  description: string;
  start_date: Timestamp;
  end_date: Timestamp | null;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  manager_id: string;
  refree_ids: string[];
  location: string;
  participants: string[];
  status: "pending" | "in-progress" | "finish" | "cancled";
  min_members_in_team: number;
  max_participants: number;
}
