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
  teamLogo: string | null;
  description: string | null;
  createdBy: string;
}

export interface TeamState {
  team: Team;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
}


