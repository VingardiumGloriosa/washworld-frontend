import { configureStore } from "@reduxjs/toolkit";
import membershipTypesReducer from "./slices/membershipTypesSlice";
import loyaltyRewardTypesReducer from "./slices/loyaltyRewardTypesSlice";
import locationsReducer from "./slices/locationsSlice";
import selfWashHallsReducer from "./slices/selfWashHallsSlice";
import washHallsReducer from "./slices/washHallsSlice";
import usersReducer from "./slices/userSlice";
import membershipsReducer from "./slices/membershipsSlice";
import carsReducer from "./slices/carsSlice";
import loyaltyRewardsReducer from "./slices/loyaltyRewardsSlice";
import { ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";

export const store = configureStore({
  reducer: {
    membershipTypes: membershipTypesReducer,
    loyaltyRewardTypes: loyaltyRewardTypesReducer,
    locations: locationsReducer,
    selfWashHalls: selfWashHallsReducer,
    washHalls: washHallsReducer,
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
