import { Team } from "@/types/types";
import MatchTeamHeader from "./cards/MatchTeamHeader";
import MatchTeamMembers from "./cards/MatchTeamMembers";

type MatchTeamContainerProps = {
  role: "user" | "coach" | "member";
} & Team;

const MatchTeamContainer: React.FC<MatchTeamContainerProps> = (props) => {

    
  return (
    <div className="flex flex-col gap-2 w-fit">
        <MatchTeamHeader {...props} />
        {/* <MatchTeamMembers   /> */}
    </div>
  );
};

export default MatchTeamContainer;
