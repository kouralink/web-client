import { Team } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit } from "firebase/firestore";
import { firestore } from "@/services/firebase";

interface SearchedTeam {
  id: string;
  team_info: Team;
}

interface SearchTeamState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedTeam[];
}

const initialTeamState: SearchTeamState = {
  isLoading: false,
  error: null,
  searchResults: [],
};

const searchTeamSlice = createSlice({
  name: "searchteams",
  initialState: initialTeamState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchByTeamName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchByTeamName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        state.searchResults = action.payload.teams;
      }
    });
    builder.addCase(searchByTeamName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const searchByTeamName = createAsyncThunk(
  "search/searchByTeamName",
  async (teamname: string) => {
    try {
      const teamsCol = collection(firestore, "teams");
      // where teamname like teamname limit 10

      const q = query(
        teamsCol,
        where("teamName", ">=", teamname),
        where("teamName", "<=", teamname + "\uf8ff"),
        where("teamName", "!=", "_"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const teams: SearchedTeam[] = [];
      querySnapshot.forEach((doc) => {
        teams.push({
          team_info: doc.data() as Team,
          id: doc.id,
        });
      });
      return { teams: teams };
    } catch (error) {
      throw new Error("Error fetching teams");
    }
  }
);

export default searchTeamSlice.reducer;
