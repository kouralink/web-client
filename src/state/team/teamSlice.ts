// create store for team manage team have a id and a teamName and a blackList of users that are not allowed to join the team, and a coach that is team leader and createdAt date updateAt date and teamLogo and description and createdBy that is the user that created the team
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore, storage } from "@/services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";

import { Member, Team, TeamState, User } from "../../types/types";
import { CreateTeamFormValues } from "@/pages/team/CreateTeam";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import { isItAlreadyInATeam } from "../auth/authSlice";

const initialState: TeamState = {
  team: {
    id: "",
    teamName: "",
    blackList: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    teamLogo: "",
    description: "",
    createdBy: "",
  },
  members: [],
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
    clearTeam: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(createTeam.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.team = action.payload.team;
          state.members = action.payload.members;

          toast({
            variant: "default",
            title: "Team Created",
            description: "Team created successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
          // redirect to team page
          

        } else {
          state.team = initialState.team;
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Team Creation Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
        window.location.href = `/team/${state.team.teamName}`;
      })
      .addCase(createTeam.rejected, (state, action) => {
        console.log("rejected");
        state.status = "failed";
        console.log(action.error);
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Team Creation Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(getTeamByTeamName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTeamByTeamName.fulfilled, (state, action) => {

        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.team = action.payload.team;
          state.members = action.payload.members;
        }else{
          state.team = initialState.team;
          state.error = action.payload as string;

          toast({
            variant: "default",
            title: "Get Team Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(getTeamByTeamName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      builder.addCase(refreshTeamMembers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }).addCase(refreshTeamMembers.fulfilled, (state, action) => {
        state.status = "idle";
        state.members = action.payload;
        toast({
          variant: "default",
          title: "Refresh Team Members",
          description: "Team members refreshed successfully!",
          className: "text-primary border-2 border-primary text-start",
        })
      }).addCase(refreshTeamMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Refresh Team Members Failed",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
  },
});

const getMemberInfo = async (uid: string) => {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
} 


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

const getTeamMembers = async (teamName: string) => {
  try {
    const teamRef = doc(firestore, "teams", teamName);
    const membersRef = collection(teamRef, "members");
    const membersSnap = await getDocs(membersRef);
    const members: Member[] = [];
    membersSnap.forEach((doc) => {
      const m = {
        uid: doc.id,
        ...doc.data(),
      } as Member;
      members.push(m);
    });
    return members;
  } catch (error) {
    console.log('Members Error', error);
    return [];
  }
}

export const getTeamByTeamName = createAsyncThunk(
  "team/getTeamByTeamName",
  async (teamName: string) => {
    try {
      const teamRef = doc(firestore, "teams", teamName);
      const teamSnap = await getDoc(teamRef);
      if (teamSnap.exists()) {
        // get members
        const members = await getTeamMembers(teamName);
        const updatedMembers = await Promise.all(
          members.map(async (member) => {
            const userInfo = await getMemberInfo(member.uid);
            return {
              ...member,
              userInfo
            };
          })
        );
        
        const data = {
          members: updatedMembers,
          team:teamSnap.data() as Team,
        };

        return data;
      } else {
        return "Team Doesn't Exist!"
      }
    } catch (error) {
      return "Team couldn't be fetched!"
    }
  }
);


export const refreshTeamMembers = createAsyncThunk(
  "team/refreshTeamMembers",
  async (teamName: string) => {
    try {
      const members = await getTeamMembers(teamName);
      members.map(async (member) => {
        member.userInfo = await getMemberInfo(member.uid) as User;
      });
      return members;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (team: CreateTeamFormValues) => {
    try {
      if (!auth.currentUser) {
        return "This action requires authentication please login first";
      }
      console.log(1)
      // check accountType
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data() as User;
          if (user.accountType !== "coach") {
            
            return "User is not a coach"
          } else{
            // test if user already have a team
            const isInTeam = await isItAlreadyInATeam(auth.currentUser.uid);
            if (isInTeam) {
              return "User already in a team"
            }
          }
        } else {
          return "User not found"
        }

      console.log(2)

      const isUnique = await isItUniqueTeamName(team.teamName);
      if (isUnique) {
        // upload image
        const storageRef = ref(storage, `Avatars/${team.teamName}`);
        // const uploadTask =  uploadBytesResumable(storageRef, team.logo as Blob);
        // let logoUrl = "";

        // uploadTask.on(
        //   "state_changed",
        //   (snapshot) => {
        //     // Progress
        //     const progress =
        //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     toast({
        //       variant: "default",
        //       title: "Upload progress",
        //       description: "Upload is " + progress.toFixed(2) + "% done",
        //       className:
        //         "text-secondary-foreground border-2 border-secondary-foreground text-start",
        //     });
        //     switch (snapshot.state) {
        //       case "paused":
        //         teamSlice.actions.setLoading("idle");
        //         console.log("Upload is paused");
        //         break;
        //       case "running":
        //         teamSlice.actions.setLoading("loading");

        //         console.log("Upload is running");
        //         break;
        //     }
        //   },
        //   () => {
        //     // Error
        //     toast({
        //       variant: "default",
        //       title: "Upload Image Failed!3",
        //       description: "Upload failed! Please try again.",
        //       className: "text-error border-2 border-error text-start",
        //     });
        //   },
        //   () => {
        //     // Complete
        //     getDownloadURL(uploadTask.snapshot.ref).then(
        //       async (downloadURL) => {
        //         console.log("File available at", downloadURL);
        //         logoUrl = downloadURL as string;
        //         toast({
        //           variant: "default",
        //           title: "Upload Image",
        //           description: "Image uploaded successfully!",
        //           className: "text-primary border-2 border-primary text-start",
        //         });
        //         teamSlice.actions.setLoading("idle");
        //       }
        //     );
        //   }
        // );

        const snapshot =  await uploadBytesResumable(storageRef, team.logo as Blob);
      console.log(3)

        let logoUrl = "";
        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          console.log(logoUrl)
          toast({
            variant: "default",
            title: "Upload Image",
            description: "Image uploaded successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } catch (error) {
          console.log(error);
          return "Get Download URL Failed!";
        }

        const docRef = doc(firestore, "teams", team.teamName);
        await setDoc(docRef, {
          teamName: team.teamName,
          blackList: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          teamLogo: logoUrl,
          description: team.teamBio,
          createdBy: auth.currentUser.uid,
        });
        // set members doc on /teams/teamName/members/userId
        const membersDocRef = doc(docRef, "members", auth.currentUser.uid);
        await setDoc(membersDocRef, {
          role: "coach",
          joinedAt: Timestamp.now(),
        });

        // get doc

        const teamInfo = await getDoc(docRef);
        if (teamInfo.exists()) {
          console.log("teamInfo", teamInfo.data());
          // get members
          
          const members = await getTeamMembers(team.teamName);
          members.map(async (member) => {
            member.userInfo = await getMemberInfo(member.uid) as User;
          });
          

          const data = {
            members: members,
            team:teamInfo.data() as Team,
          };

          return data;
        } else {
          return "Team Doesn't created!"
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
