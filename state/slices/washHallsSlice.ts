import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getWashHalls } from '../api';


interface WashHall {
  id: number;
  location_id: number;
  finish_time: string; // Assuming finish_time is a string in ISO 8601 format
  is_out_of_service: boolean;
}

interface WashHallsState {
  washHalls: WashHall[];
}

const initialState: WashHallsState = {
  washHalls: []
};

const washHallsSlice = createSlice({
  name: 'washHalls',
  initialState,
  reducers: {
    setWashHalls: (state, action: PayloadAction<WashHall[]>) => {
      state.washHalls = action.payload;
    },
  },
});

export const { setWashHalls } = washHallsSlice.actions;


// Thunk action creator to fetch and set wash halls
export const fetchAndSetWashHallsAsync = (): AppThunk => async (dispatch) => {
    try {
      const washHalls = await getWashHalls(); 
      dispatch(setWashHalls(washHalls));
    } catch (error) {
      console.error('Error fetching wash halls:', error);
    }
  };

export default washHallsSlice.reducer;
