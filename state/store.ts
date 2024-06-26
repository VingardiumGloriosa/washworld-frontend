import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import usersReducer from "./slices/userSlice";
import membershipsReducer from "./slices/membershipsSlice";
import loyaltyRewardReducer from "./slices/loyaltyRewardSlice";
import carReducer from "./slices/carSlice";
import globalReducer from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    location: locationsReducer,
    users: usersReducer,
    memberships: membershipsReducer,
    loyaltyRewards: loyaltyRewardReducer,
    cars: carReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// AppThunk type definition
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
