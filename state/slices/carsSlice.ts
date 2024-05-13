import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store'; // Assuming you have defined AppThunk type
import { getCars } from '../api'; // Assuming you have an API function to fetch cars from the database

export interface Car {
  id: number;
  user_id: number;
  license_plate: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
  },
});

export const { addCar, setCars } = carSlice.actions;

// Thunk action creator to fetch cars
export const fetchCarsAsync = (): AppThunk => async (dispatch) => {
  try {
    const cars = await getCars(); 
    dispatch(setCars(cars));
  } catch (error) {
    console.error('Error fetching cars:', error);
  }
};

export default carSlice.reducer;
