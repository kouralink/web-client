import { Separator } from "@/components/ui/separator";
import { Team } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Timestamp } from "firebase/firestore";


interface TeamProfileCardProps {
    team: Team;
}

const TeamProfileCard: React.FC<TeamProfileCardProps> = ({ team }) => {
    

    const timestamp = new Timestamp(
        team?.createdAt?.seconds || 0,
        team?.createdAt?.nanoseconds || 0
    );

    return (

        <div>
            <Link to={`/team/page/${team.teamName}`}>
                <div className="flex justify-between items-center px-5">
                    <div className="flex items-center gap-2 w-full">

                        <Avatar className="w-24 h-24 rounded-none object-cover">
                            <AvatarImage src={team.teamLogo} alt="" className="object-cover" />
                            <AvatarFallback className="rounded-none">{team.teamName && team.teamName.charAt(0).toUpperCase()}{team.teamName && team.teamName.charAt(1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="p-5 flex flex-col w-full ">
                            <h1 className="flex flex-col font-bold px-1 capitalize  ">
                                {team.teamName}
                            </h1>
                            <h1 className="py-2">
                                {team.description}
                            </h1>
                            <h1 className="">
                                {timestamp.toDate().toDateString() && timestamp.toDate().toDateString()}
                            </h1>
                            <div className="w-full flex justify-end">
                                <Button>View Profile</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <Separator />
        </div>
    );
};

export default TeamProfileCard;
