import React from "react";
import { Match } from "@/types/types";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface statusSelectType {
  variant: "outline" | "default" | "secondary";
  value: string;
}

const MatchRecordCardIteam: React.FC<Match> = (props) => {
  const statusSelect = {
    pending: { variant: "outline", value: "Pending" } as statusSelectType,
    finish: { variant: "default", value: "Finished" } as statusSelectType,
    cancled: { variant: "secondary", value: "Cancled" } as statusSelectType,
    coachs_edit: {
      variant: "outline",
      value: "Coaches editing",
    } as statusSelectType,
    refree_waiting: {
      variant: "default",
      value: "Refree waiting",
    } as statusSelectType,
    in_progress: {
      variant: "default",
      value: "In progress",
    } as statusSelectType,
  };
  return (
    <Link to={`/matches/page/${props.id}`}>
      <Card
        className={[
          "flex flex-col w-full md:w-[600px] rounded-lg justify-between items-center py-2 px-8 text-card-foreground hover:bg-secondary",
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
              <AvatarFallback>{props.team1.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="">{props.team1.name}</h2>
          </div>
          {/* <span className="text-2xl">2-4</span> */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl">
              {props.team1.score}-{props.team2.score}
            </div>

            <div className="text-muted-foreground text-sm flex gap-2">
              <span>Status :</span>
              <Badge variant={statusSelect[props.status].variant}>
                {statusSelect[props.status].value}
              </Badge>
            </div>
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
              <AvatarFallback>{props.team2.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2>{props.team2.name}</h2>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default MatchRecordCardIteam;
