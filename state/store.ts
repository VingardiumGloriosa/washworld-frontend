import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import usersReducer from "./slices/userSlice";
import membershipsReducer from "./slices/membershipsSlice";
import carsReducer from "./slices/carSlice";
import loyaltyRewardsReducer from "./slices/loyaltyRewardSlice";

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    users: usersReducer,
    memberships: membershipsReducer,
    cars: carsReducer,
    loyaltyRewards: loyaltyRewardsReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// AppThunk type definition
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
