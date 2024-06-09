import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { tournament } from "@/types/types";
import TournamentDropDownMenu from "./cards/TournamentHeaderDropDownMenu";

type TeamHeaderProps = {
  role:
    | "user"
    | "coach_inside"
    | "refree"
    | "tournament_manager"
    | "coach_outside";
} & tournament;

const TeamHeader: React.FC<TeamHeaderProps> = (props) => {
  return (
    <Card
      className={"flex w-full rounded-lg p-2 justify-between items-center  "}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={props.logo}
              alt={props.name + " logo"}
              className="object-cover"
            />
            <AvatarFallback>{props.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.name}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <span>1</span>
        <Star />
        <TournamentDropDownMenu tourname={props.name} role={props.role} />
      </CardContent>
    </Card>
  );
};

export default TeamHeader;
