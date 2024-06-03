import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// firebase
import { getDoc, doc,getDocs,collection,where,query } from "firebase/firestore";
import { firestore } from "@/services/firebase";

// types
import { User, UserState } from "../../types/types";

const initialState: UserState = {
  user: {
    username: "",
    bio: "",
    birthday: undefined,
    firstName: "",
    lastName: "",
    gender:undefined,
    phoneNumbers: [],
    address: "",
    avatar: "",
    accountType: "user",
  },
  uid:"",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{uid:string,user:User}>) => {
      state.user = action.payload.user;
      state.uid = action.payload.uid;
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
    clearUser: (state) => {
      state.user = initialState.user;
      state.status = "idle";
      state.error = null;
      state.uid = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getUser.fulfilled, (state, action) => {
      if (typeof action.payload === "object" && action.payload !== null) {
        state.user = action.payload.user;
        state.uid = action.payload.uid;
        state.status = "idle";
      } else {
        state.status = "failed";
        state.error = "User not found";
      }
    })
    .addCase(getUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getUserByUsername.pending, (state) => {
      state.status = "loading";
    }
    ).addCase(getUserByUsername.fulfilled, (state, action) => {
      if (typeof action.payload === "object" && action.payload !== null) {
        state.user = action.payload.user;
        state.uid = action.payload.uid;
        state.status = "idle";
      } else {
        state.status = "failed";
        state.error = "User not found";
      }
    }).addCase(getUserByUsername.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getUser = createAsyncThunk("user/getUser", async (uid: string) => {
  try {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log(docSnap.id, " => ", docSnap.data());
      return {uid:docSnap.id, user:docSnap.data() as User };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
});

export const getUserByUsername = createAsyncThunk(
  "user/getUserByUsername",
  async (username: string) => {
    try {
      const q = query(collection(firestore, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0];
        return {uid:data.id, user:data.data() as User };
      }
      return null;
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  }
);



export const { setUser, clearUser, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
