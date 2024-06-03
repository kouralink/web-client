import { Separator } from "@/components/ui/separator";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserSearchCardProps {
  result: User;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({ result }) => {
  return (
    <div>
      <Link to={`/users/profile/${result.username}`}>
        <div className="flex justify-between items-center px-5">
          <div className="flex items-center p-5">

            <Avatar className="w-24 h-24 rounded-full object-cover">
              <AvatarImage src={result.avatar} alt="" className="object-cover" />
              <AvatarFallback>{result.username.charAt(0).toUpperCase()}{result.username.charAt(1).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h1 className="flex flex-col font-bold ">
              {result?.firstName} {result?.lastName}
            </h1>
          </div>
          <Button>View Profile</Button>
        </div>
      </Link>
      <Separator />
    </div>
  );
};

export default UserSearchCard;
