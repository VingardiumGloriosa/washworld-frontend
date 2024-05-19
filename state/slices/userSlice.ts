import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserQueries } from "../userQueries";
import * as SecureStore from "expo-secure-store";

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  email: string;
  photo: string;
  password: string;
  full_name: string;
  membership_id: number;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      console.log("Logging out");

      SecureStore.deleteItemAsync("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.token = action.payload.token;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const signup = createAsyncThunk("user/signup", async (credentials: { username: string; email: string; password: string }) => {
  console.log("signup thunk", credentials);
  const response = await UserQueries.signup(credentials.username, credentials.email, credentials.password);
  return response;
});

export const login = createAsyncThunk("user/login", async (credentials: { email: string; password: string }) => {
  console.log("login thunk", credentials);
  const response = await UserQueries.login(credentials.email, credentials.password);
  return response;
});

export const { setCurrentUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
