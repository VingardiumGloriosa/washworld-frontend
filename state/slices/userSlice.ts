import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserQueries } from "../userQueries";
import * as SecureStore from "expo-secure-store";
import { fetchUser, fetchUserHome } from "../api";
import { Location } from "./locationsSlice";
import { LoyaltyReward } from "./loyaltyRewardSlice";

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
  fullName: string;
  membership_id: number;
  history?: HistoryItem[];
  loyaltyRewards: LoyaltyReward[];
  loyaltyRewardProgress: { progress: number; goal: number };
}

interface HistoryItem {
  id: number;
  date: string;
  location: Location;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
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
      state.token = "";
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
      console.log("Signup pending");
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token;
      state.error = null;
      SecureStore.setItemAsync("token", action.payload.access_token);
      console.log("Signup fulfilled", action.payload);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log("Signup rejected", action.error.message);
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.access_token;
      state.error = null;
      state.isAuthenticated = true;
      SecureStore.setItemAsync("token", action.payload.access_token);
      console.log("token", action.payload.access_token);
      console.log("Login fulfilled", action.payload);
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
    // uncommment when done testing authentication flow
    /* 
    builder.addCase(checkAuthentication.rejected, (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.currentUser = null;
    });
    builder.addCase(checkAuthentication.pending, (state) => {
      state.loading = true;
    }); */
    builder.addCase(fetchUserHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentUser) {
        state.currentUser.id = action.payload.id;
        state.currentUser.email = action.payload.email;
        state.currentUser.photo = action.payload.photo;
        state.currentUser.membership_id = action.payload.membership;
        state.currentUser.fullName = action.payload.fullName;
      }
      state.error = null;
    });
    
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });    
  },
});

export const signup = createAsyncThunk("user/signup", async (credentials: { fullName: string; email: string; password: string }, thunkAPI) => {
  console.log("signup thunk", credentials);

  const response = await UserQueries.signup(credentials.fullName, credentials.email, credentials.password);
  console.log("signup response", response);

  return response;
});

export const login = createAsyncThunk("user/login", async (credentials: { email: string; password: string }, thunkAPI) => {
  console.log("login thunk", credentials);
  const response = await UserQueries.login(credentials.email, credentials.password);
  console.log("login response", response);
  return response;
});

export const checkAuthentication = createAsyncThunk("user/checkAuthentication", async () => {
  const token = await SecureStore.getItemAsync("token");
  //console.log("Retrieved token", token);
  if (token) {
    // Optionally fetch user info with the token
    const user = await UserQueries.fetchUserWithToken(token);
    return { user, token };
  }
  return null;
});

export const fetchUserHistory = createAsyncThunk("user/fetchUserHistory", async () => {
  const response = await fetchUserHome();
  return response;
});

export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const response = await fetchUser();
  return response;
});

export const { setCurrentUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
