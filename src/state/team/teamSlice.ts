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
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { Member, Team, TeamState, User } from "../../types/types";
import { CreateTeamFormValues } from "@/pages/team/CreateTeam";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import { isItAlreadyInATeam } from "../auth/authSlice";
import { UpdateTeamDataType } from "@/pages/team/UpdateTeam";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/services/firebase";
import { store } from "../store";

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
          state.members = action.payload.members;
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
        if (action.payload === true) {
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
        if (action.payload === true) {
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
        if ( typeof action.payload === 'object' &&  action.payload.blackList !== null ) {
          state.team.blackList = action.payload.blackList
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
    console.log(error);
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
    console.log("Members Error", error);
    return [];
  }
};

export const getTeamByTeamName = createAsyncThunk(
  "team/getTeamByTeamName",
  async (teamName: string) => {
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
      console.log(1);
      // check accountType
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        if (user.accountType !== "coach") {
          return "User is not a coach";
        }
        // test if user already have a team
        const isInTeam = await isItAlreadyInATeam(auth.currentUser.uid);
        if (isInTeam) {
          return "User already in a team";
        }
      } else {
        return "User not found";
      }

      console.log(2);

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

        const snapshot = await uploadBytesResumable(
          storageRef,
          team.logo as Blob
        );
        console.log(3);

        let logoUrl = "";
        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          console.log(logoUrl);
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

        const colRef = collection(firestore, "teams");

        // await setDoc(docRef, {
        //   teamName: team.teamName,
        //   blackList: [],
        //   createdAt: Timestamp.now(),
        //   updatedAt: Timestamp.now(),
        //   teamLogo: logoUrl,
        //   description: team.teamBio,
        //   createdBy: auth.currentUser.uid,
        // });

        // add doc to teams collection
        const docRef = await addDoc(colRef, {
          teamName: team.teamName,
          blackList: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          teamLogo: logoUrl,
          description: team.teamBio,
          createdBy: auth.currentUser.uid,
        });
        const teamId = docRef.id;
        // set members doc on /teams/teamName/members/userId
        const membersDocRef = doc(docRef, "members", auth.currentUser.uid);
        await setDoc(membersDocRef, {
          team_id: teamId,
          uid: auth.currentUser.uid,
          role: "coach",
          joinedAt: Timestamp.now(),
        });

        // get doc
        let members: Member[] = [];
        const teamInfo = await getDoc(docRef);
        if (teamInfo.exists()) {
          console.log("teamInfo", teamInfo.data());
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

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ team, id }: { id: string; team: UpdateTeamDataType }) => {
    try {
      // check authentication
      if (!auth.currentUser) {
        return "This action requires authentication please login first";
      }
      console.log(1);
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

      console.log(2);
      if (team.teamName) {
        const isUnique = await isItUniqueTeamName(team.teamName);
        if (!isUnique) {
          return "Team Name Not Unique";
        }
        // const oldDocRef = doc(firestore, "teams", team.oldTeamName);
        // const oldDocSnap = await getDoc(oldDocRef);
        // delete old doc that with old doc name
        // if (oldDocSnap.exists()) {
        //   oldData = oldDocSnap.data() as Team;
        //   await deleteDoc(oldDocRef)
        //     .then(() => {
        //       console.log("Document deleted succesfully");
        //     })
        //     .catch((error) => {
        //       console.error("Error removing document: ", error);
        //     });
        // }
      }
      if (team.teamLogo) {
        const storageRef = ref(storage, `Avatars/${team.teamName}`);
        const snapshot = await uploadBytesResumable(
          storageRef,
          team.teamLogo as Blob
        );
        console.log(3);

        let logoUrl = "";
        try {
          logoUrl = await getDownloadURL(snapshot.ref);
          console.log(logoUrl);
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
      }

      const docRef = doc(firestore, "teams", id);
      await setDoc(
        docRef,
        {
          updatedAt: Timestamp.now(),
          ...team,
        },
        { merge: true }
      );

      const teamInfo = await getDoc(docRef);
      if (teamInfo.exists()) {
        console.log("teamInfo", teamInfo.data());
        // get members

        const members = await getTeamMembers(id);
        members.map(async (member) => {
          member.userInfo = (await getMemberInfo(member.uid)) as User;
        });
        const teamData = { ...teamInfo.data(), id: id } as Team;

        const data = {
          members: members,
          team: teamData,
        };

        return data;
      } else {
        return "Team Doesn't created!";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data as string);
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
    console.log("nul 3");
    console.log(error);
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
    console.log("nul 3");
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return `Player ${type} Failed!`;
  }
};

export const kickMember = createAsyncThunk(
  "team/kickMember",
  async ({ uid, teamId }: { uid: string; teamId: string }) => {
    try {
      const result = await removePlayerFromMembers(teamId, uid, "kick");
      return result;
    } catch (error) {
      console.log(error);
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
        return true;
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
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
      return true;
    } catch (error) {
      console.log(error);
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
          coachid: authUID,
          memberid: uid,
          teamid: teamId,
        });
        if ((result?.data as { success: boolean })?.success) {
          return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.message;
      }

      return true;
    } catch (error) {
      console.log(error);
      return "Change Coach Failed!";
    }
  }
);

export const updateBlackListInfos = createAsyncThunk(
  "team/updateBlackListInfos",
  async () => {
    try {
      const blackList = store.getState().team.team.blackList;
      if (!blackList) {
        return [];
      }
      const blackListInfos: { user_info: User; uid: string }[] = [];
      await Promise.all(
        blackList.map(async (uid) => {
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
      console.log(error);
      return [];
    }
  }
);

export const dispandUserFromTeamBlackList = createAsyncThunk(
  "team/dispandUserFromTeamBlackList",
  async ({ uid }: { uid: string;}) => {
    try {
      // check is login
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "User not authenticated!";
      }      
      const teamId = store.getState().team.team.id
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
      if ((memberSnap.data() as Member).role !== "coach"){
        return "Your not the coach of the team"
      }

      const blackList = data.blackList;
      if (!blackList) {
        return "BlackList not found!";
      }
      if (!blackList.includes(uid)) {
        return "Player not in the blackList!";
      }
      const newBlackList = blackList.filter((bid)=>bid !== uid)
      await updateDoc(teamRef, {
        blackList: newBlackList,
      });
      return {blackList:newBlackList};
    } catch (error) {
      console.log(error);
      return "Player Dispand Failed!";
    }
  }
);

export const { setTeam, clearTeam, setError, setLoading } = teamSlice.actions;
export default teamSlice.reducer;
