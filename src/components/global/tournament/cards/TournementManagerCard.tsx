import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

type TournementManagerCardProps = {
    username: string;
    avatar: string | undefined;
};

const TournementManagerCard: React.FC<TournementManagerCardProps> = (props) => {
    return (
        <Card
            className={"flex w-[280px] rounded-lg p-2 justify-between items-center gap-6"}
        >
            <CardHeader className="flex flex-row  items-center justify-center gap-4 m-0 p-0 ">
                <div className="flex  items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src={props.avatar}
                            alt={props.username || " avatar"}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {props.username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <h2>{props.username}</h2>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4 m-0 p-0">
                <Link to={`/users/profile/${props.username}`}>
                    <User className="mr-2 h-4 w-4" />
                </Link>
            </CardContent>
        </Card>
    );
};

export default TournementManagerCard;
