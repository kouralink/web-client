import { Notification } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, where, query } from "firebase/firestore";
import { firestore } from "@/services/firebase";

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
    builder.addCase(GetRecievedNotifications.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(GetRecievedNotifications.fulfilled, (state, action) => {
      state.error = null;

      if (typeof action.payload === "object" && action.payload !== null) {
        state.notifications = action.payload.notis as Notification[];
      }

      state.isLoading = false;
    });
    builder.addCase(GetRecievedNotifications.rejected, (state, action) => {
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

// export const sendRequestToJoinTeam = createAsyncThunk(
//   "notification/sendRequestToJoinTeam",
//   async (notification: Notification) => {
//     try {
//       // send notification to team owner
//     } catch (error) {
//       throw new Error("Error sending request to join team");
//     }
//   }
// );

export default notificationSlice.reducer;
