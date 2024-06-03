import { AppDispatch, RootState } from "@/state/store";
import { getUserByUsername } from "@/state/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyProfileCard from "@/components/global/cards/MyProfileCard"
import   "./ProfileStyle.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const authUser = useSelector((state: RootState) => state.auth.user);

  let { username } = useParams() as { username: string };
  if (username == "me") {
    if (authUser) {
      username = authUser.username;
    }
  }
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  return (
    <div className="flex flex-col lg:flex-row w-full maxh-screen lg:h-screen items-center">

      <div className="p-5 h-full w-full lg:w-1/3 flex justify-center items-center half-image">

        <Avatar className="rounded-none w-full h-2/3 border-white border-8">
          <AvatarImage src={userState.avatar} alt={userState.username + " logo"} className="object-cover"/>
          <AvatarFallback className="text-6xl rounded-none p-32">{userState.username.charAt(0).toUpperCase()}{userState.username.charAt(1).toUpperCase()}</AvatarFallback>
        </Avatar>

      </div>  
      <div className="h-full w-full lg:w-2/3 p-5 flex flex-col justify-center">
        <MyProfileCard />
      </div>
    </div>
  );
}
