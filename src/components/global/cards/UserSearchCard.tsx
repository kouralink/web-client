import { Separator } from "@/components/ui/separator"



interface SearchedUser {
    firstName: string;
    username: string;
    lastName: string;
    avatar?: string;

}

interface UserSearchCardProps {
    result: SearchedUser;
}

const UserSearchCard: React.FC<UserSearchCardProps> = ({result}) => {
    return (
            <div>
                    <div className="flex items-center p-5">
                    {result.avatar ? <img src={result.avatar} alt="" className="w-24 h-24 rounded-full" />: <div className="rounded-full bg-gray-300 w-24 h-24"></div>}
                        <h1 className="flex flex-col p-5 font-bold ">{result.firstName} {result.lastName}</h1> 
                </div>
                <Separator />
            </div>

    )
}

export default UserSearchCard;