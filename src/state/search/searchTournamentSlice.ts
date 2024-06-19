import { FilterProgressStatus, SearchedTournament, Tournament, TrackQuery } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit, startAfter } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { RootState } from "../store";


interface SearchTournamentState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedTournament[];
  trackQuery: TrackQuery;
}

const initialTournamentState: SearchTournamentState = {
  isLoading: false,
  error: null,
  searchResults: [],
  trackQuery: { lastDoc: null, status: "all" }
};

const searchTournamentSlice = createSlice({
  name: "searchTournaments",
  initialState: initialTournamentState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchedTournament[] | []>) => {
      state.searchResults = action.payload;
    },
    setTrackQuery: (state, action) => {
      state.trackQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getTournamentByName
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
    // getTeamTournamentsHistory
    builder.addCase(getTeamTournamentsHistory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTeamTournamentsHistory.fulfilled, (state, action) => {
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
    builder.addCase(getTeamTournamentsHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getRefereeTournamentsHistory
    builder.addCase(getRefreeTournamentsHistory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getRefreeTournamentsHistory.fulfilled, (state, action) => {
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
    builder.addCase(getRefreeTournamentsHistory.rejected, (state, action) => {
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
      const lastDoc = (thunkAPI.getState() as RootState).tournamentsearch.trackQuery.lastDoc;

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
      thunkAPI.dispatch(setTrackQuery({ lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], status: "all" }));
      return { tournaments: tournaments };
    } catch (error) {
      throw new Error("Error fetching tournaments");
    }
  }
);


export const getTeamTournamentsHistory = createAsyncThunk(
  "search/getTeamTournaments",
  async ({ teamId, status = 'all' }: { teamId: string, status?: FilterProgressStatus }, thunkAPI) => {
    try {
      const tournamentsCol = collection(firestore, "tournaments");
      const trackQuery = (thunkAPI.getState() as RootState).tournamentsearch.trackQuery;
      let lastDocState = trackQuery.lastDoc;

      if (trackQuery.status !== status) {
        console.log("status changed");
        thunkAPI.dispatch(setSearchResults([]));
        thunkAPI.dispatch(setTrackQuery({ lastDoc: null, status: status }));
        lastDocState = null;
      }

      let queryRef = status !== 'all'
        ? query(
          tournamentsCol,
          where("participants", "array-contains", teamId),
          where("status", "==", status),
          limit(4)
        )
        : query(
          tournamentsCol,
          where("participants", "array-contains", teamId),
          limit(4)
        );

      if (lastDocState) {
        queryRef = query(
          queryRef,
          startAfter(lastDocState)
        );
      }
      console.log(queryRef)
      const querySnapshot = await getDocs(queryRef);
      const tournaments: SearchedTournament[] = [];
      querySnapshot.forEach((doc) => {
        tournaments.push({
          tournament_info: doc.data() as Tournament,
          id: doc.id,
        });
      });
      thunkAPI.dispatch(setTrackQuery({ lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], status: status }));
      console.log({ lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], status: status })
      console.log("Here: ", { tournaments })
      return { tournaments: tournaments };
    } catch (error) {
      throw new Error("Error fetching tournaments");
    }
  }
);


export const getRefreeTournamentsHistory = createAsyncThunk(
  "search/getRefereeTournaments",
  async ({ uid, status = 'all' }: { uid: string, status?: FilterProgressStatus }, thunkAPI) => {
    try {
      const tournamentsCol = collection(firestore, "tournaments");
      const trackQuery = (thunkAPI.getState() as RootState).tournamentsearch.trackQuery;
      let lastDocState = trackQuery.lastDoc;

      if (trackQuery.status !== status) {
        console.log("status changed");
        thunkAPI.dispatch(setSearchResults([]));
        thunkAPI.dispatch(setTrackQuery({ lastDoc: null, status: status }));
        lastDocState = null;
      }

      let queryRef = status !== 'all'
        ? query(
          tournamentsCol,
          where("refree_ids", "array-contains", uid),
          where("status", "==", status),
          limit(4)
        )
        : query(
          tournamentsCol,
          where("refree_ids", "array-contains", uid),
          limit(4)
        );

      if (lastDocState) {
        queryRef = query(
          queryRef,
          startAfter(lastDocState)
        );
      }
      console.log(queryRef)
      const querySnapshot = await getDocs(queryRef);
      const tournaments: SearchedTournament[] = [];
      querySnapshot.forEach((doc) => {
        tournaments.push({
          tournament_info: doc.data() as Tournament,
          id: doc.id,
        });
      });
      thunkAPI.dispatch(setTrackQuery({ lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], status: status }));
      console.log({ lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], status: status })
      console.log("Here: ", { tournaments })
      return { tournaments: tournaments };
    } catch (error) {
      throw new Error("Error fetching tournaments");
    }
  }
);

export const { setSearchResults, setTrackQuery } = searchTournamentSlice.actions;
export default searchTournamentSlice.reducer;
