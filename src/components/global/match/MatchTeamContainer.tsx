import { Member, Team } from "@/types/types";
import MatchTeamHeader from "./cards/MatchTeamHeader";
import MatchTeamMembers from "./cards/MatchTeamMembers";

type MatchTeamContainerProps = {
  role: "user" | "coach" | "member";
} & Team & {teamMembers: Member[]} & {coach: Member | null};

const MatchTeamContainer: React.FC<MatchTeamContainerProps> = (props) => {

    
  return (
    <div className="flex flex-col gap-2 w-full">
        <MatchTeamHeader {...props} />
        <MatchTeamMembers members={props.teamMembers} coach={props.coach}  />
    </div>
  );
};

export default MatchTeamContainer;
