
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { Team } from "@/types/types"; 
import axios from "axios";


interface SearchState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: (Team|User)[];
}

const initialState:SearchState = {
  isLoading: false,
  error: null,
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchSuccess: (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    searchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByTeamName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchByTeamName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchByTeamName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(searchByUserName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchByUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchByUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

// search by team name
export const searchByTeamName = createAsyncThunk(
  "search/searchByTeamName",
  async (teamName: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/teams/search/${teamName}`);
        return response.data;
    }catch (error) {
      throw new Error("Error searching for team");
    }
  }
);

// search by user name
export const searchByUserName = createAsyncThunk(
  "search/searchByUserName",
  async (userName: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/search?userName=${userName}`);
        return response.data;
    }catch (error) {
      throw new Error("Error searching for user");
    }
  }
);

export const { searchStart, searchSuccess, searchFailure } = searchSlice.actions;
export default searchSlice.reducer;