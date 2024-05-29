import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <Button>Open Team Page</Button>
        </div>
      </Link>
      <Separator />
    </div>
  );
};

export default UserSearchCard;
