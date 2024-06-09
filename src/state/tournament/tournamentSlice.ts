// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { CreateTournamentFormValues } from "@/pages/tournament/Create";
import { Tournament, User } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { auth, firestore, storage } from "@/services/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { store } from "../store";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { toast } from "@/components/ui/use-toast";

interface TournamentState {
  tournament: Tournament;
  isLoading: boolean;
  error: string | null;
  refereesInfo: User[];
}

const initialState: TournamentState = {
  tournament: {
    id: "",
    name: "",
    logo: "",
    description: "",
    start_date: Timestamp.now(),
    end_date: null,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
    created_by: "",
    refree_ids: [],
    location: "",
    participants: [],
    status: "pending",
    min_members_in_team: 0,
    max_participants: 0,
    manager_id: "",
  },
  isLoading: false,
  error: null,
  refereesInfo: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTournament.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTournament.fulfilled, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
        toast({
          title: "Error",
          description: action.payload,
          variant: "destructive",
        });
      } else {
        state.tournament = action.payload;
        toast({
          title: "Success",
          description: "Tournament Created Successfully",
        });
      }
    });
    builder.addCase(createTournament.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const getAuthUserManagerTournament = async () => {
  try {
    // is auth
    if (!auth.currentUser) {
      return "This action requires authentication please login first";
    }
    // is a tournamnet manager
    const accountType = store.getState().auth.user?.accountType;
    if (accountType !== "tournement_manager") {
      return "User is not a Tournament Manager, you need to change your account type!";
    }
    // get tournamnet info from tournaments collection where manager_id === uid
    const q = query(
      collection(firestore, "tournaments"),
      where("manager_id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    // check existance
    if (querySnapshot.empty) {
      return false;
    }
    // get tournament info
    let tournament: Tournament = {} as Tournament;
    querySnapshot.forEach((doc) => {
      tournament = doc.data() as Tournament;
    });
    return tournament;
  } catch (er) {
    console.log(er);
    return "An error occurred, In checking if user have tournament!";
  }
};

export const createTournament = createAsyncThunk(
  "team/createTeam",
  async (tournament: CreateTournamentFormValues) => {
    try {
      if (!auth.currentUser) {
        return "This action requires authentication please login first";
      }
      //   get uid
      const uid = auth.currentUser.uid;
      // check if user already have a tournament
      const tournamentInfo = await getAuthUserManagerTournament();
      if (typeof tournamentInfo === "string") {
        return tournamentInfo;
      } else if (tournamentInfo) {
        return "You already have a tournament!";
      }

      // get tournament id
      const tournamentid = doc(collection(firestore, "tournaments")).id;
      console.log("Tournament ID:", tournamentid);
      // upload image
      const storageRef = ref(storage, `Tournament/Logos/${tournamentid}`);

      const snapshot = await uploadBytesResumable(
        storageRef,
        tournament.logo as Blob
      );

      let logoUrl = "";
      try {
        logoUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.log(error);
        return "Get Download URL Failed!";
      }
      // create tournament
      const tournamentData = {
        id: tournamentid,
        name: tournament.name,
        logo: logoUrl,
        description: tournament.description,
        start_date: Timestamp.fromDate(new Date(tournament.start_date)),
        end_date: null,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
        created_by: uid,
        refree_ids: [],
        location: tournament.location,
        participants: [],
        status: "pending",
        min_members_in_team: tournament.min_members,
        max_participants: tournament.max_participants,
        manager_id: uid,
      };

      await setDoc(doc(firestore, "tournaments", tournamentid), tournamentData);

      // get tournament data
      const docRef = doc(firestore, "tournaments", tournamentid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data() as Tournament;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return "Could Get Tournament Data!";
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);

export default teamSlice.reducer;