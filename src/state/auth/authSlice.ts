import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  User,
  signOut,
  // updateProfile,
  signInWithEmailAndPassword,
  setPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, firestore } from "@/services/firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc } from "@firebase/firestore";

// interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// inisial state
const initialState: AuthState = {
  user: auth.currentUser,
  loading: false,
  error: null,
};

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("login pending");
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log("login fullfilled");
        if (typeof action.payload === "object" && action.payload !== null) {
          state.error = null;
          state.user = action.payload as User;
        } else {
          state.error = action.payload as string;
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login rejcted");
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(register.pending, (state) => {
        console.log("pen");
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fullfilled");
        if (typeof action.payload === "object" && action.payload !== null) {
          state.error = null;
          state.user = action.payload as User;
          // create user table in firestore  database using server-side api with fitch
          // make username from email  if found and random work if not found
          const username = state.user.email
            ? state.user.email.split("@")[0]
            : Math.random().toString(36).substring(7);
          const name_splited = state.user.displayName
            ? state.user.displayName.split(" ")
            : "";
          let first_name = "";
          let last_name = "";
          if (name_splited.length >= 1) {
            first_name = name_splited[0];
          } else if (name_splited.length >= 2) {
            last_name = name_splited[1];
          }
          console.log(username, first_name, last_name);
          console.log("sending request");
          fetch(
            `${import.meta.env.VITE_SERVER_SIDE_IP}:${
              import.meta.env.VITE_SERVER_SIDE_PORT
            }/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                UID: state.user.uid,
                username: username,
                firstName: first_name,
                lastName: last_name,
              }),
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("data after sending request");
              console.log(data);
            })
            .catch((error) => {
              console.log("error after sending request");
              console.log(error);
            });
        } else {
          state.error = action.payload as string;
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.log("rej");
        state.loading = false;
        state.error = action.error.message as string;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload == null) {
          state.error = null;
          state.user = null;
        } else {
          state.error = action.payload as string;
          alert(state.error);
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        alert(state.error);
      });
    builder
      .addCase(login_with_google_or_facebook.pending, (state) => {
        console.log("login with google pending");
        state.loading = true;
      })
      .addCase(login_with_google_or_facebook.fulfilled, (state, action) => {
        state.loading = false;
        console.log("login with google fullfilled");
        if (typeof action.payload === "object" && action.payload !== null) {
          state.error = null;
          state.user = action.payload as User;
          const username = state.user.email
            ? state.user.email.split("@")[0]
            : Math.random().toString(36).substring(7);
          const name_splited = state.user.displayName
            ? state.user.displayName.split(" ")
            : "";
          let first_name = "";
          let last_name = "";
          if (name_splited.length >= 1) {
            first_name = name_splited[0];
          } else if (name_splited.length >= 2) {
            last_name = name_splited[1];
          }
          console.log(username, first_name, last_name);
          console.log("sending request");
          fetch(
            `${import.meta.env.VITE_SERVER_SIDE_IP}:${
              import.meta.env.VITE_SERVER_SIDE_PORT
            }/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                UID: state.user.uid,
                username: username,
                firstName: first_name,
                lastName: last_name,
              }),
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("data after sending request");
              console.log(data);
            })
            .catch((error) => {
              console.log("error after sending request");
              console.log(error);
            });
        } else {
          state.error = action.payload as string;
        }
      })
      .addCase(login_with_google_or_facebook.rejected, (state, action) => {
        console.log("login with google rejcted");
        state.loading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(reset_password.pending, (state) => {
        console.log("reset password pending");
        state.loading = true;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.loading = false;
        console.log("reset password fullfilled");
        if (action.payload === true) {
          state.error = "reset with no error";
        } else {
          state.error = action.payload as string;
        }
      })
      .addCase(reset_password.rejected, (state, action) => {
        console.log("reset password rejcted");
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

const GetUserAccount = async () => {
  console.log("------------------------------------33-");
  // check if there is a user with id == auth.currentUser.uid in the database
  // if not return false
  // if yes return true

  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    // get username from email

    console.log("uid:", uid);
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      const username = auth.currentUser.email
        ? auth.currentUser.email.split("@")[0] +
          Math.random().toString(36).substring(7)
        : Math.random().toString(36).substring(7);

      // create doc base on uid
      const docRef = doc(firestore, "users", uid);
      await setDoc(docRef, {
        username: username,
      });
      return false;
    }
  } else {
    console.log("user is not authenticated");
    return false;
  }
};

// reset password
export const reset_password = createAsyncThunk(
  "auth/reset_password",
  async ({ email }: { email: string }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-email") {
          return "Invalid email";
        } else if (error.code === "auth/user-not-found") {
          return "User not found";
        } else if (error.code === "auth/too-many-requests") {
          return "Too many requests";
        }
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);

// login with google with google
export const login_with_google_or_facebook = createAsyncThunk(
  "auth/login_with_google_or_facebook",
  async ({ login_with }: { login_with: string }) => {
    try {
      let provider = null;
      if (login_with === "facebook") {
        provider = new FacebookAuthProvider();
      } else if (login_with === "google") {
        provider = new GoogleAuthProvider();
      }
      console.log("pop about to show");
      provider && (await signInWithPopup(auth, provider));
      // getUserAccount that after auth.currentUser is updated
      console.log("hey im about to running");
      await GetUserAccount();
      return auth.currentUser;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/operation-not-allowed") {
          return "Operation not allowed";
        } else if (error.code === "auth/popup-closed-by-user") {
          return "Popup closed by user";
        } else if (error.code === "auth/cancelled-popup-request") {
          return "Cancelled popup request";
        } else if (error.code === "auth/popup-blocked") {
          return "Popup blocked";
        } else if (error.code === "auth/credential-already-in-use") {
          return "Credential already in use";
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          return "Account exists with different credential";
        }
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    rememberMe,
  }: {
    email: string;
    password: string;
    rememberMe: string;
  }) => {
    try {
      if (rememberMe === "on") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await setPersistence(auth, browserSessionPersistence).then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        });
      }
      await GetUserAccount();

      return auth.currentUser;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          return "User not found";
        } else if (error.code === "auth/invalid-credential") {
          return "Invalid credential";
        } else if (error.code === "auth/invalid-email") {
          return "Invalid email";
        } else if (error.code === "auth/wrong-password") {
          return "Wrong password";
        } else if (error.code === "auth/user-disabled") {
          return "User disabled";
        } else if (error.code === "auth/operation-not-allowed") {
          return "Operation not allowed";
        }
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({
    // username,
    email,
    password,
    confPassword,
    rememberMe,
  }: {
    // username: string;
    email: string;
    password: string;
    confPassword: string;
    rememberMe: string;
  }) => {
    try {
      console.log(email, password, confPassword);
      if (password !== confPassword) {
        return "Password and confirm password do not match";
      }
      if (rememberMe === "on") {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            // if (auth.currentUser) {
            //   updateProfile(auth.currentUser, {
            //     displayName: username,
            //   });
            // }
            console.log("user created");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        await setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return createUserWithEmailAndPassword(auth, email, password);
          })
          .then(() => {
            // if (auth.currentUser) {
            //   updateProfile(auth.currentUser, {
            //     displayName: username,
            //   });
            // }
            console.log("user created");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return auth.currentUser;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          return "Email already in use";
        } else if (error.code === "auth/invalid-email") {
          return "Invalid email";
        } else if (error.code === "auth/weak-password") {
          return "Weak password";
        } else if (error.code === "auth/operation-not-allowed") {
          return "Operation not allowed";
        }
        return error.message;
      } else {
        return "An error occurred";
      }
    }
  }
);

export const logout = createAsyncThunk("auth/lougout", async () => {
  try {
    await signOut(auth).then(() => {
      return null;
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    } else {
      return "An error occurred";
    }
  }
});

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
