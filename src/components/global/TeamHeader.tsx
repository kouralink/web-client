import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { TeamDropDownMenu } from "./TeamDropDownMenu";

export interface TeamHeaderProps {
    teamname: string;
    logo: string;
    stars: number;
    teamId: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = (props) => {
  return (
    <Card
      className={"flex w-full rounded-lg p-2 justify-between items-center  "}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{props.teamname.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.teamname}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <span>3.5K</span>
        <Star />
        <TeamDropDownMenu />
      </CardContent>
    </Card>
  );
};

export default TeamHeader;
