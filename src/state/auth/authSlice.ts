import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signOut,
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
import { User as UserInterface } from "../../types/types";

interface AuthState {
  user: UserInterface | null;
  uid: string;
  loading: boolean;
  error: string | null;
}

const GetUserAccountInfo = async () => {
  if (auth.currentUser) {
    console.log("-------------------------------");
    const uid = auth.currentUser.uid;
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log("********************************");

      return docSnap.data() as UserInterface;
    } else {
      console.log("No such document!");
      const username = auth.currentUser.email
        ? auth.currentUser.email.split("@")[0] +
          Math.random().toString(36).substring(7)
        : Math.random().toString(36).substring(7);
      const name_splited = auth.currentUser.displayName?.split(" ") || [
        username,
      ];

      const user: UserInterface = {
        username: username,
        accountType: "user",
        firstName: name_splited[0],
        lastName: name_splited.length > 1 ? name_splited[1] : "",
        bio: "",
        birthday: "",
        gender: "male",
        phoneNumbers: [],
        address: "",
        avatar: auth.currentUser.photoURL ? auth.currentUser.photoURL : "",
      };
      // create doc base on uid
      const docRef = doc(firestore, "users", uid);
      await setDoc(docRef, user);
      console.log("********************************");

      return user;
    }
  } else {
    console.log("user is not authenticated");
    return null;
  }
};

// inisial state
const initialState: AuthState = {
  user: null,
  uid: "",
  loading: false,
  error: null,
};

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
      state.uid =
        action.payload === null ? "" : (auth.currentUser?.uid as string);
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
          state.uid = auth.currentUser?.uid as string;
          state.user = action.payload as UserInterface;
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
          state.uid = auth.currentUser?.uid as string;
          state.user = action.payload as UserInterface;
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
          state.uid = auth.currentUser?.uid as string;
          state.user = action.payload as UserInterface;
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
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "object" && action.payload !== null) {
          state.error = null;
          state.uid = auth.currentUser?.uid as string;
          state.user = action.payload as UserInterface;
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

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
      provider && (await signInWithPopup(auth, provider));
      const user: UserInterface | null = await GetUserAccountInfo();
      return user;
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
      const user: UserInterface | null = await GetUserAccountInfo();
      return user;
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
            console.log("user created");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const user: UserInterface | null = await GetUserAccountInfo();
      return user;
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

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
  try {
    console.log("get user data running");
    const user: UserInterface | null = await GetUserAccountInfo();
    console.log("done");
    return user;
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
