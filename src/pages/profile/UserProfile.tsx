import { AppDispatch, RootState } from "@/state/store";
import { getUserByUsername } from "@/state/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyProfileCard from "@/components/global/cards/MyProfileCard"
import './ProfileStyle.css';
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
    <div>


      <div className="bg-green-700 h-60 w-svw  p-6 flex justify-start items-end half-image">

      <Avatar className="profile-img">
        <AvatarImage src={userState.avatar} alt="@shadcn"/>
        <AvatarFallback className="text-6xl">{userState.username.charAt(0).toUpperCase()}{userState.username.charAt(1).toUpperCase()}</AvatarFallback>
      </Avatar>

        <p className="font-semibold text-white content">{userState.firstName} {userState.lastName}</p>
      </div>

      <div className="my-24 md:flex md:items-end md:justify-center">
        <MyProfileCard />
      </div>
    </div>
  );
}
