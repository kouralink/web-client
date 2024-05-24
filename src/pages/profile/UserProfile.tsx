import { AppDispatch, RootState } from "@/state/store";
import { getUserByUsername } from "@/state/user/userSlice";
import { Timestamp } from "firebase/firestore";
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

  const timestamp = new Timestamp(authUser?.birthday?.seconds || 0, authUser?.birthday?.nanoseconds || 0);
  return (
    <div>
      
        <ul>
          <li>Uid : {userId}</li>
          <li>username: {userState.username}</li>
          <li>accountType: {userState.accountType}</li>
          <li>bio: {userState.bio}</li>
          <li>birthday: {timestamp.toDate().toDateString()}</li>
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
