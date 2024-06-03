import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/state/store";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMemberTeamName } from "@/state/team/teamSlice";


interface ProfileCardProps { }

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const accountType = authUser?.accountType;
  const auth = useSelector((state: RootState) => state.auth);
  const uid = auth?.uid;

  useEffect(() => {
    if (uid && (accountType === "coach" || accountType === "player")) {
      getMemberTeamName(uid).then((teamName) => {
        if (!teamName) {
          console.log("Error getting coach team name");
          return;
        }
      });
    }
  }, [accountType, uid]);
  return (
    <Card className=" border-none shadow-none flex flex-col sm:flex-row gap-2 w-full justify-between items-center px-4 py-2">
      <CardHeader className="flex flex-row m-0 p-0 gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={authUser?.avatar ? authUser?.avatar : ""}
            alt={"logo of " + authUser?.username}
            className="object-cover"
          />
          <AvatarFallback>
            {authUser?.username
              ? authUser?.username.charAt(0)
              : "N"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <CardTitle>
            {authUser?.username ? authUser?.username : "Account"} <span className="capitalize">({
              authUser?.accountType
            })</span>

          </CardTitle>
          <CardDescription>Your personal account.</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="p-0 m-0">
        <Link to={'/users/profile/me'}> <Button className="bg-primary-700">Go to your personal profile</Button></Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
