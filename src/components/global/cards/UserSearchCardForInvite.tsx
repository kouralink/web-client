import { Separator } from "@/components/ui/separator";
import { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { inviteToTeam } from "@/state/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";

interface UserSearchCardForInviteProps {
  result: User;
  id:string
}

const UserSearchCardForInvite: React.FC<UserSearchCardForInviteProps> = ({ result,id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleInvie = async () => {
    console.log("Invite");
    dispatch(inviteToTeam({ to: id }));
  };
  return (
    <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center p-5">
            {result.avatar ? (
              <img
                src={result.avatar}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="rounded-full bg-gray-300 w-24 h-24"></div>
            )}
            <h1 className="flex flex-col p-5 font-bold ">
              ({result.username})
            </h1>
          </div>
          <Button onClick={handleInvie}>Invite</Button>
        </div>
      <Separator />
    </div>
  );
};

export default UserSearchCardForInvite;
