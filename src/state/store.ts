import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import teamSlice from "./team/teamSlice";
import userSlice from "./user/userSlice";
import searchUsersSlice from "./search/searchUsersSlice";
import searchTeamSlice from "./search/searchTeamSlice";
import searchTournamentSlice from "./search/searchTournamentSlice";
import notificationSlice from "./notification/notificationSlice";
import matchSlice from "./match/matchSlice";
import tournamentSlice from "./tournament/tournamentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    team: teamSlice,
    usersearch: searchUsersSlice,
    user: userSlice,
    teamsearch: searchTeamSlice,
    tournamentsearch: searchTournamentSlice,
    notification: notificationSlice,
    match: matchSlice,
    tournament: tournamentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
