import { Notification } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore, auth } from "@/services/firebase";
import { toast } from "@/components/ui/use-toast";
import { store } from "../store";
import { isItAlreadyInATeam } from "../auth/authSlice";
import { getMemberTeamId, isValidTeamId } from "../team/teamSlice";

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetRecievedNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetRecievedNotifications.fulfilled, (state, action) => {
        state.error = null;

        if (typeof action.payload === "object" && action.payload !== null) {
          state.notifications = action.payload.notis as Notification[];
        } 

        state.isLoading = false;
      })
      .addCase(GetRecievedNotifications.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(sendRequestToJoinTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast({
          variant: "default",
          title: "Sending request",
          description: "Sending request to join team",
        });
      })
      .addCase(sendRequestToJoinTeam.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            variant: "default",
            title: "Request sended",
            description: "Request to join team sended successfully",
          });
        } else {
          state.error = action.payload;
          

          toast({
            title: "Request failed",
            description: action.payload,
            variant: "destructive",
          });
        }

      })
      .addCase(sendRequestToJoinTeam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(inviteToTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteToTeam.fulfilled, (state, action) => {
        state.error = null;

        if (action.payload === true) {
          toast({
            title: "Invite sended",
            description: "Invite to join team sended successfully",
          });
        } else {
          state.error = action.payload;

          toast({
            title: "Invite failed",
            description: action.payload,
            variant: "destructive",
          });
        }

        state.isLoading = false;
      })
      .addCase(inviteToTeam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const GetRecievedNotifications = createAsyncThunk(
  "notification/getRecievedNotifications",
  async (uid: string) => {
    try {
      const notificationsCollection = collection(firestore, "notifications");
      const notificationsQuery = query(
        notificationsCollection,
        where("to_id", "==", uid)
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notifications: Notification[] = [];
      notificationsSnapshot.forEach((doc) => {
        notifications.push({
          ...doc.data(),
          id: doc.id,
        } as Notification);
      });
      return { notis: notifications };
    } catch (error) {
      throw new Error("Error getting recieved notifications");
    }
  }
);

const getCoachTeamId = async () => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) {
      return { error: "Error getting current user" };
    }
    const accountType = store.getState().auth.user?.accountType;
    if (accountType !== "coach") {
      console.log("Error account type is not coach");
      return { error: "Error account type is not coach" };
    }

    // get teamName where the coach is userUid
    const teamId = await getMemberTeamId(userUid);
    if (!teamId) {
      return { error: "Error getting coach team name" };
    }
    return teamId;
  } catch (error) {
    return { error: "Error getting coach team name" };
  }
};

const isAlreadySendNotification = async (from_id: string, to_id: string) => {
  try {
    const notificationsCollection = collection(firestore, "notifications");
    const notificationsQuery = query(
      notificationsCollection,
      where("from_id", "==", from_id),
      where("to_id", "==", to_id)
    );
    const notificationsSnapshot = await getDocs(notificationsQuery);
    const notifications: Notification[] = [];
    notificationsSnapshot.forEach((doc) => {
      notifications.push({
        ...doc.data(),
        id: doc.id,
      } as Notification);
    });
    // test if there is a sended notification in last 24 hours
    const now = Timestamp.now();
    const last24Hours = new Date(now.toMillis() - 24 * 60 * 60 * 1000);
    const last24HoursTimestamp = Timestamp.fromDate(last24Hours);
    const last24HoursNotifications = notifications.filter(
      (notification) =>
        notification.createdAt.toMillis() >= last24HoursTimestamp.toMillis()
    );
    if (last24HoursNotifications.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error getting recieved notifications");
  }
};

export const sendRequestToJoinTeam = createAsyncThunk(
  "notification/sendRequestToJoinTeam",
  async (notificationInfo: { to: string }) => {
    try {
      console.log('1')
      console.log(notificationInfo.to)
      // check if notificationInfo.to is valid team id
      const isValidTID:boolean = await isValidTeamId(notificationInfo.to);
      if (!isValidTID) {

        return "Error team id is not valid";
      }
      console.log('2')

      // get uid
      const from_uid = auth.currentUser?.uid;
      if (!from_uid) {
        return "Error getting current user";
      }
      console.log('3')
      // test if account type is player
      const accountType = store.getState().auth.user?.accountType;
      if (accountType !== "player") {
        // toast({
        //   title: "Error",
        //   description: "Account type is not player",
        //   variant: "destructive",
        // })

        return "Error account type is not player";
      }
      console.log('4')

      // get user username
      const username = store.getState().auth.user?.username;
      if (!username) {
        return "Error getting current user username";
      }
      
      // check if user already in a team
      const isItInTeam = await isItAlreadyInATeam(from_uid);

      if (isItInTeam) {
        return "Error user already in a team";
      }

      // test if there is already a notification with same to_id and from_id in last 24 hours
      const isAlreadySend = await isAlreadySendNotification(
        from_uid,
        notificationInfo.to
      );
      if (isAlreadySend) {
        return "You Have already send a request to join this team in last 24 hours";
      }
      
      // send notification
      const notificationCollection = collection(firestore, "notifications");

      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Request to join team",
        message: "I want to join your team",
        from_id: from_uid,
        action: null,
        createdAt: Timestamp.now(),
        type: "request_to_join_team",
      });
      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join team";
    } catch (error) {
      throw new Error("Error sending request to join team");
    }
  }
);

export const inviteToTeam = createAsyncThunk(
  "notification/inviteToTeam",
  async (notificationInfo: { to: string }) => {
    try {
      const teamId = await getCoachTeamId();

      if (typeof teamId === "object" && teamId.error) {
        return teamId.error;
      }

      const notificationCollection = collection(firestore, "notifications");

      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Invite to team",
        message: `You invited to joint Team ${teamId}`,
        from_id: teamId,
        action: null,
        createdAt: Timestamp.now(),
        type: "invite_to_team",
      });
      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join team";
    } catch (error) {
      throw new Error("Error sending request to join team");
    }
  }
);

export const sendInfoNotification = createAsyncThunk(
  "notification/sendInfoNotification",
  async (notificationInfo: { to: string; title: string; message: string }) => {
    try {
      const notificationCollection = collection(firestore, "notifications");

      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: notificationInfo.title,
        message: notificationInfo.message,
        from_id: auth.currentUser?.uid,
        action: null,
        createdAt: Timestamp.now(),
        type: "info",
      });
      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join team";
    } catch (error) {
      throw new Error("Error sending request to join team");
    }
  }
);



export default notificationSlice.reducer;
