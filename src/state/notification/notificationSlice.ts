import { Action, Notification, Team, Tournament } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  where,
  query,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { firestore, auth } from "@/services/firebase";
import { toast } from "@/components/ui/use-toast";
import { store } from "../store";
import { isItAlreadyInATeam } from "../auth/authSlice";
import { getMemberTeamId, isValidTeamId } from "../team/teamSlice";

interface NotificationState {
  notifications: Notification[];

  isLoading: boolean;
  error: string | null | undefined;
  teamNotifications: {
    notifications: Notification[];
    isLoading: boolean;
    error: string | null | undefined;
  };
  tournamentNotifications: {
    notifications: Notification[];
    isLoading: boolean;
    error: string | null | undefined;
  };
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  error: null,
  teamNotifications: {
    notifications: [],
    isLoading: false,
    error: null,
  },
  tournamentNotifications: {
    notifications: [],
    isLoading: false,
    error: null,
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecievedNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecievedNotifications.fulfilled, (state, action) => {
        state.error = null;

        if (action.payload.notis) {
          state.notifications = action.payload.notis as Notification[];
          // toast({
          //   title: "Notifications loaded",
          //   description: "Notifications loaded successfully",
          // });
        } else {
          state.error = action.payload.error;
          // toast({
          //   title: "Notifications failed",
          //   description: action.payload.error,
          //   variant: "destructive",
          // });
        }

        state.isLoading = false;
      })
      .addCase(getRecievedNotifications.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(sendRequestToJoinTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        toast({
          variant: "default",
          title: "Sending request",
          description: "Sending request to join team",
        });
      })
      .addCase(sendRequestToJoinTeam.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            variant: "default",
            title: "Request sended",
            description: "Request to join team sended successfully",
          });
        } else {
          state.error = action.payload;

          toast({
            title: "Request failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(sendRequestToJoinTeam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(inviteToTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteToTeam.fulfilled, (state, action) => {
        state.error = null;

        if (action.payload === true) {
          toast({
            title: "Invite sended",
            description: "Invite to join team sended successfully",
          });
        } else {
          state.error = action.payload;

          toast({
            title: "Invite failed",
            description: action.payload,
            variant: "destructive",
          });
        }

        state.isLoading = false;
      })
      .addCase(inviteToTeam.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(getTeamRequestNotifications.pending, (state) => {
        state.teamNotifications.isLoading = true;
        state.teamNotifications.error = null;
      })
      .addCase(getTeamRequestNotifications.fulfilled, (state, action) => {
        state.teamNotifications.error = null;
        state.teamNotifications.isLoading = false;

        if (action.payload.notis) {
          state.teamNotifications.notifications = action.payload
            .notis as Notification[];
          // toast({
          //   title: "Notifications loaded",
          //   description: "Notifications loaded successfully",
          // });
        } else {
          state.teamNotifications.error = action.payload.error;

          // toast({
          //   title: "Notifications failed",
          //   description: action.payload.error,
          //   variant: "destructive",
          // });
        }
      })
      .addCase(getTeamRequestNotifications.rejected, (state, action) => {
        state.teamNotifications.error = action.error.message;
        state.teamNotifications.isLoading = false;
      });
    builder
      .addCase(updateNotificationAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNotificationAction.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        if (action.payload === true) {
          state.teamNotifications.notifications =
            state.teamNotifications.notifications.filter(
              (notification) => notification.id !== action.meta.arg.id
            );

          state.notifications = state.notifications.filter(
            (notification) => notification.id !== action.meta.arg.id
          );
          state.tournamentNotifications.notifications =
            state.tournamentNotifications.notifications.filter(
              (notification) => notification.id !== action.meta.arg.id
            );
          // console.log("done");
          toast({
            title: "Action updated",
            description: "Action updated successfully",
          });
        } else {
          state.error = action.payload;
          toast({
            title: "Action failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(updateNotificationAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    builder
      .addCase(sendChallengeRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendChallengeRequest.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            title: "Challenge sended",
            description: "Challenge request sended successfully",
          });
        } else {
          state.error = action.payload;

          toast({
            title: "Challenge failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(sendChallengeRequest.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        toast({
          title: "Challenge failed",
          description: action.error.message,
          variant: "destructive",
        });
      });
    builder
      .addCase(sendRequestToJoinTournament.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendRequestToJoinTournament.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            title: "Request sended",
            description: "Request to join tournament sended successfully",
          });
        } else {
          state.error = action.payload;
          toast({
            title: "Request failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(sendRequestToJoinTournament.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        toast({
          title: "Request failed",
          description: action.error.message,
          variant: "destructive",
        });
      });
    builder
      .addCase(inviteToJoinTournament.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteToJoinTournament.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            title: "Invite sended",
            description: "Invite to join tournament sended successfully",
          });
        } else {
          state.error = action.payload;
          toast({
            title: "Invite failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(inviteToJoinTournament.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        toast({
          title: "Invite failed",
          description: action.error.message,
          variant: "destructive",
        });
      });
    builder
      .addCase(getTournamentNotifications.pending, (state) => {
        state.tournamentNotifications.isLoading = true;
        state.tournamentNotifications.error = null;
      })
      .addCase(getTournamentNotifications.fulfilled, (state, action) => {
        state.tournamentNotifications.error = null;
        state.tournamentNotifications.isLoading = false;

        if (action.payload.notis) {
          state.tournamentNotifications.notifications = action.payload
            .notis as Notification[];
          // toast({
          //   title: "Notifications loaded",
          //   description: "Notifications loaded successfully",
          // });
        } else {
          state.tournamentNotifications.error = action.payload.error;

          // toast({
          //   title: "Notifications failed",
          //   description: action.payload.error,
          //   variant: "destructive",
          // });
        }
      })
      .addCase(getTournamentNotifications.rejected, (state, action) => {
        state.tournamentNotifications.error = action.error.message;
        state.tournamentNotifications.isLoading = false;
      });
    builder
      .addCase(inviteRefereeToTournament.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteRefereeToTournament.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;

        if (action.payload === true) {
          toast({
            title: "Invite sended",
            description: "Invite to join tournament sended successfully",
          });
        } else {
          state.error = action.payload;
          toast({
            title: "Invite failed",
            description: action.payload,
            variant: "destructive",
          });
        }
      })
      .addCase(inviteRefereeToTournament.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        toast({
          title: "Invite failed",
          description: action.error.message,
          variant: "destructive",
        });
      });
  },
});
/**
 * getCoachTeamId function
 * This function is used to get the team id where the the authinticated user is the coach of the team
 * @returns {Promise<string>} teamId
 * @returns {string} error
 */
