import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Tournament } from "@/types/types";
import TournamentDropDownMenu from "./cards/TournamentHeaderDropDownMenu";

type TournamentHeaderProps = {
  role:
    | "user"
    | "coach_inside"
    | "refree"
    | "tournament_manager"
    | "coach_outside";
} & Tournament;

const TournamentHeader: React.FC<TournamentHeaderProps> = (props) => {
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
        <TournamentDropDownMenu
          role={props.role}
          tourid={props.id}
        />
      </CardContent>
    </Card>
  );
};

export default TournamentHeader;
