import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `user`, handled by `userSlice`
    user: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
