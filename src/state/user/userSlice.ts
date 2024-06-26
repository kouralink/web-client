import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// firebase
import {
  getDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
  limit,
  orderBy,
  Query,
  startAfter,
} from "firebase/firestore";
import { firestore } from "@/services/firebase";

// types
import { User, UserState, Match, FilterProgressStatus } from "../../types/types";
import { getMemberTeam, getTeamDataByTeamId } from "../team/teamSlice";
import { RootState, store } from "../store";

const initialState: UserState = {
  user: {
    username: "",
    bio: "",
    birthday: undefined,
    firstName: "",
    lastName: "",
    gender: undefined,
    phoneNumbers: [],
    address: "",
    avatar: "",
    accountType: "user",
  },
  uid: "",
  status: "idle",
  error: null,
  refereeMatches: [],
  team: null,
  trackQuery: { lastDoc: null, status: "all" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; user: User }>) => {
      state.user = action.payload.user;
      state.uid = action.payload.uid;
    },
    setRefereeMatches: (state, action: PayloadAction<Match[] | []>) => {
      state.refereeMatches = action.payload;
    },
    setTrackQuery: (state, action) => {
      state.trackQuery = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.status = "idle";
      state.error = null;
      state.uid = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (typeof action.payload === "object" && action.payload !== null) {
          state.user = action.payload.user;
          state.uid = action.payload.uid;
          state.status = "idle";
        } else {
          state.status = "failed";
          state.error = "User not found";
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getUserByUsername.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        if (typeof action.payload === "object" && action.payload !== null) {
          state.user = action.payload.user;
          state.uid = action.payload.uid;
          state.status = "idle";
        } else {
          state.status = "failed";
          state.error = "User not found";
        }
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getRefereeMatchesAndInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRefereeMatchesAndInfo.fulfilled, (state, action) => {
        action.payload.matches.forEach((newMatch) => {
          if (!state.refereeMatches.some((existingMatch) => existingMatch.id === newMatch.id)) {
            state.refereeMatches.push(newMatch);
          }
        });
        state.user = action.payload.user;
        state.status = "idle";
      })
      .addCase(getRefereeMatchesAndInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(GetUserTeam.fulfilled, (state, action) => {
      state.team = action.payload;
    });
  },
});

export const getUser = createAsyncThunk("user/getUser", async (uid: string) => {
  try {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log(docSnap.id, " => ", docSnap.data());
      return { uid: docSnap.id, user: docSnap.data() as User };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
});

export const getUserByUsername = createAsyncThunk(
  "user/getUserByUsername",
  async (username: string, thunkAPI) => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0];
        thunkAPI.dispatch(GetUserTeam(data.id));
        return { uid: data.id, user: data.data() as User };
      }
      return null;
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  }
);

// export interface Match {
//   id: string;
//   team1: TeamMatch & AddedToTeamMatch;
//   team2: TeamMatch & AddedToTeamMatch;
//   refree: {
//     id: string;
//     isAgreed: boolean;
//   };
//   createdAt: Timestamp;
//   updatedAt: Timestamp;
//   startIn: Timestamp | null;
//   endedAt: Timestamp | null;
//   location: string | null;
//   status:MatchStatus;
//   type: "tournament" | "classic_match";
// }

export const getRefereeMatchesAndInfo = createAsyncThunk(
  "user/getRefereeMatches",
  async ({ uid, status = "all" }: { uid: string; status: FilterProgressStatus }, thunkAPI) => {
    try {
      // get userinfo
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("User not found");
      }
      const user = docSnap.data() as User;

      const trackQuery = (thunkAPI.getState() as RootState).user.trackQuery;
      let lastDocState = trackQuery.lastDoc;


      if (trackQuery.status !== status) {
        thunkAPI.dispatch(setRefereeMatches([]));
        thunkAPI.dispatch(setTrackQuery({ lastDoc: null, status: status }));
        lastDocState = null;
      }

      // get matches order by status pending and in_progress first after that others limit 20
      let queryRef: Query = query(
        collection(firestore, "matches"),
        where("refree.id", "==", uid),
        where("refree.isAgreed", "==", true),
        orderBy("status", "desc"),
        limit(5)
      );

      if (status !== "all") {
        queryRef = query(queryRef, where("status", "==", status));
      }

      if (lastDocState) {
        queryRef = query(queryRef, startAfter(lastDocState));
      }

      const snap = await getDocs(queryRef);
      const matches: Match[] = [];
      for (const doc of snap.docs) {
        const thismatch = doc.data() as Match;
        const team1_data = await getTeamDataByTeamId(thismatch.team1.id);
        const team2_data = await getTeamDataByTeamId(thismatch.team2.id);
        if (!team1_data || !team2_data) {
          continue;
        }
        // get team1 data
        thismatch.team1 = {
          ...thismatch.team1,
          name: team1_data.teamName,
          logo: team1_data.teamLogo,
        };
        // get team2 data
        thismatch.team2 = {
          ...thismatch.team2,
          name: team2_data.teamName,
          logo: team2_data.teamLogo,
        };
        matches.push(thismatch);
      }
      if (matches.length === 0) {
        console.log("no matches found");
      }
      thunkAPI.dispatch(setTrackQuery({ lastDoc: snap.docs[snap.docs.length - 1], status: status }));
      return { matches, user };
    } catch (error) {
      console.log("get matches error : ", error);
      throw new Error("Failed to fetch matches data");
    }
  }
);



export const GetUserTeam = createAsyncThunk(
  "user/getUserTeam",
  async (uid: string) => {
    try {
      // is account type of user coach or player
      const accountType = store.getState().user.user.accountType;
      if (!["coach", "player"].includes(accountType)) {
        return null;
      }
      // get team
      const team = getMemberTeam(uid);
      return team;
    } catch (error) {
      throw new Error("Failed to fetch user team data");
    }
  }
);

export const { setUser, setRefereeMatches, setTrackQuery, clearUser, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
