import { User } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit } from "firebase/firestore";
import { firestore } from "@/services/firebase";

interface SearchedUser {
  uid: string;
  user_info: User;
}

interface SearchUserState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedUser[];
}

const initialUserState: SearchUserState = {
  isLoading: false,
  error: null,
  searchResults: [],
};

const searchUserSlice = createSlice({
  name: "searchusers",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchByUserName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchByUserName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        state.searchResults = action.payload.users;
      }
    });
    builder.addCase(searchByUserName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const searchByUserName = createAsyncThunk(
  "search/searchByUserName",
  async (username: string) => {
    try {
      const usersCol = collection(firestore, "users");
      // where username like username limit 10
      const q = query(
        usersCol,
        where("username", ">=", username),
        where("username", "<=", username + "\uf8ff"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const users: SearchedUser[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          user_info: doc.data() as User,
          uid: doc.id,
        });
      });
      return { users: users };
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
);

// search users by username and typeaccount
export const searchByUserNameAndTypeAccount = createAsyncThunk(
  "search/searchByUserNameAndTypeAccount",
  async (searchData: { username: string; typeAccount: string }) => {
    try {
      const usersCol = collection(firestore, "users");
      // where username like username limit 10
      const q = query(
        usersCol,
        where("username", ">=", searchData.username),
        where("username", "<=", searchData.username + "\uf8ff"),
        where("accountType", "==", searchData.typeAccount),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const users: SearchedUser[] = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;

        users.push({
          user_info: user,
          uid: doc.id,
        });
      });
      return { users: users };
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
);

export default searchUserSlice.reducer;
