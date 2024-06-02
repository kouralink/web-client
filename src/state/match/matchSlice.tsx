import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore } from "@/services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
  collectionGroup,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  or,
  orderBy,
  limit,
} from "firebase/firestore";

import { MatchFirestore, Member, Team, User } from "../../types/types";
import { toast } from "@/components/ui/use-toast";
import { store } from "../store";

interface MatchState {
  match: MatchFirestore;
  team1Info: Team;
  team2Info: Team;
  team1Members: Member[];
  team2Members: Member[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: MatchState = {
  isLoading: false,
  error: null,
  match: {
    id: "",
    team1: {
      id: "",
      score: null,
      isAgreed: false,
    },
    team2: {
      id: "",
      score: null,
      isAgreed: false,
    },
    referee_id: "",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    endedAt: null,
    location: null,
    startIn: null,
    status: "pending",
    type: "classic_match",
  },
  team1Info: {
    id: "",
    teamName: "",
    blackList: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "",
    description: "",
    createdBy: "",
  },
  team2Info: {
    id: "",
    teamName: "",
    blackList: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "",
    description: "",
    createdBy: "",
  },
  team1Members: [],
  team2Members: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMatchById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          })
          return;
        }
        state.match = action.payload;
      })
      .addCase(getMatchById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const getMatchById = createAsyncThunk(
  "match/getMatchById",
  async (matchId: string) => {
    try {
      const matchRef = doc(firestore, "matches", matchId);
      const matchSnap = await getDoc(matchRef);
      if (matchSnap.exists()) {
        const matchData = matchSnap.data() as MatchFirestore;
        return matchData;
      } else {
        return "Match not found!";
      }
    } catch (error) {
      console.error(error);
      return "Getting match info failed!";
    }
  }
);

export default matchSlice.reducer;
