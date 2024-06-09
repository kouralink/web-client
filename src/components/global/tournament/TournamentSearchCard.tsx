import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tournament } from "@/types/types";


interface TournamentSearchCardProps {
  result: Tournament;
}

const TournamentSearchCard: React.FC<TournamentSearchCardProps> = ({ result }) => {
  return (
    <div>
      <Link to={`/tournament/page/${result.name}`}>
        <div className="flex justify-between items-center ">
          <div className="flex items-center p-5">

            <Avatar className="w-24 h-24 rounded-full object-cover">
              <AvatarImage src={result.logo} alt="" className="object-cover" />
              <AvatarFallback>{result.name.charAt(0).toUpperCase()}{result.name.charAt(1).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h1 className="flex flex-col p-5 font-bold ">{result.name}</h1>
          </div>
          <Button>Open Tournament Page</Button>
        </div>
      </Link>
      <Separator />
    </div>
  );
};

export default TournamentSearchCard;
