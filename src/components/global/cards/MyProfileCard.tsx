import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { BookUser, Cake, Home, Phone, Smile, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMatch } from "react-router-dom";
import { inviteToTeam } from "@/state/notification/notificationSlice";
import TeamProfileCard from "@/components/global/cards/TeamProfileCard"


const MyProfileCard = () => {
  const team = useSelector((state: RootState) => state.team.team);
  const userS = useSelector((state: RootState) => state.user);
  const authU = useSelector((state: RootState) => state.auth);
  const userState = userS.user;
  const authUser = authU.user;

  const timestamp = new Timestamp(
    authUser?.birthday?.seconds || 0,
    authUser?.birthday?.nanoseconds || 0
  );
  const match = useMatch("/users/profile/me");
  const dispatch = useDispatch<AppDispatch>();

  const handelInvite = () => {
    dispatch(inviteToTeam({ to: userS.uid }));
  };

  return (
    <Card className="w-full bg-transparent border-none lg:py-10 container">
      <CardHeader>
        <div className="flex items-center justify-between py-5">
          <p className="text-3xl lg:text-8xl font-bold capitalize">
            {userState.firstName} {userState.lastName} <span className="text-5xl">({userState?.accountType})</span>
          </p>
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
      <CardContent className="flex flex-col lg:flex-row justify-between">
        <div>
          <ul className="space-y-5">
            <li className="flex items-center py-3">
              <BookUser />
              <span className="px-4">{userState.username}</span>
            </li>
            <li className="flex items-center py-3">
              <Cake />
              <span className="px-4">
                {timestamp.toDate().toDateString()
                  ? timestamp.toDate().toDateString()
                  : "add birthday in settings"}
              </span>
            </li>
            <li className="flex items-center py-3">
              <Smile />
              <span className="px-4">
                {userState.gender ? userState.gender : "add gender in settings"}
              </span>
            </li>
            <li className="flex items-center py-3">
              <Phone />
              <span className="px-4 flex gap-2">
                {userState.phoneNumbers
                  ? userState.phoneNumbers.map((n) => {
                    return <Card key={n} className="px-2 py-1">{n}</Card>
                  })
                  : "add phone number in settings"}
              </span>
            </li>
            <li className="flex items-center py-3">
              <Home />
              <span className="px-4">
                {userState.address
                  ? userState.address
                  : "add address in settings"}
              </span>
            </li>
          </ul>
          {authUser?.accountType === "coach" && authU.uid !== userS.uid && (
            <div className="w-full flex justify-end">
              <Button onClick={handelInvite}>
                {" "}
                <UserPlus className="mr-2 h-4 w-4" /> Invite To Team
              </Button>
            </div>
          )}
        </div>
        {(userState?.accountType === "coach" || userState?.accountType === "player") && (
          <div className=" lg:w-1/2">
            <TeamProfileCard team={team} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default MyProfileCard;
