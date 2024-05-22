import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// firebase
import { getDoc,doc } from "firebase/firestore";
import { firestore } from "@/services/firebase";

// types
import { User, UserState } from "../../types/types";

const initialState: UserState = {
  user: {
    username: "",
    bio: "",
    birthday: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumbers: [],
    address: "",
    avatar: "",
    accountType:"user"
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.status = "idle";
      } else {
        state.status = "failed";
        state.error = "User not found";
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
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
        return docSnap.data() as User;
      } else {
        return null;
      }
    }
    catch (error) {
      throw new Error( "Failed to fetch user data");
    }

    
  });

export const { setUser, clearUser, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
