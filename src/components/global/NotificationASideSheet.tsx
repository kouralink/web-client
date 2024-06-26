import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, BellDot, Loader2, RefreshCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import NotificationCard from "./cards/NotificationCard";
import {
  getRecievedNotifications,
  getTeamRequestNotifications,
  getTournamentNotifications,
} from "@/state/notification/notificationSlice";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

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
  const tournamentNotifications = useSelector(
    (state: RootState) => state.notification.tournamentNotifications
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!authUserUID) return;
    dispatch(getRecievedNotifications());
    if (accoutType === "coach") {
      dispatch(getTeamRequestNotifications());
    }
    if (accoutType === "tournament_manager") {
      dispatch(getTournamentNotifications());
    }
  }, [accoutType, authUserUID, dispatch]);

  const handelRefreshNotifications = async () => {
    if (!authUserUID) return;
    dispatch(getRecievedNotifications());
    if (accoutType === "coach") {
      dispatch(getTeamRequestNotifications());
    }
    if (accoutType === "tournament_manager") {
      dispatch(getTournamentNotifications());
    }
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">

        {
          (RecievedNotifications.length > 0 || teamNotifications.notifications.length > 0 || tournamentNotifications.notifications.length > 0) ? (
            
            <BellDot className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          ):(
            <Bell className="mt-2 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" />
          )
        }
        </div>
      </SheetTrigger>
      <SheetContent className=" max-h-screen ">
        <SheetHeader className="py-10">
          <SheetTitle className="flex justify-between w-full items-center flex-row-reverse">
            <span>
              {(isLoading || teamNotifications.isLoading) ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ):<Button variant={"outline"} onClick={handelRefreshNotifications}><RefreshCcw className="w-4 h-4"/></Button>}
            </span>{" "}
            <span>Notifications</span>
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
                  (accoutType === "coach" || accoutType === "tournament_manager" ) && "grid-cols-2"
                )}
              >
                <TabsTrigger value="user">User</TabsTrigger>

                {accoutType === "coach" && (
                  <TabsTrigger value="team">Team</TabsTrigger>
                )}
                {accoutType === "tournament_manager" && (
                  <TabsTrigger value="tournament">Tournament</TabsTrigger>
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
          {accoutType === "tournament_manager" && (
            <TabsContent value="tournament">
              {tournamentNotifications.error && <div>{tournamentNotifications.error}</div>}
              {tournamentNotifications.notifications.length > 0 && (
                <ScrollArea className="felx flex-col h-[480px]  w-full ">
                  <div>
                    <div className="space-y-1">
                      {tournamentNotifications.notifications.map((notification) => (
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
