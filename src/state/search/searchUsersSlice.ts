import { User } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocs, collection, where, query, limit, startAfter } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { RootState } from "../store";

interface SearchedUser {
  uid: string;
  user_info: User;
}

interface SearchUserState {
  isLoading: boolean;
  error: string | null | undefined;
  searchResults: SearchedUser[];
  lastDoc: any;
}

const initialUserState: SearchUserState = {
  isLoading: false,
  error: null,
  searchResults: [],
  lastDoc: null,
};

const searchUserSlice = createSlice({
  name: "searchusers",
  initialState: initialUserState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchedUser[] | []>) => {
      state.searchResults = action.payload;
    },
    setLastDoc: (state, action) => {
      state.lastDoc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByUserName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(searchByUserName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        action.payload.users.forEach((newUser) => {
          if (!state.searchResults.find((user) => user.uid === newUser.uid)) {
            state.searchResults.push(newUser);
          }
        });
      }
    }).addCase(searchByUserName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(searchByUserNameAndTypeAccount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }
    ).addCase(searchByUserNameAndTypeAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      if (typeof action.payload === "object" && action.payload !== null) {
        action.payload.users.forEach((newUser) => {
          if (!state.searchResults.find((user) => user.uid === newUser.uid)) {
            state.searchResults.push(newUser);
          }
        });
      }
    }).addCase(searchByUserNameAndTypeAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });


  },
});

export const searchByUserName = createAsyncThunk(
  "search/searchByUserName",
  async (username: string, thunkAPI) => {
    try {
      const usersCol = collection(firestore, "users");
      const lastDoc = (thunkAPI.getState() as RootState).usersearch.lastDoc;

      let q = query(
        usersCol,
        where("username", ">=", username),
        where("username", "<=", username + "\uf8ff"),
        limit(4)
      );

      if (lastDoc) {
        q = query(
          q,
          startAfter(lastDoc)
        );
      }

      const querySnapshot = await getDocs(q);
      const users: SearchedUser[] = [];
      querySnapshot.forEach((doc) => {
        users.push({
          user_info: doc.data() as User,
          uid: doc.id,
        });
      });
      thunkAPI.dispatch(setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]));
      return { users: users };
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
);

// search users by username and typeaccount
export const searchByUserNameAndTypeAccount = createAsyncThunk(
  "search/searchByUserNameAndTypeAccount",
  async (searchData: { username: string; typeAccount: string }, thunkAPI) => {
    try {
      const usersCol = collection(firestore, "users");
      const lastDoc = (thunkAPI.getState() as RootState).usersearch.lastDoc;

      let q = query(
        usersCol,
        where("username", ">=", searchData.username),
        where("username", "<=", searchData.username + "\uf8ff"),
        where("accountType", "==", searchData.typeAccount),
        limit(4)
      );

      if (lastDoc) {
        q = query(
          q,
          startAfter(lastDoc)
        );
      }

      const querySnapshot = await getDocs(q);
      const users: SearchedUser[] = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;

        users.push({
          user_info: user,
          uid: doc.id,
        });
      });

      thunkAPI.dispatch(setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]));
      console.log(users)
      return { users: users };
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }
);

export const { setSearchResults, setLastDoc } = searchUserSlice.actions;
export default searchUserSlice.reducer;
