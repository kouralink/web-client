import { Check, X } from "lucide-react";

// import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Action, Notification } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { updateNotificationAction } from "@/state/notification/notificationSlice";

const NotificationCard = (props: Notification) => {
  const dispatch = useDispatch<AppDispatch>();
  const handelAction = async (actionType:Action) => {
    console.log(actionType);
    dispatch(updateNotificationAction({id:props.id, action:actionType}));

  }

  return (
    <div className="flex justify-between p-5">
      <div>
        <h4 className="text-sm font-medium leading-none">{props.title}</h4>
        <p className="text-md ">{props.message}</p>
        <div className="text-sm text-muted-foreground">
          {/* {formatDistanceToNow(new Date('2024-05-27'), {
                        addSuffix: true,
                      })} */}
        </div>
      </div>
      {props.type !== "info" ? (
        <div className="flex gap-2">
          {" "}
          <Check
            onClick={() => handelAction("accept")}
            className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          />
          <X
            onClick={() => handelAction("decline")}
            className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          />{" "}
        </div>
      ) : (
        <div className="flex gap-2">
          <X
            onClick={() => handelAction("view")}
            className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
