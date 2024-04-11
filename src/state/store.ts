import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import teamSlice from "./team/teamSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        team:teamSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;