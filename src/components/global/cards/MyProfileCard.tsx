import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {RootState } from "@/state/store";
import {useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { Book, BookUser, Cake, Home, Phone, Smile, UserRound } from "lucide-react";
import {ProfileInfoDopDownMenu} from "@/components/global/cards/ProfileInfoDopDownMenu"


const MyProfileCard = () => {
    const userState = useSelector((state: RootState) => state.user.user);
    const authUser = useSelector((state: RootState) => state.auth.user);

  const timestamp = new Timestamp(authUser?.birthday?.seconds || 0, authUser?.birthday?.nanoseconds || 0);

return (
    <Card className="md:w-[600px]">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <UserRound className="mr-2" />
                <CardTitle>INFO</CardTitle>
                </div>

                <ProfileInfoDopDownMenu/>
            </div>
        </CardHeader>
        <CardContent>
            <ul className="space-y-5">
                <li className="flex items-center">
                    <UserRound/>
                    {userState.firstName ? userState.firstName : "add first name in setting"} {userState.lastName ? userState.lastName : "add last name in settings"}
                </li>
                <li className="flex items-center">
                    <BookUser />
                    {userState.username}
                </li>
                <li className="flex items-center">
                    <Book />
                    {userState.bio ? userState.bio : "add bio in settings"}
                </li>
                <li className="flex items-center">
                    <Cake />
                    {timestamp.toDate().toDateString()? timestamp.toDate().toDateString() : "add birthday in settings"}
                </li>
                <li className="flex items-center">
                    <Smile />
                    {userState.gender? userState.gender : "add gender in settings"}
                </li>
                <li className="flex items-center">
                    <Phone/>
                    {userState.phoneNumbers ? userState.phoneNumbers : "add phone number in settings"}
                </li>
                <li className="flex items-center">
                    <Home />
                    {userState.address ? userState.address : "add address in settings"}
                </li>
            </ul>
        </CardContent>
    </Card>
);
}
export default MyProfileCard;
