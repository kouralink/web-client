import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Team } from "@/types/types";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/state/store";

interface TeamSearchCardForNewMatchProps {
  result: Team;
  id: string;
}

const TeamSearchCardForNewMatch: React.FC<TeamSearchCardForNewMatchProps> = ({
  result,
  id,
}) => {
  // const dispatch = useDispatch<AppDispatch>();
  const handleChallenege = async () => {
    console.log("new Match", id);
    // dispatch(({ to: id }));
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
        <Button onClick={handleChallenege}>Send Challenege Request</Button>
      </div>
      <Separator />
    </div>
  );
};

export default TeamSearchCardForNewMatch;
