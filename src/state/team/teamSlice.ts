// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore, storage } from "@/services/firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

import { Team, TeamState } from "../../types/types";
import { CreateTeamFormValues } from "@/components/global/CreateTeam";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";

const initialState: TeamState = {
  team: {
    id: "",
    teamName: "",
    blackList: [],
    coach: "",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "",
    description: "",
    createdBy: "",
    members: [],
  },
  status: "idle",
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<Team>) => {
      state.team = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = action.payload;
    },
    clearTeam: (state) => {
      state.team = initialState.team;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.team = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.team = action.payload;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(createTeam.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.status = "idle";
        if (typeof action.payload === "object" && action.payload !== null) {
          state.team = action.payload;
          toast({
            variant: "default",
            title: "Team Created",
            description: "Team created successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.team = initialState.team;
          toast({
            variant: "default",
            title: "Team Creation Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        console.log("rejected");
        state.status = "failed";
        console.log(action.error);
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Team Creation Failed 2",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
  },
});
// create asyncThunk for get team using axios from backend localhost:3000/teams/:id
export const getTeam = createAsyncThunk("team/getTeam", async (id: string) => {
  try {
    const teamRef = doc(firestore, "teams", id);
    const teamSnap = await getDoc(teamRef);
    if (teamSnap.exists()) {
      return teamSnap.data() as Team;
    } else {
      throw new Error("No such document!");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data as string);
  }
});

// create asyncThunk for update team using axios from backend localhost:3000/teams using post method
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (team: Team) => {
    try {
      const docRef = doc(firestore, "teams", team.id);
      await setDoc(docRef, team);
      return team;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data as string);
    }
  }
);

const isItUniqueTeamName = async (teamName: string) => {
  //  teamName is the team id
  try {
    const teamRef = doc(firestore, "teams", teamName);
    const teamSnap = await getDoc(teamRef);
    if (teamSnap.exists()) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (team:CreateTeamFormValues) => {
    try {
      if (!auth.currentUser) {
        throw new Error("User not logged in");
      }
      const isUnique = await isItUniqueTeamName(team.teamName);
      if (isUnique) {
        // upload image
        const storageRef = ref(storage, `Avatars/${team.teamName}`);
        const uploadTask = uploadBytesResumable(storageRef, team.logo as Blob);
        let logoUrl = "";


        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast({
              variant: "default",
              title: "Upload progress",
              description: "Upload is " + progress.toFixed(2) + "% done",
              className:
                "text-secondary-foreground border-2 border-secondary-foreground text-start",
            });
            switch (snapshot.state) {
              case "paused":
                teamSlice.actions.setLoading("idle");
                console.log("Upload is paused");
                break;
              case "running":
                teamSlice.actions.setLoading("loading");

                console.log("Upload is running");
                break;
            }
          },
          () => {
            // Error
            toast({
              variant: "default",
              title: "Upload Image Failed!3",
              description: "Upload failed! Please try again.",
              className: "text-error border-2 border-error text-start",
            });
          },
          () => {
            // Complete
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              logoUrl = downloadURL as string;
              toast({
                variant: "default",
                title: "Upload Image",
                description: "Image uploaded successfully!",
                className: "text-primary border-2 border-primary text-start",
              });
              teamSlice.actions.setLoading("idle");
            });
          }
        );



        const docRef = doc(firestore, "teams", team.teamName);
        await setDoc(docRef, {
          teamName: team.teamName,
          coach: auth.currentUser.uid,
          blackList: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          teamLogo: logoUrl,
          description: team.teamBio,
          createdBy: auth.currentUser.uid,
          members: [],
        });
        // get doc

        const teamInfo = await getDoc(docRef);
        if (teamInfo.exists()) {
          console.log("teamInfo", teamInfo.data());
          
          return teamInfo.data() as Team;
        } else {
          throw new Error("Team Doesn't created!");
        }
      } else {
        console.log("Team Name Not Unique");
        toast({
          variant: "default",
          title: "Team Name Not Unique",
          description: "Team name is not unique! Please try another name.",
          className: "text-error border-2 border-error text-start",
        });
        return "Team name is not unique";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data as string);
    }
  }
);

export const { setTeam, clearTeam, setError, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
