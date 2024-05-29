import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../store"; // Assuming you have defined AppThunk type
import { addCarToDatabase, fetchUserCars, fetchUserCar, updateUserCar, deleteUserCar } from "../api"; // Assuming you have an API function to fetch cars from the database

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

export const addCar = createAsyncThunk("car/addCar", async ({ car }: { car: Car }) => {
  const response = await addCarToDatabase(car);
  return response;
});

export const updateCar = createAsyncThunk("car/updateCar", async ({ userId, carId, car }: { userId: number; carId: number; car: Partial<Car> }) => {
  const response = await updateUserCar(userId, carId, car);
  return response;
});

export const removeCar = createAsyncThunk("car/removeCar", async ({ userId, carId }: { userId: number; carId: number }) => {
  await deleteUserCar(userId, carId);
  return carId;
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
      .addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => {
        const updatedCar = action.payload;
        const index = state.cars.findIndex((car) => car.id === updatedCar.id);
        if (index !== -1) {
          state.cars[index] = updatedCar;
        }
        console.log("updated car");
      })
      .addCase(removeCar.fulfilled, (state, action: PayloadAction<number>) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
        console.log("removed car");
      });
  },
});

export default carSlice.reducer;
