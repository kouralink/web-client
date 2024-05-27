import { AppDispatch, RootState } from "@/state/store";
import { getUserByUsername } from "@/state/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyProfileCard from "@/components/global/cards/MyProfileCard"
import Navbar from "@/components/global/Navbar"
import './ProfileStyle.css';


export default function UserProfile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const authUser = useSelector((state: RootState) => state.auth.user);

  let { username } = useParams() as { username: string };
  if (username == "me"){
    if (authUser){
      username = authUser.username;
    }
  }
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  return (
    <div>
      <div>
        <Navbar navHeight={2} />
      </div>

            <div className="bg-green-700 h-60 w-svw  p-6 flex items-end half-image">
              <img src={userState.avatar} alt="Profile" className="block mx-auto"/> 
                <p className="font-semibold text-white content">{userState.firstName} {userState.lastName}</p>
            </div>

            <div className="my-24 md:flex md:items-end md:justify-center">
              <MyProfileCard/>
            </div>
    </div>
  );
}
