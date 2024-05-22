import { AppDispatch, RootState } from "@/state/store";
import { getUser } from "@/state/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserProfile  () {
    const userState = useSelector((state: RootState) => state.user.user);
    const userError = useSelector((state: RootState) => state.user.error);
    const userLoading = useSelector((state: RootState) => state.user.status === 'loading');
    const { userId } = useParams() as { userId: string };
    const dispatch = useDispatch<AppDispatch>();
    dispatch(getUser(userId));
    return (
        <div>
            <h1>User Profile {userState.username}</h1>
            <p>user Loading:{userLoading}</p>
            <p>Error:{userError}</p>
            {/* TODO: give a a good designe to this page */}
            
        </div>
    )
}