export const getCoachTeamId = async () => {
  try {
    // is authinticated
    const userUid = auth.currentUser?.uid;
    if (!userUid) {
      return { error: "Error getting current user" };
    }
    // test if account type is coach
    const accountType = store.getState().auth.user?.accountType;
    if (accountType !== "coach") {
      // console.log("Error account type is not coach");
      return { error: "Error account type is not coach" };
    }

    // get teamName where the coach is userUid
    const teamId = await getMemberTeamId(userUid);
    if (!teamId) {
      return { error: "Error getting coach team id" };
    }
    return teamId;
  } catch (error) {
    return { error: "You Don't have a Team Yet" };
  }
};

/**
 * getTournamentManagerTournament function
 * This function is used to get the tournament where the authinticated user is the manager of the tournament
 * @returns {Promise<Tournament>} tournament
 * @returns {string} error
 */
export const getTournamentManagerTournament = async () => {
  try {
    // check if user is authinticated
    // get user id

    const uid = auth.currentUser?.uid;
    if (!uid) {
      return "Error getting current user";
    }

    // check if type account of user is tournament managet
    const accountType = store.getState().auth.user?.accountType;
    if (accountType !== "tournament_manager") {
      return "Error account type is not tournament manager";
    }

    // get tournament id where manager_id === uid and status is pending or in_progress
    const tournamentCollection = collection(firestore, "tournaments");
    const tournamentsQuery = query(
      tournamentCollection,
      where("manager_id", "==", uid),
      where("status", "in", ["pending", "in_progress"])
    );
    const tournamentsSnapshot = await getDocs(tournamentsQuery);
    if (tournamentsSnapshot.size === 0) {
      return "No tournament found";
    }
    const tournament = tournamentsSnapshot.docs[0];
    return tournament.data() as Tournament;
  } catch (error) {
    return "Error getting tournament id";
  }
};

