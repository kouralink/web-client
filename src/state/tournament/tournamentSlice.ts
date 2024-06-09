// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { CreateTournamentFormValues } from "@/pages/tournament/Create";
import { Team, Tournament, User } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp, updateDoc } from "firebase/firestore";
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


export interface UpdateTournamentDataType {
  name?: string;
  description?: string;
  logo?: Blob;
  location?: string;
  min_members_in_team?: number;
  max_participants?: number;
  start_date?: Timestamp;
}

interface TournamentState {
  tournament: Tournament;
  isLoading: boolean;
  error: string | null;
  refereesInfo: User[];
  teamsInfo: Team[]
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
  teamsInfo: [],
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

    // getTournamentById
    builder
      .addCase(getTournamentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTournamentById.fulfilled, (state, action: PayloadAction<Tournament>) => {
        state.isLoading = false;
        state.tournament = action.payload;
      })
      .addCase(getTournamentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });


    // getParticipantsTeams
    builder
      .addCase(getParticipantsTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParticipantsTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.isLoading = false;
        state.teamsInfo = action.payload;
      })
      .addCase(getParticipantsTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    // getReferees
    builder
      .addCase(getReferees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReferees.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.refereesInfo = action.payload;
      })
      .addCase(getReferees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    // updateTournament
    builder
      .addCase(updateTournament.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTournament.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.tournament = action.payload.tournament;
          toast({
            variant: "default",
            title: "Tournament Updated",
            description: "Tournament updated successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.tournament = initialState.tournament;
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Tournament Update Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(updateTournament.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        toast({
          variant: "default",
          title: "Tournament Update Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });

    // kickTeam
    builder
      .addCase(kickTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(kickTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (typeof action.payload === "object" && action.payload?.teamId) {
          const teamId: string = action.payload.teamId;
          state.teamsInfo = state.teamsInfo.filter((teamInfo) => teamInfo.id !== teamId);
          toast({
            variant: "default",
            title: "Team Kicked",
            description: "Team kicked successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Team Kick Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(kickTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        toast({
          variant: "default",
          title: "Team Kick Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
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
    if (accountType !== "tournament_manager") {
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


export const getTournamentById = createAsyncThunk(
  "tournament/getTournamentById",
  async (id: string, thunkAPI) => {
    const docRef = doc(firestore, "tournaments", id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return thunkAPI.rejectWithValue("Tournament Doesn't Exist!");
    }
    const tournament = snap.data() as Tournament;

    // Dispatch getParticipantsTeams and getReferees actions
    thunkAPI.dispatch(getParticipantsTeams(tournament.participants));
    thunkAPI.dispatch(getReferees(tournament.refree_ids));
    console.log(tournament);
    return tournament;
  }
);

export const getParticipantsTeams = createAsyncThunk(
  "tournament/getParticipantsTeams",
  async (participantIds: string[]) => {
    const participantsTeamsData = await Promise.all(
      participantIds.map(async (id) => {
        const docRef = doc(firestore, "teams", id);
        const docSnap = await getDoc(docRef);
        return { ...docSnap.data(), id: docSnap.id } as Team;
      })
    );
    return participantsTeamsData;
  }
);

export const getReferees = createAsyncThunk(
  "tournament/getReferees",
  async (refereeIds: string[]) => {
    const refereesData = await Promise.all(
      refereeIds.map(async (id) => {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as User;
      })
    );
    return refereesData;
  }
);



export const updateTournament = createAsyncThunk(
  "tournament/updateTournament",
  async ({ tournament, id }: { id: string; tournament: UpdateTournamentDataType }) => {
    try {
      // check authentication
      if (!auth.currentUser) {
        return "This action requires authentication please login first";
      }

      // check accountType
      const userRef = doc(firestore, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        if (user.accountType !== "tournament_manager") {
          return "User is not an tournament_manager";
        }
      } else {
        return "User not found";
      }

      // check if tournament name is unique
      const newTournamentData: {
        name?: string;
        description?: string;
        logo?: string;
        location?: string;
        min_members_in_team?: number;
        max_participants?: number;
        start_date?: Timestamp;
      } = {};
      if (tournament.name) {
        newTournamentData.name = tournament.name;
      }
      if (tournament.description) {
        newTournamentData.description = tournament.description;
      }
      if (tournament.location) {
        newTournamentData.location = tournament.location;
      }
      if (tournament.min_members_in_team) {
        newTournamentData.min_members_in_team = tournament.min_members_in_team;
      }
      if (tournament.max_participants) {
        newTournamentData.max_participants = tournament.max_participants;
      }
      if (tournament.start_date) {
        newTournamentData.start_date = tournament.start_date;
      }
      console.log(newTournamentData)

      let logoUrl = "";

      if (tournament.logo) {
        const storageRef = ref(storage, `Tournament/Logo/${id}`);
        const snapshot = await uploadBytesResumable(
          storageRef,
          tournament.logo as Blob
        );

        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          newTournamentData.logo = logoUrl;
          toast({
            variant: "default",
            title: "Upload Image",
            description: "Image uploaded successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } catch (error) {
          return "Get Download URL Failed!";
        }
      }

      console.log("here is it:", newTournamentData);
      const docRef = doc(firestore, "tournaments", id);
      await setDoc(
        docRef,
        {
          updatedAt: Timestamp.now(),
          ...newTournamentData,
        },
        { merge: true }
      );

      const tournamentInfo = { ...store.getState().tournament.tournament, ...newTournamentData };

      if (tournamentInfo) {
        const data = {
          tournament: tournamentInfo,
        };

        return data;
      } else {
        return "Tournament Doesn't created!";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error instanceof FirebaseError) {
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);


export const removeTeamFromTournament = async (
  tournamentId: string,
  teamId: string,
) => {
  try {
    // check if the user.uid is the manager of tournamentId
    const authUID = auth.currentUser?.uid;
    if (!authUID) {
      return "User not authenticated!";
    }

    const tournamentRef = doc(firestore, "tournaments", tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);
    if (!tournamentSnap.exists()) {
      return "Tournament not found!";
    }

    const tournament = tournamentSnap.data() as Tournament;
    if (authUID !== tournament.manager_id) {
      return "You are not the manager of this tournament!";
    }

    // check if the teamId in tournament
    if (!tournament.participants.includes(teamId)) {
      return "Team not in the tournament!";
    }

    // remove teamId from participants
    const updatedParticipants = tournament.participants.filter(id => id !== teamId);
    await updateDoc(tournamentRef, { participants: updatedParticipants });

    return true;
  } catch (error) {
    return `Team Kick Failed!`;
  }
};

export const kickTeam = createAsyncThunk(
  "tournament/kickTeam",
  async ({ teamId, tournamentId }: { teamId: string; tournamentId: string }) => {
    try {
      const result = await removeTeamFromTournament(tournamentId, teamId);
      if (result === true) {
        return { teamId: teamId };
      }
      return result;
    } catch (error) {
      return "Team Kick Failed!";
    }
  }
);

export default teamSlice.reducer;
