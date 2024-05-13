import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store'; // Assuming you have defined AppThunk type
import { createUser, loginUser  } from '../api'; // Assuming you have an API function to fetch current user data


export interface User {
  id: number;
  email: string;
  photo: string;
  password: string;
  full_name: string;
  membership_id: number;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

// Thunk action creator for user sign up
export const signUpAsync = (userData: any): AppThunk => async (dispatch) => {
  try {
    const newUser = await createUser(userData); // Assuming createUser function is defined in the API
    dispatch(setCurrentUser(newUser));
  } catch (error) {
    console.error('Error signing up:', error);
    // Handle error, e.g., show an error message to the user
  }
};

// Thunk action creator for user login
export const loginAsync = (userData: any): AppThunk => async (dispatch) => {
  try {
    const user = await loginUser(userData); // Assuming loginUser function is defined in the API
    dispatch(setCurrentUser(user));
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export default userSlice.reducer;
