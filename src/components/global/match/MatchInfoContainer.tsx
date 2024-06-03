import { MatchFirestore, User } from "@/types/types";
import MatchHeader from "./cards/MatchHeader";
import MatchDetails from "./cards/MatchDetails";
import { MatchDetailsForm } from "./cards/MatchDetailsForm";

type MatchInfoContainerProps = {
  isItRefree: boolean;
  role: "user" | "coach" | "member";
  refree_user_info: User | null;
} & MatchFirestore;

const MatchInfoContainer: React.FC<MatchInfoContainerProps> = (props) => {
  console.log(props.role)
  return (
    <div className="flex flex-col gap-2 w-fit">
      <MatchHeader
        isRefree={props.isItRefree}
        score1={props.team1.score}
        score2={props.team2.score}
        status={props.status}
      />
      { props.role === "coach" && props.status === "coachs_edit"  ? (
        <MatchDetailsForm location={props.location} refree_id={props.refree.id} startin={props.startIn?.toDate()} /> 
      ) : (
        <MatchDetails {...props} refree_user_info={props.refree_user_info} />
      )}
    </div>
  );
};

export default MatchInfoContainer;
