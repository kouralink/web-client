import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import teamSlice from "./team/teamSlice";
import searchSlice from "./search/searchSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        team:teamSlice,
        search:searchSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;