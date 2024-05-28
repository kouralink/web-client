import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import teamSlice from "./team/teamSlice";
import userSlice from "./user/userSlice";
import searchUsersSlice from "./search/searchUsersSlice";
import searchTeamSlice from "./search/searchTeamSlice";
import notificationSlice from "./notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    team: teamSlice,
    usersearch: searchUsersSlice,
    user: userSlice,
    teamsearch: searchTeamSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
