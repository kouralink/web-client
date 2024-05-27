import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {RootState } from "@/state/store";
import {useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { Book, BookUser, Cake, Home, Phone, Smile, UserRound } from "lucide-react";


const MyProfileCard = () => {
const userState = useSelector((state: RootState) => state.user.user);
  const authUser = useSelector((state: RootState) => state.auth.user);

  const timestamp = new Timestamp(authUser?.birthday?.seconds || 0, authUser?.birthday?.nanoseconds || 0);

return (
    <Card className="w-4/12">
        <CardHeader>
            <div className="flex items-center">
                <UserRound className="mr-2" />
                <CardTitle>INFO</CardTitle>
            </div>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-5">
                <li className="flex items-center">
                    <UserRound/>
                    {userState.firstName} {userState.lastName}
                </li>
                <li className="flex items-center">
                    <BookUser />
                    {userState.username}
                </li>
                <li className="flex items-center">
                    <Book />
                    Bio: {userState.bio}
                </li>
                <li className="flex items-center">
                    <Cake />
                    {timestamp.toDate().toDateString()}
                </li>
                <li className="flex items-center">
                    <Smile />
                    {userState.gender}
                </li>
                <li className="flex items-center">
                    <Phone />
                    {userState.phoneNumbers}
                </li>
                <li className="flex items-center">
                    <Home />
                    {userState.address}
                </li>
            </ul>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
);
}
export default MyProfileCard;
