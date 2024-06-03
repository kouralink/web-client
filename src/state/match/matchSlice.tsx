import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore } from "@/services/firebase";
import {
  doc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";

import { MatchFirestore, Member, Team, User } from "../../types/types";
import { toast } from "@/components/ui/use-toast";
import { MatchDetailsFormValues } from "@/components/global/match/cards/MatchDetailsForm";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/services/firebase";
import { store } from "../store";

interface MatchState {
  match: MatchFirestore;
  team1Info: Team;
  team2Info: Team;
  team1Members: Member[];
  team2Members: Member[];
  refree: User | null;
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
    refree: {
      id: "",
      isAgreed: false,
    },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    endedAt: null,
    location: null,
    startIn: null,
    status: "coachs_edit",
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
  refree: null,
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
          });
          return;
        }
        // const startIn =  action.payload.startIn?.toMillis()
        // // convirst startin to TImestamp
        // if (startIn) {
        //   action.payload.startIn = Timestamp.fromMillis(startIn)
        // }
        state.match = action.payload;
      })
      .addCase(getMatchById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getTeamsInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeamsInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        state.team1Info = action.payload.team1Data;
        state.team2Info = action.payload.team2Data;
      })
      .addCase(getTeamsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getTeamsMembers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeamsMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        state.team1Members = action.payload.team1MembersData;
        state.team2Members = action.payload.team2MembersData;
      })
      .addCase(getTeamsMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getRefreeInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRefreeInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        state.refree = action.payload;
      })
      .addCase(getRefreeInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateMatchDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMatchDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Match details updated successfully",
          variant: "default",
        });
      })
      .addCase(updateMatchDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(setInProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setInProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Match status updated successfully",
          variant: "default",
        });
      })
      .addCase(setInProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(endMatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(endMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Match status updated successfully",
          variant: "default",
        });
      })
      .addCase(endMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(cancelMatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Match status updated successfully",
          variant: "default",
        });
      })
      .addCase(cancelMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(editResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editResult.fulfilled, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
          toast({
            title: "Error",
            description: action.payload,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Match status updated successfully",
          variant: "default",
        });
      })
      .addCase(editResult.rejected, (state, action) => {
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

export const getTeamsInfo = createAsyncThunk(
  "match/getTeamsInfo",
  async ({ id1, id2 }: { id1: string; id2: string }) => {
    try {
      const team1Ref = doc(firestore, "teams", id1);
      const team2Ref = doc(firestore, "teams", id2);
      const team1Snap = await getDoc(team1Ref);
      const team2Snap = await getDoc(team2Ref);
      if (team1Snap.exists() && team2Snap.exists()) {
        const team1Data = team1Snap.data() as Team;
        const team2Data = team2Snap.data() as Team;
        return { team1Data, team2Data };
      } else {
        return "Teams not found!";
      }
    } catch (error) {
      console.error(error);
      return "Getting teams info failed!";
    }
  }
);

export const getTeamsMembers = createAsyncThunk(
  "match/getTeamsMembers",
  async ({ id1, id2 }: { id1: string; id2: string }) => {
    try {
      const team1MembersRef = collection(firestore, "teams", id1, "members");
      const team2MembersRef = collection(firestore, "teams", id2, "members");
      const team1MembersSnap = await getDocs(team1MembersRef);
      const team2MembersSnap = await getDocs(team2MembersRef);
      const team1MembersData = team1MembersSnap.docs.map(
        (doc) => doc.data() as Member
      );
      const team2MembersData = team2MembersSnap.docs.map(
        (doc) => doc.data() as Member
      );
      // get all members user info from users collection using promise all
      await Promise.all(
        team1MembersData.map(async (member) => {
          const userRef = doc(firestore, "users", member.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            member.userInfo = userSnap.data() as User;
          }
        })
      );
      await Promise.all(
        team2MembersData.map(async (member) => {
          const userRef = doc(firestore, "users", member.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            member.userInfo = userSnap.data() as User;
          }
        })
      );
      return { team1MembersData, team2MembersData };
    } catch (error) {
      console.error(error);
      return "Getting teams members failed!";
    }
  }
);

export const getRefreeInfo = createAsyncThunk(
  "match/getRefreeInfo",
  async (refreeId: string) => {
    try {
      const refreeRef = doc(firestore, "users", refreeId);
      const refreeSnap = await getDoc(refreeRef);
      if (refreeSnap.exists()) {
        const refreeData = refreeSnap.data() as User;
        return refreeData;
      } else {
        return "Refree not found!";
      }
    } catch (error) {
      console.error(error);
      return "Getting refree info failed!";
    }
  }
);

interface refreeEdit {
  type: "edit_result" | "cancel_match" | "end_match" | "set_in_progress";
  result?: {
    team1: number;
    team2: number;
  };
}
interface coachEdit {
  startIn: number | Timestamp;
  location: string;
  refreeid: string;
}
interface UpdateMatchData {
  matchid: string;
  requestUpdateInfo: refreeEdit | coachEdit;
}

export const updateMatchDetails = createAsyncThunk(
  "match/updateMatchDetails",
  async ({
    matchData,
    who,
  }: {
    matchData: MatchDetailsFormValues;
    who: "coach" | "refree";
  }) => {
    try {
      console.log(matchData.refree_id);
      // check is user auth
      const authUSR = auth.currentUser;
      if (!authUSR) {
        return "User not authenticated!";
      }
      if (who === "coach") {
        // get mach id
        const matchid = store.getState().match.match.id;
        if (!matchid) {
          return "could not get matchid";
        }
        const requestUpdateInfo: coachEdit = {
          startIn: Timestamp.fromDate(matchData.startin as Date).toMillis(),
          location: matchData.location as string,
          refreeid: matchData.refree_id as string,
        };
        const newMatchData: UpdateMatchData = {
          matchid,
          requestUpdateInfo,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const changeCoachCloudFunction: (data: UpdateMatchData) => any =
          httpsCallable(functions, "updateMatch");
        const result = await changeCoachCloudFunction(newMatchData);
        console.log("firebase function reuslt is:", result);
        store.dispatch(getMatchById(matchid));
      }
      return true;
    } catch (error) {
      console.error(error);
      console.log(error);
      return "Updating match details failed!";
    }
  }
);

// se in progress action for refree
export const setInProgress = createAsyncThunk(
  "match/setInProgress",
  async () => {
    try {
      // check is user auth
      const authUSR = auth.currentUser;
      if (!authUSR) {
        return "User not authenticated!";
      }
      const matchid = store.getState().match.match.id;
      if (!matchid) {
        return "could not get matchid";
      }
      const requestUpdateInfo: refreeEdit = {
        type: "set_in_progress",
      };
      const newMatchData: UpdateMatchData = {
        matchid,
        requestUpdateInfo,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const changeCoachCloudFunction: (data: UpdateMatchData) => any =
        httpsCallable(functions, "updateMatch");
      const result = await changeCoachCloudFunction(newMatchData);
      console.log("firebase function reuslt is:", result);
      store.dispatch(getMatchById(matchid));
      return true;
    } catch (error) {
      console.error(error);
      console.log(error);
      return "Updating match details failed!";
    }
  }
);

// end match action for refree

export const endMatch = createAsyncThunk("match/endMatch", async () => {
  try {
    // check is user auth
    const authUSR = auth.currentUser;
    if (!authUSR) {
      return "User not authenticated!";
    }
    const match = store.getState().match.match;
    if (!match.id) {
      return "could not get matchid";
    }
    const requestUpdateInfo: refreeEdit = {
      type: "end_match",
    };
    // check if match team1 score or team2 score is null
    if (match.team1.score === null || match.team2.score === null) {
      return "Match score is not set!";
    }
    const newMatchData: UpdateMatchData = {
      matchid: match.id,
      requestUpdateInfo,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeCoachCloudFunction: (data: UpdateMatchData) => any =
      httpsCallable(functions, "updateMatch");
    const result = await changeCoachCloudFunction(newMatchData);
    console.log("firebase function reuslt is:", result);
    store.dispatch(getMatchById(match.id));
    return true;
  } catch (error) {
    console.error(error);
    console.log(error);
    return "Updating match details failed!";
  }
});

// cancel match action for refree
export const cancelMatch = createAsyncThunk("match/cancelMatch", async () => {
  try {
    // check is user auth
    const authUSR = auth.currentUser;
    if (!authUSR) {
      return "User not authenticated!";
    }
    const matchid = store.getState().match.match.id;
    if (!matchid) {
      return "could not get matchid";
    }
    const requestUpdateInfo: refreeEdit = {
      type: "cancel_match",
    };
    const newMatchData: UpdateMatchData = {
      matchid,
      requestUpdateInfo,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeCoachCloudFunction: (data: UpdateMatchData) => any =
      httpsCallable(functions, "updateMatch");
    const result = await changeCoachCloudFunction(newMatchData);
    console.log("firebase function reuslt is:", result);
    store.dispatch(getMatchById(matchid));
    return true;
  } catch (error) {
    console.error(error);
    console.log(error);
    return "Updating match details failed!";
  }
});

// edit result action for refree
export const editResult = createAsyncThunk(
  "match/editResult",
  async ({ team1, team2 }: { team1: number; team2: number }) => {
    try {
      // check is user auth
      const authUSR = auth.currentUser;
      if (!authUSR) {
        return "User not authenticated!";
      }
      const matchid = store.getState().match.match.id;
      if (!matchid) {
        return "could not get matchid";
      }
      const requestUpdateInfo: refreeEdit = {
        type: "edit_result",
        result: {
          team1,
          team2,
        },
      };
      const newMatchData: UpdateMatchData = {
        matchid,
        requestUpdateInfo,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const changeCoachCloudFunction: (data: UpdateMatchData) => any =
        httpsCallable(functions, "updateMatch");
      const result = await changeCoachCloudFunction(newMatchData);
      console.log("firebase function reuslt is:", result);
      store.dispatch(getMatchById(matchid));
      return true;
    } catch (error) {
      console.error(error);
      console.log(error);
      return "Updating match details failed!";
    }
  }
);

export default matchSlice.reducer;
