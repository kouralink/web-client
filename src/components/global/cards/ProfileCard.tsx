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

interface ProfileCardProps {}

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  return (
    <Card className=" border-none shadow-none flex flex-col sm:flex-row gap-2 w-full justify-between items-center px-4 py-2">
      <CardHeader className="flex flex-row m-0 p-0 gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={authUser?.photoURL ? authUser?.photoURL : ""}
            alt={"logo of " + authUser?.displayName}
          />
          <AvatarFallback>
            {authUser?.displayName
              ? authUser?.displayName.charAt(0)
              : authUser?.email?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <CardTitle>
            {authUser?.displayName ? authUser?.displayName : "Account"} (Player)
          </CardTitle>
          <CardDescription>Your personal account.</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="p-0 m-0">
        <Link to={'/profile'}> <Button className="bg-primary-700">Go to your personal profile</Button></Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
