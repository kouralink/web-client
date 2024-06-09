import {  Team } from "@/types/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamCard from "./cards/TeamCard";

interface PropsState {
  teams: Team[];
  isManager: boolean
}

export default function TournamentTeamsList(props: PropsState) {
  return (
    <Card className=" flex flex-col py-4 px-2 gap-4 w-full h-full">
          <div className="flex flex-col gap-2 w-full">
            <h2>Teams</h2>
            <div className=" ml-4">
              <ScrollArea className="min-h-52 h-full w-full">
                {props.teams.map((team) => {
                    return <TeamCard key={team.id} team={team} role={props.isManager ? "tournament_manager":"user"} />;
                })}
                {props.teams.length === 0 && (
                  <p className="text-muted-foreground">No teams yet</p>
                )}
              </ScrollArea>
            </div>
          </div>

    </Card>
  );
}
