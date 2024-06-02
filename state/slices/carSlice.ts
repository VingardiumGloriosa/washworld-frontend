import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../store"; // Assuming you have defined AppThunk type
import { addCarToDatabase, fetchUserCars, fetchUserCar, deleteUserCar } from "../api"; // Assuming you have an API function to fetch cars from the database

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

export const fetchCar = createAsyncThunk("car/fetchCar", async ({ userId, carId }: { userId: number; carId: number }) => {
  const response = await fetchUserCar(userId, carId);
  return response;
});

export const deleteCar = createAsyncThunk("car/deleteCar", async (carId: number) => {
  await deleteUserCar(carId);
  return carId; // Return carId to remove it from the state
});

export const addCar = createAsyncThunk("car/addCar", async ({ car }: { car: Car }) => {
  const response = await addCarToDatabase(car);
  return response;
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
      .addCase(fetchCar.fulfilled, (state, action: PayloadAction<Car>) => {
        const car = action.payload;
        const index = state.cars.findIndex((c) => c.id === car.id);
        if (index !== -1) {
          state.cars[index] = car;
        } else {
          state.cars.push(car);
        }
        console.log("fetched car");
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