const isItInBlackList = async (teamId: string, uid: string) => {
  try {
    const teamRef = doc(firestore, "teams", teamId);
    const teamDoc = await getDoc(teamRef);
    if (!teamDoc.exists()) {
      return { error: "Error getting team" };
    }
    const teamInfo = teamDoc.data();
    if (!teamInfo) {
      return { error: "Error getting team info" };
    }
    if (teamInfo.blackList.includes(uid)) {
      return true;
    }
    return false;
  } catch (error) {
    return { error: "Error checking if user in black list" };
  }
};

export const getTeamRequestNotifications = createAsyncThunk(
  "notification/getTeamRequestNotifications",
  async () => {
    try {
      const teamId = await getCoachTeamId();
      if (teamId.error) {
        return { error: teamId.error };
      }
      // order by createdAt desc
      const notificationsCollection = collection(firestore, "notifications");

      const notificationsQuery = query(
        notificationsCollection,
        where("to_id", "==", teamId),
        where("action", "==", null),
        orderBy("createdAt", "desc")
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notifications: Notification[] = [];
      notificationsSnapshot.forEach((doc) => {
        notifications.push({
          ...doc.data(),
          id: doc.id,
        } as Notification);
      });
      if (notifications.length === 0) {
        return { error: "No notifications found" };
      }
      return { notis: notifications };
    } catch (error) {
      console.log(error);
      return { error: "Error getting team request notifications" };
    }
  }
);

export const getRecievedNotifications = createAsyncThunk(
  "notification/getRecievedNotifications",
  async () => {
    try {
      // get uid
      const uid = auth.currentUser?.uid;
      if (!uid) {
        return { error: "Error getting current user" };
      }
      // console.log("1");

      const notificationsCollection = collection(firestore, "notifications");
      const notificationsQuery = query(
        notificationsCollection,
        where("to_id", "==", uid),
        where("action", "==", null),
        orderBy("createdAt", "desc")
      );
      // console.log("2");
      const notificationsSnapshot = await getDocs(notificationsQuery);
      // console.log("3");
      const notifications: Notification[] = [];
      notificationsSnapshot.forEach((doc) => {
        notifications.push({
          ...doc.data(),
          id: doc.id,
        } as Notification);
      });

      // console.log("4");
      if (notifications.length === 0) {
        return { error: "No notifications found" };
      }

      return { notis: notifications };
    } catch (error) {
      throw new Error("Error getting recieved notifications");
    }
  }
);

const isAlreadySendNotification = async (from_id: string, to_id: string) => {
  try {
    const notificationsCollection = collection(firestore, "notifications");
    const notificationsQuery = query(
      notificationsCollection,
      where("from_id", "==", from_id),
      where("to_id", "==", to_id)
    );
    const notificationsSnapshot = await getDocs(notificationsQuery);
    const notifications: Notification[] = [];
    notificationsSnapshot.forEach((doc) => {
      notifications.push({
        ...doc.data(),
        id: doc.id,
      } as Notification);
    });
    // test if there is a sended notification in last 24 hours
    const now = Timestamp.now();
    const last24Hours = new Date(now.toMillis() - 24 * 60 * 60 * 1000);
    const last24HoursTimestamp = Timestamp.fromDate(last24Hours);
    const last24HoursNotifications = notifications.filter(
      (notification) =>
        notification.createdAt.toMillis() >= last24HoursTimestamp.toMillis()
    );
    if (last24HoursNotifications.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error getting recieved notifications");
  }
};

export const sendRequestToJoinTeam = createAsyncThunk(
  "notification/sendRequestToJoinTeam",
  async (notificationInfo: { to: string }) => {
    try {
      // console.log("1");
      // console.log(notificationInfo.to);
      // check if notificationInfo.to is valid team id
      const isValidTID: boolean = await isValidTeamId(notificationInfo.to);
      if (!isValidTID) {
        return "Error team id is not valid";
      }
      // console.log("2");

      // get uid
      const from_uid = auth.currentUser?.uid;
      if (!from_uid) {
        return "Error getting current user";
      }
      // console.log("3");
      // test if account type is player
      const accountType = store.getState().auth.user?.accountType;
      if (accountType !== "player") {
        // toast({
        //   title: "Error",
        //   description: "Account type is not player",
        //   variant: "destructive",
        // })

        return "Error account type is not player";
      }
      // console.log("4");

      // get user username
      const username = store.getState().auth.user?.username;
      if (!username) {
        return "Error getting current user username";
      }

      // check if user already in a team
      const isItInTeam = await isItAlreadyInATeam(from_uid);

      if (isItInTeam) {
        return "Error user already in a team";
      }
      // check if the to_id is not in balck list of teamID
      const isItInBlackListValue = await isItInBlackList(
        notificationInfo.to,
        from_uid
      );
      if (
        typeof isItInBlackListValue === "object" &&
        isItInBlackListValue.error
      ) {
        return isItInBlackListValue.error;
      } else if (isItInBlackListValue === true) {
        return "You have been black listed by this team";
      }

      // test if there is already a notification with same to_id and from_id in last 24 hours
      const isAlreadySend = await isAlreadySendNotification(
        from_uid,
        notificationInfo.to
      );
      if (isAlreadySend) {
        return "You Have already send a request to join this team in last 24 hours";
      }

      // send notification
      const notificationCollection = collection(firestore, "notifications");
      const from_username = store.getState().auth.user?.username;
      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Request to join team",
        message: `${from_username} want to join Your Team`,
        from_id: from_uid,
        action: null,
        createdAt: Timestamp.now(),
        type: "request_to_join_team",
      });
      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join team";
    } catch (error) {
      throw new Error("Error sending request to join team");
    }
  }
);

