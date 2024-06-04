import React from "react";
import { Match } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const MatchRecordCardIteam: React.FC<Match> = (props) => {
  return (
    <Card
      className={[
        "flex flex-col w-full md:w-[600px] rounded-lg  justify-between items-center py-2 px-8 text-card-foreground ",
        // , (props.team1.score !== null && props.team2.score !== null) && props.team1.score >= props.team2.score ? props.team1.score == props.team2.score ? "bg-yellow-100 dark:bg-yellow-800":"bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
      ].join(" ")}
    >
      <CardHeader className="flex flex-row w-full items-center justify-between gap-4 m-0 p-0 ">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={props.team1.logo}
              alt={props.team1.name + " logo"}
              className="object-cover"
            />
            <AvatarFallback>{props.team1.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="">{props.team1.name}</h2>
        </div>
        {/* <span className="text-2xl">2-4</span> */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl">
            {props.team1.score}-{props.team2.score}
          </div>
          {props.location ? (
            <div className="text-sm ">
              Location :{" "}
              <a
                href={props.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-500"
              >
                Open
              </a>
            </div>
          ) : (<span className="text-muted-foreground">Match not started yet</span>)}
          <div className="text-muted-foreground text-sm">
            {props.startIn?.toDate().toLocaleString()}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={props.team2.logo}
              alt={props.team1.name + " logo"}
              className="object-cover"
            />
            <AvatarFallback>{props.team2.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2>{props.team2.name}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <Link to={`/matches/page/${props.id}`}>Open</Link>
      </CardContent>
    </Card>
  );
};

export default MatchRecordCardIteam;
