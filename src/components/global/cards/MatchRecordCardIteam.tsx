import React from "react";
import { MatchState } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MatchRecordCardIteam: React.FC<MatchState> = (props) => {
  return (
    <Card
      className={["flex  w-[600px] rounded-lg  justify-between items-center py-2 px-8 ", props.team1.teamScore >= props.team2.teamScore ? props.team1.teamScore == props.team2.teamScore ? "bg-yellow-100":"bg-green-100" : "bg-red-100"].join(" ")}
    >
      <CardHeader className="flex flex-row w-full items-center justify-between gap-4 m-0 p-0 ">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{props.team1.teamName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.team1.teamName}</h2>
        </div>
        {/* <span className="text-2xl">2-4</span> */}
        <div className="flex flex-col items-center justify-center">

        <div className="text-2xl">
          {props.team1.teamScore}
          -
          {props.team2.teamScore}
        </div>
        <div className="text-sm ">
          Referee{" "}{props.referee}
        </div>
        <div className="text-sm ">
          Staduim{" "}{props.matchLocation}
        </div>
        <div className="text-muted-foreground text-sm">
          {props.matchDate}
          {" "}
          {props.matchTime}
        </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{props.team2.teamName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.team2.teamName}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        
      </CardContent>
    </Card>
  );
};

export default MatchRecordCardIteam;
