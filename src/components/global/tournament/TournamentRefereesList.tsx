import {  User } from "@/types/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RefreeCard from "./cards/RefreeCard";

interface PropsState {
  referee: User[];
}

export default function TournamentRefereesList(props: PropsState) {
  return (
    <Card className=" flex flex-col py-4 px-2 gap-4 w-full h-full">
      <div className="flex flex-col gap-2 w-full">
        <h2>Referees List</h2>
        <div className=" ml-4">
          <ScrollArea className="min-h-52 h-full w-full">
            {props.referee.map((referee) => {
              return <RefreeCard key={referee.username} userInfo={referee} />;
            })}
            {props.referee.length === 0 && (
              <p className="text-muted-foreground">No Refrees yet</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}
