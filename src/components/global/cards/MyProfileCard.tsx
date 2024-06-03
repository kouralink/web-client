import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { BookUser, Cake, Home, Phone, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatch } from 'react-router-dom';

const MyProfileCard = () => {
    const userState = useSelector((state: RootState) => state.user.user);
    const authUser = useSelector((state: RootState) => state.auth.user);

    const timestamp = new Timestamp(authUser?.birthday?.seconds || 0, authUser?.birthday?.nanoseconds || 0);
    const match = useMatch('/users/profile/me');

    return (
        <Card className="w-full bg-transparent border-none lg:py-10">
            <CardHeader>
                <div className="flex items-center justify-between py-5">
                    <p className="text-3xl lg:text-8xl font-bold capitalize">{userState.firstName} {userState.lastName}</p>
                    {match && (
                        <Link to="/settings">
                            <Bolt className="h-7 w-7 lg:h-9 lg:w-9" />
                        </Link>
                    )}
                </div>
                <div className="lg:px-2 text-gray-600 dark:text-gray-300">
                    {userState.bio ? userState.bio : "add bio in settings"}
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-5">
                    <li className="flex items-center py-3">
                        <BookUser />
                        <span className="px-4">{userState.username}</span>
                    </li>
                    <li className="flex items-center py-3">
                        <Cake />
                        <span className="px-4">{timestamp.toDate().toDateString() ? timestamp.toDate().toDateString() : "add birthday in settings"}</span>
                    </li>
                    <li className="flex items-center py-3">
                        <Smile />
                        <span className="px-4">{userState.gender ? userState.gender : "add gender in settings"}</span>
                    </li>
                    <li className="flex items-center py-3">
                        <Phone />
                        <span className="px-4">{userState.phoneNumbers ? userState.phoneNumbers : "add phone number in settings"}</span>
                    </li>
                    <li className="flex items-center py-3">
                        <Home />
                        <span className="px-4">{userState.address ? userState.address : "add address in settings"}</span>
                    </li>
                </ul>
            </CardContent>
            <div className="w-full flex justify-end">
                <Button>Send Request</Button>
            </div>
        </Card>
    );
}
export default MyProfileCard;
