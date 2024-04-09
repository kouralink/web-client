// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Team {
  id: string;
  teamName: string;
  blackList: string[];
  coach: string;
  createdAt: Date;
  updatedAt: Date;
  teamLogo: string | null;
  description: string | null ;
  createdBy: string;
}

interface TeamState {
  team: Team;
  status: "idle" | "loading" | "failed";
  error: string | null| undefined;
}

const initialState: TeamState = {
  team: {
    id: "",
    teamName: "",
    blackList: [],
    coach: "",
    createdAt: new Date(),
    updatedAt: new Date(),
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

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTeam.pending, (state) => {
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
}});

// create asyncThunk for get team using axios from backend localhost:3000/teams/:id
export const getTeam = createAsyncThunk("team/getTeam", async (id: string) => {
  const response = await axios.get(`http://localhost:3000/teams/${id}`);
  return response.data;
});

// create asyncThunk for update team using axios from backend localhost:3000/teams using post method
export const updateTeam = createAsyncThunk("team/updateTeam", async (team: Team) => {
  const response = await axios.post("http://localhost:3000/teams", team);
  return response.data;
});

// create asyncThunk for delete team using axios from backend localhost:3000/teams/:id using delete method
export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id: string) => {
  await axios.delete(`http://localhost:3000/teams/${id}`);
  return id;
});

// create asyncThunk for create team using axios from backend localhost:3000/teams using post method
// sending just the team name and the coach
export const createTeam = createAsyncThunk("team/createTeam", async (team: {teamName: string, coach: string}) => {
  const response = await axios.post("http://localhost:3000/teams", team);
  return response.data;
});




export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
