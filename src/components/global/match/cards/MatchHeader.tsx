import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MatchHeaderProps {
  isRefree: boolean;
  score1: number | null;
  score2: number | null;
  status: "pending" | "finish" | "cancled";
}

const MatchHeader: React.FC<MatchHeaderProps> = (props) => {
  return (
    <Card
      className={[
        "flex flex-col  w-[600px] rounded-lg  justify-between items-center py-2 px-8 text-card-foreground ",
        // , (props.team1.score !== null && props.team2.score !== null) && props.team1.score >= props.team2.score ? props.team1.score == props.team2.score ? "bg-yellow-100 dark:bg-yellow-800":"bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
      ].join(" ")}
    >
      <CardHeader className="flex flex-row w-full items-center justify-between gap-4 m-0 p-0 ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl">
            {props.score1}-{props.score2}
          </div>
          <div className="text-muted-foreground text-sm">
            Status:<Badge variant="outline">{props.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        {props.isRefree && (
          <div>
            <Button>Edit Result</Button>
            <Button>End Match</Button>
            <Button>Cancel Match</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
