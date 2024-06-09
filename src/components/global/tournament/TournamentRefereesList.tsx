import { User } from "@/types/types";
import { Card } from "@/components/ui/card";
import RefreeCard from "./cards/RefreeCard";

interface PropsState {
  referees: User[];
}

export default function TournamentRefereesList(props: PropsState) {
  return (
    <Card className=" flex flex-col py-6 px-2 gap-4 w-full h-full ">
      <div className="flex flex-col gap-2 w-full">
        <h2>Referees List</h2>
        <div className=" ml-4 flex">
          <div className="h-full w-full flex flex-wrap gap-2">
            {props.referees.map((referee) => (
              <RefreeCard key={referee.username} userInfo={referee} />
            ))}
            {props.referees.length === 0 && (
              <p className="text-muted-foreground">No Refrees yet</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
