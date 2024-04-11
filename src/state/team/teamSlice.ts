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
  description: string | null;
  createdBy: string;
}

interface TeamState {
  team: Team;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined ;
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
        state.error = null;
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
        state.error = null;
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
      .addCase(deleteTeam.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state) => {
        state.status = "idle";
        state.team = initialState.team;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(createTeam.pending, (state) => {
        try {
          state.status = "loading";
          state.error = null;
      } catch (error) {
        console.log(error)
      }
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        try {
          state.status = "idle";
          state.team = action.payload;
        } catch (error) {
          console.log(error)
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        try {
          state.status = "failed";
          state.error = action.error.message;
          console.log("Errpr:",action)
        } catch (error) {
          console.log(error)
        }
      });
  },
});

// create asyncThunk for get team using axios from backend localhost:3000/teams/:id
export const getTeam = createAsyncThunk("team/getTeam", async (id: string) => {
  const response = await axios.get(`http://localhost:3000/teams/${id}`);
  return response.data;
});

// create asyncThunk for update team using axios from backend localhost:3000/teams using post method
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (team: Team) => {
    
      const response = await axios.post("http://localhost:3000/teams", team);
      return response.data;
    

  }
  
  
);

// create asyncThunk for delete team using axios from backend localhost:3000/teams/:id using delete method
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id: string) => {
    await axios.delete(`http://localhost:3000/teams/${id}`);
    return id;
  }
);

// create asyncThunk for create team using axios from backend localhost:3000/teams using post method
// sending just the team name and the coach
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (team: { teamName: string; coach: string }) => {
    // catch error message if response was not 200
    try{
    const response = await axios.post("http://localhost:3000/teams", team);
    return response.data;
    }catch(error){
      console.log(error)
    }
    // const response = await axios.post("http://localhost:3000/teams", team);
    // return response.data;
  }
);

export const { setTeam, clearTeam, setError, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
