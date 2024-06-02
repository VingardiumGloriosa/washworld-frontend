import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../store"; // Assuming you have defined AppThunk type
import { addCarToDatabase, fetchUserCars, deleteUserCar } from "../api"; // Assuming you have an API function to fetch cars from the database

export interface Car {
  id: number;
  userId: number;
  licensePlate: string;
  photo?: string;
  qrCodeData: string;
}

interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchCars = createAsyncThunk("car/fetchCars", async () => {
  const response = await fetchUserCars();
  return response;
});

export const deleteCar = createAsyncThunk("car/deleteCar", async (carId: number) => {
  await deleteUserCar(carId);
  return carId; // Return carId to remove it from the state
});


export const addCar = createAsyncThunk("car/addCar", async (car: Car) => {
  try {
    const response = await addCarToDatabase(car);
    return response;
  } catch (error) {
    throw new Error("API request failed: " + error.message);
  }
});

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("fetching cars...");
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        state.cars = action.payload;
        console.log("fetched cars");
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("fetch cars error", action.error.message);
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars.push(action.payload);
        console.log("added car");
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("deleting car...");
      })
      .addCase(deleteCar.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.cars = state.cars.filter(car => car.id !== action.payload);
        console.log("deleted car");
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("delete car error", action.error.message);
      });
  },
});

export default carSlice.reducer;
