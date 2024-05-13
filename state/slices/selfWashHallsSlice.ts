import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getSelfWashHalls } from '../api';



interface SelfWashHall {
  id: number;
  location_id: number;
  is_in_use: boolean;
  is_out_of_service: boolean;
}

interface SelfWashHallsState {
  selfWashHalls: SelfWashHall[];
}

const initialState: SelfWashHallsState = {
  selfWashHalls: [],
};

const selfWashHallsSlice = createSlice({
  name: 'selfWashHalls',
  initialState,
  reducers: {
    setSelfWashHalls: (state, action: PayloadAction<SelfWashHall[]>) => {
      state.selfWashHalls = action.payload;
    },
  },
});

export const { setSelfWashHalls } = selfWashHallsSlice.actions;

// Thunk action creator to fetch self wash halls
export const fetchSelfWashHalls = (): AppThunk => async (dispatch) => {
    try {
      const selfWashHalls = await getSelfWashHalls();
      dispatch(setSelfWashHalls(selfWashHalls));
    } catch (error) {
        console.error('Error fetching self wash halls:', error);
    }
  };

export default selfWashHallsSlice.reducer;
