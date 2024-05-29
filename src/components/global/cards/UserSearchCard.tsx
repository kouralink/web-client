import { Separator } from "@/components/ui/separator"
import { User } from "@/types/types";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";




interface UserSearchCardProps {
    result: User;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({result}) => {
    return (
            <div>
                <div className="flex justify-between items-center">
                    <Link to={`/users/profile/${result.username}`}>
                        <div className="flex items-center p-5">
                        {result.avatar ? <img src={result.avatar} alt="" className="w-24 h-24 rounded-full" />: <div className="rounded-full bg-gray-300 w-24 h-24"></div>}
                            <h1 className="flex flex-col p-5 font-bold ">{result?.firstName} {result?.lastName}</h1> 
                        </div>
                    </Link>
                    <Button>Send invite</Button>
                </div>
                <Separator />
            </div>

    )
}

export default UserSearchCard;