export const inviteToTeam = createAsyncThunk(
  "notification/inviteToTeam",
  async (notificationInfo: { to: string }) => {
    try {
      // get uid
      const authUID = auth.currentUser?.uid;
      if (!authUID) {
        return "Error getting current user";
      }
      if (notificationInfo.to === authUID) {
        return "You can't invite yourself";
      }
      const teamId = await getCoachTeamId();

      if (typeof teamId === "object" && teamId.error) {
        return teamId.error;
      }
      // check if the to_id is not in balck list of teamID
      const isItInBlackListValue = await isItInBlackList(
        teamId,
        notificationInfo.to
      );
      if (
        typeof isItInBlackListValue === "object" &&
        isItInBlackListValue.error
      ) {
        return isItInBlackListValue.error;
      } else if (isItInBlackListValue === true) {
        return "This user is in black list";
      }

      const notificationCollection = collection(firestore, "notifications");

      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Invite to team",
        message: `You invited to joint Team ${teamId}`,
        from_id: teamId,
        action: null,
        createdAt: Timestamp.now(),
        type: "invite_to_team",
      });
      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join team";
    } catch (error) {
      throw new Error("Error sending request to join team");
    }
  }
);

const updateNotificationActionToTakedAction = async (
  notificationId: string,
  takedAction: Action
) => {
  try {
    const notificationRef = doc(firestore, "notifications", notificationId);
    await updateDoc(notificationRef, {
      action: takedAction,
    });
    return true;
  } catch (error) {
    return "Error updating notification action";
  }
};

