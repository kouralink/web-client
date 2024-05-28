import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { TeamDropDownMenu } from "./TeamDropDownMenu";
import { Team } from "@/types/types";

type TeamHeaderProps = {
  role: "user" | "coach" | "member";
} & Team;

const TeamHeader: React.FC<TeamHeaderProps> = (props) => {
  return (
    <Card
      className={"flex w-full rounded-lg p-2 justify-between items-center  "}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={props.teamLogo} alt={props.teamName + " logo"}  className="object-cover" />
            <AvatarFallback>{props.teamName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.teamName}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <span>3.5K</span>
        <Star />
        <TeamDropDownMenu teamname={props.teamName} role={props.role} />
      </CardContent>
    </Card>
  );
};

export default TeamHeader;
