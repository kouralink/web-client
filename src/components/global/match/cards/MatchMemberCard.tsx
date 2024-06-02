import { Member } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

type MatchMemberCardProps = {
  member: Member;
};

const MatchMemberCard: React.FC<MatchMemberCardProps> = (props) => {
  return (
    <Card
      className={"flex w-[280px] rounded-lg p-2 justify-between items-center gap-6"}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={props.member.userInfo?.avatar}
              alt={props.member.userInfo?.username || " avatar"}
              className="object-cover"
            />
            <AvatarFallback>
              {props.member.userInfo?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2>{props.member.userInfo?.username}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
        <Link to={`/users/profile/${props.member.userInfo?.username}`}>
          <User className="mr-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default MatchMemberCard;
