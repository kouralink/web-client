import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface SearchCardProps {
  path: string;
  title: string;
  name: string;
  avatar: string;
}

const SearchCard: React.FC<SearchCardProps> = ({ path, title, name, avatar }) => {
  return (
    <div>
      <Link to={`${path}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center p-5">

            <Avatar className="w-24 h-24 rounded-full object-cover">
              <AvatarImage src={avatar} alt="" className="object-cover" />
              <AvatarFallback>{name.charAt(0).toUpperCase()}{name.charAt(1).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h1 className="flex flex-col p-5 font-bold ">{name}</h1>
          </div>
          <Button>{title}</Button>
        </div>
      </Link>
      <Separator />
    </div>
  );
};

export default SearchCard;
