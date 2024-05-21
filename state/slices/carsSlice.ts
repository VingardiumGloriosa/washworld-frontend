import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store"; // Assuming you have defined AppThunk type
import { getCars, addCarToDatabase } from "../api"; // Assuming you have an API function to fetch cars from the database

export interface Car {
  id: number;
  user_id: string;
  licensePlate: string;
  carImageLink: string;
  qrCodeData?: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: "car",
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
    console.error("Error fetching cars:", error);
  }
};

export const addCarAsync =
  (car: Car): AppThunk =>
  async (dispatch) => {
    try {
      const newCar = await addCarToDatabase(car);
      console.log("addCarAsync", newCar);
      dispatch(addCar(newCar));
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

export default carSlice.reducer;
