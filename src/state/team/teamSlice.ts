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
  collectionGroup,
  query,
  where,
  deleteDoc,
  updateDoc,
  arrayUnion,
  or,
  orderBy,
  limit,
  and,
  startAfter,
} from "firebase/firestore";

import { FilterProgressStatus, Match, Member, Team, TeamState, User } from "../../types/types";
import { CreateTeamFormValues } from "@/pages/team/CreateTeam";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import { isItAlreadyInATeam } from "../auth/authSlice";
import { UpdateTeamDataType } from "@/pages/team/UpdateTeam";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/services/firebase";
import { RootState, store } from "../store";
import { FirebaseError } from "firebase/app";

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
  blackListInfos: [],
  MatchesHistory: [],
  status: "idle",
  error: null,
  trackQuery: { lastDoc: null, status: "all" },
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<Team>) => {
      state.team = action.payload;
    },
    setMatchesHistory: (state, action: PayloadAction<Match[] | []>) => {
      state.MatchesHistory = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTrackQuery: (state, action: PayloadAction<{ lastDoc: any, status: FilterProgressStatus }>) => {
      state.trackQuery = action.payload;
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
        // console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        // console.log("fulfilled");
        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.team = action.payload.team;
          state.members = action.payload.members;
          state.error = "  0  ";

          toast({
            variant: "default",
            title: "Team Created",
            description: "Team created successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.team = initialState.team;
          state.error = action.payload as string;
          toast({
            variant: "destructive",
            title: "Team Creation Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        // console.log("rejected");
        state.status = "failed";
        // console.log(action.error);
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
          state.MatchesHistory = [];
          state.team = action.payload.team;
          state.members = action.payload.members;
        } else {
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
    builder
      .addCase(refreshTeamMembers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(refreshTeamMembers.fulfilled, (state, action) => {
        state.status = "idle";
        state.members = action.payload;
        toast({
          variant: "default",
          title: "Refresh Team Members",
          description: "Team members refreshed successfully!",
          className: "text-primary border-2 border-primary text-start",
        });
      })
      .addCase(refreshTeamMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Refresh Team Members Failed",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(updateTeam.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.team = action.payload.team;
          state.error = "  1  ";
          toast({
            variant: "default",
            title: "Team Updated",
            description: "Team updated successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.team = initialState.team;
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Team Update Failed",
            description: action.payload as string,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Team Update Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(kickMember.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(kickMember.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload?.uid) {
          const uid: string = action.payload.uid;
          state.members = state.members.filter((member) => member.uid !== uid);
          toast({
            variant: "default",
            title: "Player Kicked",
            description: "Player kicked successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Player Kick Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(kickMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Player Kick Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(banMember.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(banMember.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (typeof action.payload === "object" && action.payload?.uid) {
          const uid: string = action.payload.uid;
          state.members = state.members.filter((member) => member.uid !== uid);
          toast({
            variant: "default",
            title: "Player Banned",
            description: "Player banned successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Player Ban Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(banMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Player Ban Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(leaveTeam.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(leaveTeam.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (action.payload === true) {
          toast({
            variant: "default",
            title: "Leave Team",
            description: "You have left the team successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Leave Team Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(leaveTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Leave Team Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(changeCoach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changeCoach.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (action.payload === true) {
          toast({
            variant: "default",
            title: "Change Coach",
            description: "Coach changed successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Change Coach Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(changeCoach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Change Coach Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(updateBlackListInfos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBlackListInfos.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.blackListInfos = action.payload;
      })
      .addCase(updateBlackListInfos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(dispandUserFromTeamBlackList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(dispandUserFromTeamBlackList.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (
          typeof action.payload === "object" &&
          action.payload.blackList !== null
        ) {
          state.team.blackList = action.payload.blackList;
          toast({
            variant: "default",
            title: "Player Dispanded",
            description: "Player dispanded successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Player Dispand Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(dispandUserFromTeamBlackList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Player Dispand Rejected",
          description: state.error,
          className: "text-error border-2 border-error text-start",
        });
      });
    builder
      .addCase(getTeamMatchesHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;

      })
      .addCase(getTeamMatchesHistory.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (
          typeof action.payload === "object" &&
          action.payload !== null &&
          action.payload.matches
        ) {
          console.log("udpate 2:", action.payload.matches);
          // Only add a match to MatchesHistory if it's not already present
          action.payload.matches.forEach((newMatch) => {
            if (!state.MatchesHistory.some((existingMatch) => existingMatch.id === newMatch.id)) {
              state.MatchesHistory.push(newMatch);
            }
          });
        } else {
          state.MatchesHistory = [];
        }

        // console.log('udpate 2:', action.payload.matches)
        // console.log("getting matches history another failed");
      })
      .addCase(getTeamMatchesHistory.rejected, (state, action) => {
        // console.log("getting matches history failed");
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(leaveTeamForCoach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(leaveTeamForCoach.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        if (action.payload === true) {
          toast({
            variant: "default",
            title: "Leave Team",
            description: "You have left the team successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } else {
          state.error = action.payload as string;
          toast({
            variant: "default",
            title: "Leave Team Failed",
            description: state.error,
            className: "text-error border-2 border-error text-start",
          });
        }
      })
      .addCase(leaveTeamForCoach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast({
          variant: "default",
          title: "Leave Team Rejected",
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
    // console.log(error);
    return null;
  }
};

const isItUniqueTeamName = async (teamName: string) => {
  //  teamName is the team id
  try {
    const colRef = collection(firestore, "teams");
    const queryRef = query(colRef, where("teamName", "==", teamName));
    const snap = await getDocs(queryRef);
    if (snap.empty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
};

const getTeamMembers = async (docID: string) => {
  try {
    const teamRef = doc(firestore, "teams", docID);
    const membersRef = collection(teamRef, "members");
    const membersSnap = await getDocs(membersRef);
    const members: Member[] = [];
    membersSnap.forEach((doc) => {
      members.push(doc.data() as Member);
    });
    return members;
  } catch (error) {
    // console.log("Members Error", error);
    return [];
  }
};

export const getTeamByTeamName = createAsyncThunk(
  "team/getTeamByTeamName",
  async (teamName: string, thunkAPI) => {
    try {
      const colRef = collection(firestore, "teams");
      const queryRef = query(colRef, where("teamName", "==", teamName));
      const snap = await getDocs(queryRef);
      if (snap.empty) {
        return "Team Doesn't Exist!";
      }
      const teamData = { ...snap.docs[0].data(), id: snap.docs[0].id } as Team;

      const members = await getTeamMembers(teamData.id);
      const updatedMembers = await Promise.all(
        members.map(async (member) => {
          const userInfo = await getMemberInfo(member.uid);
          return {
            ...member,
            userInfo,
          };
        })
      );

      const data = {
        members: updatedMembers,
        team: teamData,
      };
      // Reset Some state to default
      thunkAPI.dispatch(setMatchesHistory([]))
      thunkAPI.dispatch(setTrackQuery({ lastDoc: null, status: "all" }))
      thunkAPI.dispatch(getTeamMatchesHistory({ teamId: teamData.id, status: "all" }))
      thunkAPI.dispatch(updateBlackListInfos())
      return data;
    } catch (error) {
      return "Team couldn't be fetched!";
    }
  }
);




export const refreshTeamMembers = createAsyncThunk(
  "team/refreshTeamMembers",
  async (teamId: string) => {
    try {
      const members = await getTeamMembers(teamId);
      members.map(async (member) => {
        member.userInfo = (await getMemberInfo(member.uid)) as User;
      });
      return members as Member[];
    } catch (error) {
      // console.log(error);
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
      // check team name should be lowercase 4 to 30 caraceters regix
      const teamNameRegex = /^[a-z0-9_]{4,30}$/;
      if (!teamNameRegex.test(team.teamName)) {
        return "Team name should be lowercase 4 to 30 caracters!";
      }

      // console.log(1);
      // check accountType
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        if (user.accountType !== "coach") {
          return "User is not a coach, you need to change your account type!";
        }
        // test if user already have a team
        const isInTeam = await isItAlreadyInATeam(auth.currentUser.uid);
        if (isInTeam) {
          return "User already in a team";
        }
      } else {
        return "User not found";
      }

      const isUnique = await isItUniqueTeamName(team.teamName.toLowerCase());
      if (isUnique) {
        // upload image
        const storageRef = ref(storage, `Team/Logos/${team.teamName}`);

        const snapshot = await uploadBytesResumable(
          storageRef,
          team.logo as Blob
        );

        let logoUrl = "";
        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          // toast({
          //   variant: "default",
          //   title: "Upload Image",
          //   description: "Image uploaded successfully!",
          //   className: "text-primary border-2 border-primary text-start",
          // });
        } catch (error) {
          // console.log(error);
          return "Get Download URL Failed!";
        }

        // const colRef = collection(firestore, "teams");

        // // add doc to teams collection
        // const docRef = await addDoc(colRef, {
        //   teamName: team.teamName.toLowerCase(),
        //   blackList: [],
        //   createdAt: Timestamp.now(),
        //   updatedAt: Timestamp.now(),
        //   teamLogo: logoUrl,
        //   description: team.teamBio,
        //   createdBy: auth.currentUser.uid,
        // });
        // const teamId = docRef.id;
        // // set members doc on /teams/teamName/members/userId
        // const membersDocRef = doc(docRef, "members", auth.currentUser.uid);
        // await setDoc(membersDocRef, {
        //   team_id: teamId,
        //   uid: auth.currentUser.uid,
        //   role: "coach",
        //   joinedAt: Timestamp.now(),
        // });

        // call createTeam firebase call back function

        const createTeamCloudFunction = httpsCallable(functions, "createTeam");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await createTeamCloudFunction({
          teamName: team.teamName.toLowerCase(),
          teamLogo: logoUrl,
          teamDescription: team.teamBio,
        });
        console.log(result);

        if (result.data.success) {
          const teamId = result.data.teamId as string;
          const teamDoc = doc(firestore, "teams", teamId);
          // get doc
          let members: Member[] = [];
          const teamInfo = await getDoc(teamDoc);
          if (teamInfo.exists()) {
            // console.log("teamInfo", teamInfo.data());
            // get members

            members = await getTeamMembers(teamId);
            members.map(async (member) => {
              member.userInfo = (await getMemberInfo(member.uid)) as User;
            });
            const teamData = { ...teamInfo.data(), id: teamId } as Team;

            const data = {
              members: members as Member[],
              team: teamData,
            };

            return data;
          } else {
            return "Team Doesn't created!";
          }
        } else {
          console.log("error not returned");

          return result.message as string;
        }
      } else {
        // console.log("Team Name Not Unique");
        // toast({
        //   variant: "default",
        //   title: "Team Name Not Unique",
        //   description: "Team name is not unique! Please try another name.",
        //   className: "text-error border-2 border-error text-start",
        // });
        return "Team name is not unique";
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

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ team, id }: { id: string; team: UpdateTeamDataType }) => {
    try {
      // check authentication
      if (!auth.currentUser) {
        return "This action requires authentication please login first";
      }
      // console.log(1);
      // check accountType
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        if (user.accountType !== "coach") {
          return "User is not a coach";
        }
      } else {
        return "User not found";
      }

      // check if team name is unique
      const newTeamData: {
        teamLogo?: string;
        teamName?: string;
        description?: string;
      } = {};
      if (team.description) {
        newTeamData.description = team.description;
      }

      // console.log(2);
      if (team.teamName) {
        // check team name should be lowercase 4 to 30 caraceters regix
        const teamNameRegex = /^[a-z0-9_]{4,30}$/;
        if (!teamNameRegex.test(team.teamName)) {
          return "Team name should be lowercase 4 to 30 caracters!";
        }
        const isUnique = await isItUniqueTeamName(team.teamName);
        if (!isUnique) {
          return "Team Name Not Unique";
        }
        newTeamData.teamName = team.teamName;
      }
      let logoUrl = "";

      if (team.teamLogo) {
        const storageRef = ref(storage, `Team/Logo/${team.teamName}`);
        const snapshot = await uploadBytesResumable(
          storageRef,
          team.teamLogo as Blob
        );
        // console.log(3);

        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          // console.log(logoUrl);
          newTeamData.teamLogo = logoUrl;
          toast({
            variant: "default",
            title: "Upload Image",
            description: "Image uploaded successfully!",
            className: "text-primary border-2 border-primary text-start",
          });
        } catch (error) {
          // console.log(error);
          return "Get Download URL Failed!";
        }
      }

      if (newTeamData.teamName) {
        // callback function for update team if user update teamName
        const updateTeamCloudFunction = httpsCallable(functions, "updateTeam");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await updateTeamCloudFunction({
          teamId: id,
          teamName: newTeamData.teamName,
          teamLogo: newTeamData.teamLogo,
          teamDescription: newTeamData.description,
        });
        // console.log(result);
        if (!result.data.success) {
          console.log("error not returned");
          return result.message as string;
        }
      } else {
        console.log("here is it:", newTeamData);
        const docRef = doc(firestore, "teams", id);
        await setDoc(
          docRef,
          {
            updatedAt: Timestamp.now(),
            ...newTeamData,
          },
          { merge: true }
        );
      }

      const teamInfo = { ...store.getState().team.team, ...newTeamData };

      if (teamInfo) {
        const data = {
          team: teamInfo,
        };

        return data;
      } else {
        return "Team Doesn't created!";
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

export const getMemberTeamId = async (uid: string) => {
  // search in the members of all teams to get member with uid and return the teamName
  try {
    const colRef = collectionGroup(firestore, "members");
    const queryRef = query(colRef, where("uid", "==", uid));
    const snap = await getDocs(queryRef);
    if (snap.empty) {
      return null;
    }
    return snap.docs[0].data().team_id;
  } catch (error) {
    // console.log("nul 3");
    // console.log(error);
    return null;
  }
};

export const getMemberTeam = async (uid: string) => {
  // search in the members of all teams to get member with uid and return the teamName
  try {
    const teamid = await getMemberTeamId(uid);
    if (!teamid) {
      return null;
    }
    const docRef = doc(firestore, "teams", teamid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Team;
    } else {
      return null;
    }
  } catch (error) {
    // console.log("nul 3");
    // console.log(error);
    return null;
  }
};

export const getMemberTeamName = async (uid: string) => {
  try {
    const colRef = collectionGroup(firestore, "members");
    const queryRef = query(colRef, where("uid", "==", uid));
    const snap = await getDocs(queryRef);
    // check if the user is in a team
    if (snap.empty) {
      return null;
    }
    const docRef = doc(firestore, "teams", snap.docs[0].data().team_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().teamName;
    } else {
      return null;
    }
  } catch (error) {
    // console.log("nul 3");
    // console.log(error);
    return null;
  }
};

export const isValidTeamId = async (teamId: string) => {
  try {
    const docRef = doc(firestore, "teams", teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
};

export const removePlayerFromMembers = async (
  teamId: string,
  uid: string,
  type: "ban" | "kick"
) => {
  try {
    // check if the user.uid is the coach of teamId
    const authUID = auth.currentUser?.uid;
    if (!authUID) {
      return "User not authenticated!";
    }
    // check if uid is the coach of the team
    if (authUID === uid) {
      return `You can't ${type} yourself!`;
    }
    const docRef = doc(firestore, "teams", teamId);
    const mebRef = doc(docRef, "members", authUID);
    const docSnap = await getDoc(mebRef);
    if (!docSnap.exists()) {
      return "You are not the coach of this team!";
    } else {
      const data = docSnap.data() as Member;
      if (data.role !== "coach") {
        return "You are not the coach of this team!";
      }
    }

    // check if the uid in team
    const teamrRef = doc(firestore, "teams", teamId);
    const memberRef = doc(teamrRef, "members", uid);

    const memberSnap = await getDoc(memberRef);
    if (!memberSnap.exists()) {
      return "Player not in the team!";
    } else {
      if (memberSnap.data().role === "coach") {
        return `You can't ${type} the coach!`;
      }
    }

    await deleteDoc(memberRef);
    return true;
  } catch (error) {
    // console.log(error);
    return `Player ${type} Failed!`;
  }
};

export const kickMember = createAsyncThunk(
  "team/kickMember",
  async ({ uid, teamId }: { uid: string; teamId: string }) => {
    try {
      const result = await removePlayerFromMembers(teamId, uid, "kick");
      if (result === true) {
        return { uid: uid };
      }
      return result;
    } catch (error) {
      // console.log(error);
      return "Player Kick Failed!";
    }
  }
);

export const banMember = createAsyncThunk(
  "team/banMember",
  async ({ uid, teamId }: { uid: string; teamId: string }) => {
    try {
      const result = await removePlayerFromMembers(teamId, uid, "ban");
      if (result === true) {
        const teamRef = doc(firestore, "teams", teamId);
        // update blackList add uid to blackList array in team
        const docSnap = await getDoc(teamRef);
        if (!docSnap.exists()) {
          return "Team not found!";
        }
        const data = docSnap.data() as Team;
        const blackList = data.blackList;
        if (!blackList) {
          return "BlackList not found!";
        }
        if (blackList.includes(uid)) {
          return "Player Already Banned!";
        }
        await updateDoc(teamRef, {
          blackList: arrayUnion(uid),
        });
        return { uid: uid };
      } else {
        return result;
      }
    } catch (error) {
      // console.log(error);
      return "Player Ban Failed!";
    }
  }
);

export const leaveTeam = createAsyncThunk(
  "team/leaveTeam",
  async (teamId: string) => {
    try {
      // check if the user is authenticated
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "User not authenticated!";
      }
      // check if the user is in the team
      const teamRef = doc(firestore, "teams", teamId);
      const memberRef = doc(teamRef, "members", authUID);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) {
        return "Player not in the team!";
      }
      // check if the user is not the coach of team
      const data = memberSnap.data() as Member;
      if (data.role === "coach") {
        return "Coach can't leave the team!";
      }
      // remove the user from the team
      await deleteDoc(memberRef);
      await store.dispatch(
        getTeamByTeamName(store.getState().team.team.teamName)
      );
      return true;
    } catch (error) {
      // console.log(error);
      return "Leave Team Failed!";
    }
  }
);

export const changeCoach = createAsyncThunk(
  "team/changeCoach",
  async ({ uid, teamId }: { uid: string; teamId: string }) => {
    try {
      // check if the user is authenticated
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "User not authenticated!";
      }
      // check if the user is in the team
      const teamRef = doc(firestore, "teams", teamId);
      const memberRef = doc(teamRef, "members", authUID);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) {
        return "You are not a member of this team";
      }
      // check if the user is the coach of team
      const data = memberSnap.data() as Member;
      if (data.role !== "coach") {
        return "You are not the coach of this team!";
      }
      // check if the uid is in the team
      const newCoachRef = doc(teamRef, "members", uid);
      const newCoachSnap = await getDoc(newCoachRef);
      if (!newCoachSnap.exists()) {
        return "Member not in the team";
      }
      // check if the uid is not the coach of team
      const newCoachData = newCoachSnap.data() as Member;
      if (newCoachData.role === "coach") {
        return "Member is already the coach!";
      }
      try {
        const changeCoachCloudFunction = httpsCallable(
          functions,
          "changeCoach"
        );

        const result = await changeCoachCloudFunction({
          memberid: uid,
          teamid: teamId,
        });
        if ((result?.data as { success: boolean })?.success) {
          await store.dispatch(
            getTeamByTeamName(store.getState().team.team.teamName)
          );
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.message;
      }

      return true;
    } catch (error) {
      // console.log(error);
      return "Change Coach Failed!";
    }
  }
);

export const updateBlackListInfos = createAsyncThunk(
  "team/updateBlackListInfos",
  async () => {
    try {
      // check if the user is authenticated and the uid is the coach of team
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return [];
      }
      // check account type
      const accountType = store.getState().auth.user?.accountType;
      if (!accountType || accountType !== "coach") {
        return [];
      }
      // cheack next ref /teams/teamid/members/memberid.role == coach
      const teamId = store.getState().team.team.id;
      const teamRef = doc(firestore, "teams", teamId);
      const memberRef = doc(teamRef, "members", authUID);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) {
        return [];
      }
      const data = memberSnap.data() as Member;
      if (data.role !== "coach") {
        return [];
      }
      const blackList = store.getState().team.team.blackList;
      if (!blackList) {
        return [];
      }
      const blackListInfos: { user_info: User; uid: string }[] = [];
      await Promise.all(
        blackList.map(async (uid: string) => {
          const userRef = doc(firestore, "users", uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const user_info = userSnap.data() as User;
            blackListInfos.push({ user_info: user_info, uid: userSnap.id });
          }
        })
      );
      return blackListInfos;
    } catch (error) {
      // console.log(error);
      return [];
    }
  }
);

export const dispandUserFromTeamBlackList = createAsyncThunk(
  "team/dispandUserFromTeamBlackList",
  async ({ uid }: { uid: string }) => {
    try {
      // check is login
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "User not authenticated!";
      }
      const teamId = store.getState().team.team.id;
      const teamRef = doc(firestore, "teams", teamId);
      const docSnap = await getDoc(teamRef);
      if (!docSnap.exists()) {
        return "Team not found!";
      }
      const data = docSnap.data() as Team;
      // check if authUID is the team
      const memberRef = doc(teamRef, "members", authUID);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) {
        return "You are not a member of this team";
      }
      // check if the authUID is the coach of the team
      if ((memberSnap.data() as Member).role !== "coach") {
        return "Your not the coach of the team";
      }

      const blackList = data.blackList;
      if (!blackList) {
        return "BlackList not found!";
      }
      if (!blackList.includes(uid)) {
        return "Player not in the blackList!";
      }
      const newBlackList = blackList.filter((bid) => bid !== uid);
      await updateDoc(teamRef, {
        blackList: newBlackList,
      });
      return { blackList: newBlackList };
    } catch (error) {
      // console.log(error);
      return "Player Dispand Failed!";
    }
  }
);

export const getTeamDataByTeamId = async (teamId: string) => {
  try {
    const docRef = doc(firestore, "teams", teamId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Team;
    } else {
      return null;
    }
  } catch (error) {
    // console.log(error);
    return null;
  }
};

// get team matchs history
export const getTeamMatchesHistory = createAsyncThunk(
  "team/getTeamMatchesHistory",
  async ({ teamId, status = 'all' }: { teamId: string, status?: FilterProgressStatus }, thunkAPI) => {
    try {
      const colRef = collection(firestore, "matches");
      const trackQuery = (thunkAPI.getState() as RootState).team.trackQuery;
      let lastDocState = trackQuery.lastDoc;

      let queryRef = query(
        colRef,
        orderBy("createdAt", "desc"),
        limit(5)
      );

      if (trackQuery.status !== status) {
        thunkAPI.dispatch(setMatchesHistory([]));
        thunkAPI.dispatch(setTrackQuery({ lastDoc: null, status: status }));
        lastDocState = null;
      }

      const teamCondition = or(where("team1.id", "==", teamId), where("team2.id", "==", teamId));
      queryRef = status !== 'all'
        ? query(queryRef, and(teamCondition, where("status", "==", status)))
        : query(queryRef, teamCondition);

      if (lastDocState) {
        queryRef = query(queryRef, startAfter(trackQuery.lastDoc));
      }

      const snap = await getDocs(queryRef);
      const matchPromises = snap.docs.map(async doc => {
        const thismatch = doc.data() as Match;
        const [team1_data, team2_data] = await Promise.all([
          getTeamDataByTeamId(thismatch.team1.id),
          getTeamDataByTeamId(thismatch.team2.id)
        ]);

        if (!team1_data || !team2_data) {
          return null;
        }

        thismatch.team1 = {
          ...thismatch.team1,
          name: team1_data.teamName,
          logo: team1_data.teamLogo,
        };
        thismatch.team2 = {
          ...thismatch.team2,
          name: team2_data.teamName,
          logo: team2_data.teamLogo,
        };
        return thismatch;
      });

      const matches: Match[] = (await Promise.all(matchPromises)).filter((match): match is Match => match !== null);
      thunkAPI.dispatch(setTrackQuery({ lastDoc: snap.docs[snap.docs.length - 1], status: status }));
      return { matches };
    } catch (error) {
      return { matches: [] };
    }
  }
);

// leave team for coach
//  [x] after check if user is coach and have a team
//  [x] for coach leave team should be only one on the team
//  [x] call a callback firebase function leaveTeamForCoach

export const leaveTeamForCoach = createAsyncThunk(
  "team/leaveTeamForCoach",
  async (teamId: string) => {
    try {
      // check if the user is authenticated
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "User not authenticated!";
      }
      // check if the user is in the team
      const teamRef = doc(firestore, "teams", teamId);
      const memberRef = doc(teamRef, "members", authUID);
      const memberSnap = await getDoc(memberRef);
      if (!memberSnap.exists()) {
        return "Player not in the team!";
      }
      // check if the user is the coach of team
      const data = memberSnap.data() as Member;
      if (data.role !== "coach") {
        return "You are not the coach of this team!";
      }
      // check if the coach is the only one in the team
      const members = await getTeamMembers(teamId);
      if (members.length > 1) {
        return "For Leave Team, You should give the role of coach to a member of team or be the only one in the team!";
      }

      try {
        const leaveTeamForCoachCloudFunction = httpsCallable(
          functions,
          "leaveTeamForCoach"
        );

        const result = await leaveTeamForCoachCloudFunction({ teamId });
        if ((result?.data as { success: boolean })?.success) {
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.message;
      }
    } catch (error) {
      // console.log(error);
      return "Leave Team Failed!";
    }
  }
);

export const { setTeam, setMatchesHistory, setTrackQuery, clearTeam, setError, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
