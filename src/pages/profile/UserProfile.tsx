import { AppDispatch, RootState } from "@/state/store";
import { getUserByUsername } from "@/state/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.uid);
  const userError = useSelector((state: RootState) => state.user.error);
  const userLoading = useSelector(
    (state: RootState) => state.user.status === "loading"
  );
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
      
        <ul>
          <li>Uid : {userId}</li>
          <li>username: {userState.username}</li>
          <li>accountType: {userState.accountType}</li>
          <li>bio: {userState.bio}</li>
          <li>birthday: {userState.birthday}</li>
          <li>firstName: {userState.firstName}</li>
          <li>lastName: {userState.lastName}</li>
          <li>Gender: {userState.gender}</li>
          <li>Phone Numbers: {userState.phoneNumbers}</li>
          <li>Address: {userState.address}</li>
          <li>Avatar: {userState.avatar}</li>
        </ul>
      
      Error: {userError}
      <br />
        {userLoading && "Loading..."}
    </div>
  );
}
