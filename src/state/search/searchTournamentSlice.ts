import { Tournament } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit } from "firebase/firestore";
import { firestore } from "@/services/firebase";

interface SearchedTournament {
  id: string;
  tournament_info: Tournament;
}

interface SearchTournamentState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedTournament[];
}

const initialTournamentState: SearchTournamentState = {
  isLoading: false,
  error: null,
  searchResults: [],
};

const searchTournamentSlice = createSlice({
  name: "searchTournaments",
  initialState: initialTournamentState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchByTournamentName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchByTournamentName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        state.searchResults = action.payload.tournaments;
      }
    });
    builder.addCase(searchByTournamentName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const searchByTournamentName = createAsyncThunk(
  "search/searchByTournamentName",
  async (tournamentName: string) => {
    try {
      const tournamentsCol = collection(firestore, "tournaments");
      // where tournamentName like tournamentName limit 10

      const q = query(
        tournamentsCol,
        where("name", ">=", tournamentName),
        where("name", "<=", tournamentName + "\uf8ff"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const tournaments: SearchedTournament[] = [];
      querySnapshot.forEach((doc) => {
        tournaments.push({
          tournament_info: doc.data() as Tournament,
          id: doc.id,
        });
      });
      return { tournaments: tournaments };
    } catch (error) {
      throw new Error("Error fetching tournaments");
    }
  }
);

export default searchTournamentSlice.reducer;
