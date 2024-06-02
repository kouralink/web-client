import { MatchFirestore, User } from "@/types/types";
import MatchHeader from "./cards/MatchHeader";
import MatchDetails from "./cards/MatchDetails";

type MatchInfoContainerProps = {
  isItRefree: boolean;
  role: "user" | "coach" | "member";
  refree: User | null;
} & MatchFirestore;

const MatchInfoContainer: React.FC<MatchInfoContainerProps> = (props) => {
  return (
    <div className="flex flex-col gap-2 w-fit">
      <MatchHeader
        isRefree={props.isItRefree}
        score1={props.team1.score}
        score2={props.team2.score}
        status={props.status}
      />
      <MatchDetails {...props} refree={props.refree} />
    </div>
  );
};

export default MatchInfoContainer;
