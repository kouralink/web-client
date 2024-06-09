import {  Team } from "@/types/types";
import { Card } from "@/components/ui/card";
import TeamCard from "./cards/TeamCard";

interface PropsState {
  teams: Team[];
  isManager: boolean
}

export default function TournamentTeamsList(props: PropsState) {
  return (
    <Card className=" flex flex-col py-6 px-2 gap-4 w-full h-full">
          <div className="flex flex-col gap-2 w-full">
            <h2>Teams List</h2>
            <div className=" ml-4">
              <div className="h-full w-full flex flex-wrap gap-2">
                {props.teams.map((team) => {
                    return <TeamCard key={team.id} team={team} role={props.isManager ? "tournament_manager":"user"} />;
                })}
                {props.teams.length === 0 && (
                  <p className="text-muted-foreground">No teams yet</p>
                )}
              </div>
            </div>
          </div>
    </Card>
  );
}
