import { Team } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit, startAfter } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { RootState } from "../store";

interface SearchedTeam {
  id: string;
  team_info: Team;
}

interface SearchTeamState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedTeam[];
  lastDoc: any; // Add this line to track the last document
}

const initialTeamState: SearchTeamState = {
  isLoading: false,
  error: null,
  searchResults: [],
  lastDoc: null, // Initialize lastDoc to null
};

const searchTeamSlice = createSlice({
  name: "searchteams",
  initialState: initialTeamState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchedTeam[] | []>) => {
      state.searchResults = action.payload;
    },
    setLastDoc: (state, action) => {
      state.lastDoc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByTeamName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchByTeamName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        action.payload.teams.forEach((newTeam) => {
          if (!state.searchResults.find((team) => team.id === newTeam.id)) {
            state.searchResults.push(newTeam);
          }
        });
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
  async (teamname: string, thunkAPI) => {
    try {
      const teamsCol = collection(firestore, "teams");
      const lastDoc = (thunkAPI.getState() as RootState).teamsearch.lastDoc;

      let queryRef = query(
        teamsCol,
        where("teamName", ">=", teamname),
        where("teamName", "<=", teamname + "\uf8ff"),
        limit(4)
      );

      if (lastDoc) {
        queryRef = query(
          queryRef,
          startAfter(lastDoc)
        );
      }

      const querySnapshot = await getDocs(queryRef);
      const teams: SearchedTeam[] = [];
      querySnapshot.forEach((doc) => {
        teams.push({
          team_info: doc.data() as Team,
          id: doc.id,
        });
      });
      thunkAPI.dispatch(setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]));
      return { teams: teams };
    } catch (error) {
      throw new Error("Error fetching teams");
    }
  }
);

export const { setSearchResults, setLastDoc } = searchTeamSlice.actions;
export default searchTeamSlice.reducer;
