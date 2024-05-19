import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserQueries } from "../userQueries";
import * as SecureStore from "expo-secure-store";

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface User {
  id: number;
  email: string;
  photo: string;
  password: string;
  username: string;
  membership_id: number;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
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
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = true;
      SecureStore.setItemAsync("token", action.payload.token);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = true;
      SecureStore.setItemAsync("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(checkAuthentication.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.currentUser = null;
      }
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

export const checkAuthentication = createAsyncThunk("user/checkAuthentication", async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    // Optionally fetch user info with the token
    const user = await UserQueries.fetchUserWithToken(token);
    return { user, token };
  }
  return null;
});

export const { setCurrentUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