export const updateNotificationAction = createAsyncThunk(
  "notification/updateNotificationAction",
  async (ntf: { id: string; action: Action }) => {
    try {
      // check authintication
      const uid = auth.currentUser?.uid;
      if (!uid) {
        return "Error getting current user";
      }
      // get notification info
      const notificationRef = doc(firestore, "notifications", ntf.id);
      const notificationDoc = await getDoc(notificationRef);
      if (!notificationDoc.exists()) {
        return "Error getting notification";
      }
      const notificationInfo = notificationDoc.data() as Notification;
      if (notificationInfo.action === ntf.action) {
        return `already ${ntf.action}ed`;
      }

      

      // check if to_id == uid for type info and invite to team
      if (["info", "invite_to_team"].includes(notificationInfo.type)) {
        // check in notificationInfo.type === invite_to_team and action === accept if it the user account type shoulld be player and not already in a team
        if (notificationInfo.type === "invite_to_team") {
          const accountType = store.getState().auth.user?.accountType;
          if (accountType !== "player" && ntf.action === "accept") {
            return "Account type is not player";
          }
          const isItInTeam = await isItAlreadyInATeam(uid);
          if (isItInTeam && ntf.action === "accept") {
            return "You are already in a team, leave the team first to accept the invite and join new team.";
          }

          // check if this player in black list
          const isItInBlackListValue = await isItInBlackList(
            notificationInfo.from_id,
            uid
          );
          if (
            typeof isItInBlackListValue === "object" &&
            isItInBlackListValue.error
          ) {
            return isItInBlackListValue.error;
          }
          if (isItInBlackListValue === true) {
            await updateNotificationActionToTakedAction(ntf.id, "decline");
            return "You have been black listed by this team";
          }

          const updated = await updateNotificationActionToTakedAction(
            ntf.id,
            ntf.action
          );
          if (updated === true) {
            return true;
          } else {
            return updated;
          }
        }
        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      }
      // for request to join team
      // check if the authUser is the coach of the team where the teamId === to_id

      if (notificationInfo.type === "request_to_join_team") {
        const teamId = await getCoachTeamId();
        if (typeof teamId === "object" && teamId.error) {
          return teamId.error;
        }
        if (teamId !== notificationInfo.to_id) {
          return "You are not the coach of this team";
        }
        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      } else if (notificationInfo.type === "match_chalenge") {
        // check if the to_id === teamId
        const teamId = await getCoachTeamId();
        if (typeof teamId === "object" && teamId.error) {
          return teamId.error;
        }
        if (teamId !== notificationInfo.to_id) {
          return "You are not the coach of this team";
        }
        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      } else if (notificationInfo.type == "refree_invite") {
        // check if user auth account type
        const accountType = store.getState().auth.user?.accountType;
        if (accountType !== "refree") {
          return "Account type is not refree";
        }

        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      } else if (notificationInfo.type === "invite_to_tournament") {
        // check if user auth account type
        const accountType = store.getState().auth.user?.accountType;
        if (accountType !== "coach") {
          return "Account type is not coach";
        }
        // check if the to_id === teamId
        const teamId = await getCoachTeamId();
        if (typeof teamId === "object" && teamId.error) {
          return teamId.error;
        }
        if (teamId !== notificationInfo.to_id) {
          return "You are not the coach of this team";
        }

        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      } else if (notificationInfo.type === "request_to_join_tournament") {
        // check if user auth account type
        const accountType = store.getState().auth.user?.accountType;
        if (accountType !== "tournament_manager") {
          return "Account type is not tournament manager";
        }
        // check if to id === tournament manager id
        const tournament = await getTournamentManagerTournament();
        if (typeof tournament === "string") {
          return tournament;
        }
        if (tournament.id !== notificationInfo.to_id) {
          return "You are not the manager of this tournament";
        }
        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        if (updated === true) {
          return true;
        } else {
          return updated;
        }
      } else if (notificationInfo.type === "invite_referee_to_tournament") {
        // check if auth user accountType is referee
        const accountType = store.getState().auth.user?.accountType;
        if (accountType !== "refree") {
          return "Account type is not referee";
        }
        // check if to_id === referee id
        if (notificationInfo.to_id !== uid) {
          return "You are not the referee";
        }
        const updated = await updateNotificationActionToTakedAction(
          ntf.id,
          ntf.action
        );
        return updated;
      }
      return "Error updating notification action";
    } catch (error) {
      throw new Error("Error updating notification action");
    }
  }
);

