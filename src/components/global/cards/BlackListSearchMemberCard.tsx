import { Separator } from "@/components/ui/separator";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { dispandUserFromTeamBlackList } from "@/state/team/teamSlice";

interface BlackListSearchMemberCardProps {
  result: User;
  id:string
}

const BlackListSearchMemberCard: React.FC<BlackListSearchMemberCardProps> = ({ result,id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDisband = async () => {
    console.log("Disband",id);
    dispatch(dispandUserFromTeamBlackList({ uid:id}));
  };
  return (
    <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center p-5">
            {result.avatar ? (
              <img
                src={result.avatar}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="rounded-full bg-gray-300 w-24 h-24"></div>
            )}
            <h1 className="flex flex-col p-5 font-bold ">
              ({result.username})
            </h1>
          </div>
          <Button onClick={handleDisband}>Disband</Button>
        </div>
      <Separator />
    </div>
  );
};

export default BlackListSearchMemberCard;
