import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Team } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { inviteToJoinTournament } from "@/state/notification/notificationSlice";

interface TeamSearchCardForInviteProps {
  result: Team;
  id: string;
}

const TeamSearchCardForInvite: React.FC<TeamSearchCardForInviteProps> = ({
  result,
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleInvite = async () => {
    console.log("Invite team Id : ", id);
    dispatch(inviteToJoinTournament({ to: id }));
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center p-5">
          {result.teamLogo ? (
            <img
              src={result.teamLogo}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="rounded-full bg-gray-300 w-24 h-24"></div>
          )}
          <h1 className="flex flex-col p-5 font-bold ">{result.teamName}</h1>
        </div>
        <Button onClick={handleInvite}>Invite</Button>
      </div>
      <Separator />
    </div>
  );
};

export default TeamSearchCardForInvite;
