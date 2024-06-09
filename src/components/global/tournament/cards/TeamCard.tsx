
import {  Team } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamDropDownMenu } from "./TeamCardDropDownMenu";


type TeamCardProps = {
  role: "tournament_manager" | "user";
  team: Team;
};

const TeamCard: React.FC<TeamCardProps> = (props) => {
  
  
  return (
    <Card
      className={"flex w-[280px] rounded-lg p-2 justify-between items-center"}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={props.team.teamLogo}
              alt={props.team.teamName || " a " + " logo"}
              className="object-cover"
            />
            <AvatarFallback>
              {props.team.teamName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2>{props.team.teamName}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <TeamDropDownMenu role={props.role} teamId={props.team.id} teamName={props.team.teamName} />
      </CardContent>
    </Card>
  );
};

export default TeamCard;
