// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore } from "@/services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { Team, TeamState } from "../../types/types";

const initialState: TeamState = {
  team: {
    id: "",
    teamName: "",
    blackList: [],
    coach: "",
    createdAt: { seconds: 0, nanoseconds: 0 },
    updatedAt: { seconds: 0, nanoseconds: 0 },
    teamLogo: "",
    description: "",
    createdBy: "",
  },
  status: "idle",
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<Team>) => {
      state.team = action.payload;
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
    clearTeam: (state) => {
      state.team = initialState.team;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.team = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.team = action.payload;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(createTeam.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.status = "idle";
        if (action.payload !== undefined) {
          state.team = action.payload;
        } else {
          state.team = initialState.team;
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        console.log("rejected");
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// create asyncThunk for get team using axios from backend localhost:3000/teams/:id
export const getTeam = createAsyncThunk("team/getTeam", async (id: string) => {
  try {
    const teamRef = doc(firestore, "teams", id);
    const teamSnap = await getDoc(teamRef);
    if (teamSnap.exists()) {
      return teamSnap.data() as Team;
    } else {
      throw new Error("No such document!");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data as string);
  }
});

// create asyncThunk for update team using axios from backend localhost:3000/teams using post method
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (team: Team) => {
    try {
      const docRef = doc(firestore, "teams", team.id);
      await setDoc(docRef, team);
      return team;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data as string);
    }
  }
);

const isItUniqueTeamName = async (teamName: string) => {
  //  teamName is the team id
  try {
    const teamRef = doc(firestore, "teams", teamName);
    const teamSnap = await getDoc(teamRef);
    if (teamSnap.exists()) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (team: { teamName: string }) => {
    try {
      if (!auth.currentUser) {
        throw new Error("User not logged in");
      }
      const isUnique = await isItUniqueTeamName(team.teamName);
      if (isUnique) {
        const docRef = doc(firestore, "teams", team.teamName);
        await setDoc(docRef, {
          teamName: team.teamName,
          coach: auth.currentUser.uid,
          blackList: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          teamLogo: "",
          description: "",
          createdBy: auth.currentUser.uid,
        });
        // get doc

        const teamInfo = await getDoc(docRef);
        if (teamInfo.exists()) {
          console.log("teamInfo", teamInfo.data());
          return teamInfo.data() as Team;
        } else {
          throw new Error("Team Doesn't created!");
        }
        
      } else {
        throw new Error("Team name is not unique");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data as string);
    }
  }
);

export const { setTeam, clearTeam, setError, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
