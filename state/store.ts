import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import usersReducer from "./slices/userSlice";
import { ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// AppThunk type definition
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
