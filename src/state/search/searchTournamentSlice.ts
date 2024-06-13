import { Tournament } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit, startAfter } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { RootState } from "../store";

interface SearchedTournament {
  id: string;
  tournament_info: Tournament;
}

interface SearchTournamentState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedTournament[];
  lastDoc: any;
}

const initialTournamentState: SearchTournamentState = {
  isLoading: false,
  error: null,
  searchResults: [],
  lastDoc: null
};

const searchTournamentSlice = createSlice({
  name: "searchTournaments",
  initialState: initialTournamentState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchedTournament[] | []>) => {
      state.searchResults = action.payload;
    },
    setLastDoc: (state, action) => {
      state.lastDoc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByTournamentName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchByTournamentName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        action.payload.tournaments.forEach((newTournament) => {
          if (!state.searchResults.find((tournament) => tournament.id === newTournament.id)) {
            state.searchResults.push(newTournament);
          }
        });
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
  async (tournamentName: string, thunkAPI) => {
    try {
      const tournamentsCol = collection(firestore, "tournaments");
      const lastDoc = (thunkAPI.getState() as RootState).tournamentsearch.lastDoc;

      let queryRef = query(
        tournamentsCol,
        where("name", ">=", tournamentName),
        where("name", "<=", tournamentName + "\uf8ff"),
        limit(4)
      );

      if (lastDoc) {
        queryRef = query(
          queryRef,
          startAfter(lastDoc)
        );
      }

      const querySnapshot = await getDocs(queryRef);
      const tournaments: SearchedTournament[] = [];
      querySnapshot.forEach((doc) => {
        tournaments.push({
          tournament_info: doc.data() as Tournament,
          id: doc.id,
        });
      });
      thunkAPI.dispatch(setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]));
      return { tournaments: tournaments };
    } catch (error) {
      throw new Error("Error fetching tournaments");
    }
  }
);

export const { setSearchResults, setLastDoc } = searchTournamentSlice.actions;
export default searchTournamentSlice.reducer;
