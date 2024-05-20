import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import locationsReducer from './slices/locationsSlice';
import usersReducer from './slices/userSlice';
import membershipsReducer from './slices/membershipsSlice';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';


export const store = configureStore({
    reducer: {
        locations: locationsReducer,
        users: usersReducer,
        memberships: membershipsReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// AppThunk type definition
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