export const sendChallengeRequest = createAsyncThunk(
  "notification/sendChallengeRequest",
  async (notificationInfo: { to: string }) => {
    try {
      // to: is the team id where the team is the team that the user want to chalenge
      const teamId = await getCoachTeamId();
      if (typeof teamId === "object" && teamId.error) {
        return teamId.error;
      }
      // check if the to id === teamId
      if (teamId === notificationInfo.to) {
        return "You can't challenge your own team";
      }
      // check if challenged team exists
      const isValidTID: boolean = await isValidTeamId(notificationInfo.to);
      if (!isValidTID) {
        return "Error team id is not valid";
      }
      // get team1 data team1 is the challenger
      const team1Ref = doc(firestore, "teams", teamId);
      const team1Doc = await getDoc(team1Ref);
      if (!team1Doc.exists()) {
        return "Error getting team1";
      }
      const team1Info: Team = team1Doc.data() as Team;
      if (!team1Info) {
        return "Error getting team1 info";
      }

      // send notification
      const notificationCollection = collection(firestore, "notifications");
      const from_TeamName = team1Info.teamName;
      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Match Challenge",
        message: `${from_TeamName} want to challenge Your Team`,
        from_id: teamId,
        action: null,
        createdAt: Timestamp.now(),
        type: "match_chalenge",
      });

      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending challenge request";
    } catch (error) {
      throw new Error("sending challenge request");
    }
  }
);

// send request to join tournament
export const sendRequestToJoinTournament = createAsyncThunk(
  "notification/sendRequestToJoinTournament",
  async (notificationInfo: { to: string }) => {
    try {
      // get team id of coach
      const teamId = await getCoachTeamId();
      if (typeof teamId === "object" && teamId.error) {
        return teamId.error;
      }
      const teamRef = doc(firestore, "teams", teamId);
      const teamDoc = await getDoc(teamRef);
      if (!teamDoc.exists()) {
        return "Error getting team";
      }
      const teamData = teamDoc.data() as Team;
      if (!teamData) {
        return "Error getting team data";
      }

      // check if notificationInfo.to is valid tournament id
      const tournamentDoc = await getDoc(
        doc(firestore, "tournaments", notificationInfo.to)
      );
      if (!tournamentDoc.exists()) {
        return "Error getting tournament";
      }

      // check if team already in the tournament
      const tournamentData = tournamentDoc.data() as Tournament;
      if (tournamentData.participants.includes(teamId)) {
        return "Your team already in the tournament";
      }

      // check if team id exist already in a tournament participants that is not finished or canceled

      // const tournamentCollection = collection(firestore, "tournaments");
      // const tournamentsQuery = query(
      //   tournamentCollection,
      //   where("participants", "array-contains", teamId),
      //   where("status", "in", ["pending", "in_progress"])
      // );
      // const tournamentsSnapshot = await getDocs(tournamentsQuery);
      // if (tournamentsSnapshot.size > 0) {
      //   return "Your team already in a tournament that is not finished or canceled";
      // }

      // send notification to tournament

      const notificationCollection = collection(firestore, "notifications");
      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Request to join tournament",
        message: `${teamData.teamName} want to join Your Tournament`,
        from_id: teamId,
        action: null,
        createdAt: Timestamp.now(),
        type: "request_to_join_tournament",
      });

      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending request to join tournament";
    } catch (error) {
      return "Error sending request to join tournament";
    }
  }
);

