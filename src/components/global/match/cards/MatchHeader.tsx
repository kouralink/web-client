import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MatchStatus } from "@/types/types";

interface MatchHeaderProps {
  isRefree: boolean;
  score1: number | null;
  score2: number | null;
  status: MatchStatus;
}

interface statusSelectType {
  variant: "outline" | "default" | "secondary"  ;
  value: string;
}

const MatchHeader: React.FC<MatchHeaderProps> = (props) => {
  const statusSelect = {
    pending: {variant:"outline",value:"Pending"} as statusSelectType,
    finish: {variant:"default",value:"Finished"}  as statusSelectType,
    cancled: {variant:"secondary",value:"Cancled"}  as statusSelectType,
    coachs_edit: {variant:"outline",value:"Coaches editing"}  as statusSelectType,
    refree_waiting: {variant:"default",value:"Refree waiting"}  as statusSelectType,
    in_progress: {variant:"default",value:"In progress"}  as statusSelectType,
  };
  const handelEdit = () => {
    console.log("Edit");
  }
  const handelEnd = () => {
    console.log("End");
  }
  const handelCancel = () => {
    console.log("Cancel");
  }
  return (
    <Card
      className={[
        "flex flex-col  w-[600px] rounded-lg  justify-between items-center py-2 px-8 text-card-foreground ",
        // , (props.team1.score !== null && props.team2.score !== null) && props.team1.score >= props.team2.score ? props.team1.score == props.team2.score ? "bg-yellow-100 dark:bg-yellow-800":"bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
      ].join(" ")}
    >
      <CardHeader className="flex flex-row w-full items-center justify-between gap-4 m-0 p-0 ">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-6xl flex gap-1 font-mono w-full items-center justify-center">
            <span>{props.score1}</span>
            <span>-</span>
            <span> {props.score2}</span>
          </div>
          <div className="text-muted-foreground text-sm flex gap-2">
            <span>Status :</span><Badge variant={statusSelect[props.status].variant}>{statusSelect[props.status].value}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        {props.isRefree && (
          <div className="flex gap-2 p-4">
            <Button variant={"outline"} onClick={handelEdit}>Edit Result</Button>
            <Button onClick={handelEnd}>Match has ended</Button>
            <Button variant={"destructive"} onClick={handelCancel}>Match has canceled</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
