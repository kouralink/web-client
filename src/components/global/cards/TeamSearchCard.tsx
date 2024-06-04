import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SearchedUser {
  teamLogo: string;
  teamName: string;
}

interface UserSearchCardProps {
  result: SearchedUser;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({ result }) => {
  return (
    <div>
      <Link to={`/team/page/${result.teamName}`}>
        <div className="flex justify-between items-center ">
          <div className="flex items-center p-5">

            <Avatar className="w-24 h-24 rounded-full object-cover">
              <AvatarImage src={result.teamLogo} alt="" className="object-cover" />
              <AvatarFallback>{result.teamName.charAt(0).toUpperCase()}{result.teamName.charAt(1).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h1 className="flex flex-col p-5 font-bold ">{result.teamName}</h1>
          </div>
          <Button>Open Team Page</Button>
        </div>
      </Link>
      <Separator />
    </div>
  );
};

export default UserSearchCard;
