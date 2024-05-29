
import { Member } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberDropDownMenu } from "../MemberDropDownMenu";


type MemberCardProps = {
  role: "user" | "coach" | "member";
  member: Member;
};

const MemberCard: React.FC<MemberCardProps> = (props) => {
  
  
  return (
    <Card
      className={"flex w-[280px] rounded-lg p-2 justify-between items-center"}
    >
      <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
        <div className="flex  items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={props.member.userInfo?.avatar}
              alt={props.member.userInfo?.username || " a " + " avatar"}
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
        <MemberDropDownMenu teamId={props.member.team_id} uid={props.member.uid} role={props.role} isAdmin={props.member.role === "coach"} username={props.member.userInfo?.username || ''} />
      </CardContent>
    </Card>
  );
};

export default MemberCard;