// send invite to join team form tournament manager to team
export const inviteToJoinTournament = createAsyncThunk(
  "notification/inviteToJoinTournament",
  async (notificationInfo: { to: string }) => {
    try {
      // get tournamnet of auth user
      const tournament = await getTournamentManagerTournament();
      if (typeof tournament === "string") {
        return tournament;
      }

      // check if to is valid team id

      const isValidTID: boolean = await isValidTeamId(notificationInfo.to);
      if (!isValidTID) {
        return "Error team id is not valid";
      }

      // check if team already in the tournament

      if (tournament.participants.includes(notificationInfo.to)) {
        return "Your team already in the tournament";
      }

      // send notification
      const notificationCollection = collection(firestore, "notifications");
      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Invite to join tournament",
        message: `You invited to join Tournament ${tournament.name}`,
        from_id: tournament.id,
        action: null,
        createdAt: Timestamp.now(),
        type: "invite_to_tournament",
      });

      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending invite to join";
    } catch (error) {
      return "Error sending invite to join";
    }
  }
);

// get tournament notification
export const getTournamentNotifications = createAsyncThunk(
  "notification/getTournamentNotifications",
  async () => {
    try {
      console.log("what i shoul be visible");
      // get uid
      const uid = auth.currentUser?.uid;
      if (!uid) {
        return { error: "Error getting current user" };
      }

      // get tournament of auth user
      const tournament = await getTournamentManagerTournament();
      console.log("tournament is :", tournament);
      if (typeof tournament === "string") {
        return { error: tournament };
      }

      // get notifications
      const notificationsCollection = collection(firestore, "notifications");
      const notificationsQuery = query(
        notificationsCollection,
        where("to_id", "==", tournament.id),
        where("action", "==", null),
        orderBy("createdAt", "desc")
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);
      const notifications: Notification[] = [];
      notificationsSnapshot.forEach((doc) => {
        notifications.push({
          ...doc.data(),
          id: doc.id,
        } as Notification);
      });

      if (notifications.length === 0) {
        return { error: "No notifications found" };
      }

      return { notis: notifications };
    } catch (error) {
      return { error: "Error getting tournament notifications" };
    }
  }
);

// invite referee to tournament
export const inviteRefereeToTournament = createAsyncThunk(
  "notification/inviteRefereeToTournament",
  async (notificationInfo: { to: string }) => {
    try {
      // get tournament of auth user
      const tournament = await getTournamentManagerTournament();
      if (typeof tournament === "string") {
        return tournament;
      }
      // check is notificationInfo.to is valid user nad have accountType === refree
      const userRef = doc(firestore, "users", notificationInfo.to);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        return "Error getting user";
      }
      const userInfo = userDoc.data();
      if (!userInfo) {
        return "Error getting user info";
      }
      if (userInfo.accountType !== "refree") {
        return "Error user account type is not refree";
      }
      // send notification
      const notificationCollection = collection(firestore, "notifications");
      const notificationDoc = await addDoc(notificationCollection, {
        to_id: notificationInfo.to,
        title: "Invite to tournament",
        message: `You invited to Tournament ${tournament.name} as referee`,
        from_id: tournament.id,
        action: null,
        createdAt: Timestamp.now(),
        type: "invite_referee_to_tournament",
      });

      // return true is sended succesfully in not return false
      if (notificationDoc.id) {
        return true;
      }
      return "Error sending invite to referee";
    } catch (error) {
      return "Error sending invite to referee";
    }
  }
);

export default notificationSlice.reducer;
