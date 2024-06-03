import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, BellDot, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import NotificationCard from "./cards/NotificationCard";
import {
  getRecievedNotifications,
  getTeamRequestNotifications,
} from "@/state/notification/notificationSlice";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const NotificationASideSheet = () => {
  const RecievedNotifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const authUserUID = useSelector((state: RootState) => state.auth.uid);
  const accoutType = useSelector(
    (state: RootState) => state.auth.user?.accountType
  );
  const error = useSelector((state: RootState) => state.notification.error);
  const isLoading = useSelector(
    (state: RootState) => state.notification.isLoading
  );
  const teamNotifications = useSelector(
    (state: RootState) => state.notification.teamNotifications
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!authUserUID) return;
    dispatch(getRecievedNotifications());
    if (accoutType === "coach") {
      dispatch(getTeamRequestNotifications());
    }
  }, [accoutType, authUserUID, dispatch]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">

        {
          (RecievedNotifications.length > 0 || teamNotifications.notifications.length > 0) ? (
            
            <BellDot className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          ):(
            <Bell className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          )
        }
        </div>
      </SheetTrigger>
      <SheetContent className=" max-h-screen ">
        <SheetHeader className="py-10">
          <SheetTitle className="flex justify-between w-full flex-row-reverse">
            <span>
              {(isLoading || teamNotifications.isLoading) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </span>{" "}
            <span>Notification</span>
          </SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="user" className="h-full">
          {accoutType &&
            !(
              accoutType === "user" ||
              accoutType === "refree" ||
              accoutType === "player"
            ) && (
              <TabsList
                className={cn(
                  "grid w-full ",
                  accoutType === "coach" && "grid-cols-2"
                )}
              >
                <TabsTrigger value="user">User</TabsTrigger>

                {accoutType === "coach" && (
                  <TabsTrigger value="team">Team</TabsTrigger>
                )}
              </TabsList>
            )}
          <TabsContent value="user" className="h-full">
            {error && <div>{error}</div>}
            {RecievedNotifications.length > 0 && (
              <ScrollArea className="felx flex-col h-[480px]  w-full rounded-md  border overflow-y-scroll gap-4">
                {/* <div className="h-[300px]"> */}

                {RecievedNotifications.map((notification) => (
                  <div key={notification.id}>
                    <NotificationCard {...notification} key={notification.id} />
                    <Separator />
                  </div>
                ))}
                {/* </div> */}
              </ScrollArea>
            )}
          </TabsContent>
          {accoutType === "coach" && (
            <TabsContent value="team">
              {teamNotifications.error && <div>{teamNotifications.error}</div>}
              {teamNotifications.notifications.length > 0 && (
                <ScrollArea className="felx flex-col h-[480px]  w-full ">
                  <div>
                    <div className="space-y-1">
                      {teamNotifications.notifications.map((notification) => (
                        <div key={notification.id}>
                          <NotificationCard {...notification} />
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationASideSheet;
