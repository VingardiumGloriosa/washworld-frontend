import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchLocation, getDistance, getDistances, fetchLocations } from "../api";

export interface Location {
  id: number;
  name: string;
  address: string;
  mapsUrl: string;
  distance?: number;
  washHalls: {
    available: number;
    total: number;
    outOfService: number;
    nextAvailable: string | null;
  };
  selfWashHalls: {
    available: number;
    total: number;
    outOfService: number;
    nextAvailable: string | null;
  };
}

interface LocationState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchLocationById = createAsyncThunk('location/fetchLocationById', async (locationId: number) => {
  const response = await fetchLocation(locationId);
  return response;
});

export const fetchAllLocations = createAsyncThunk('location/fetchAllLocations', async () => {
  const response = await fetchLocations();
  return response;
});

export const fetchDistances = createAsyncThunk('location/fetchDistances', async (data: { currentLocation: { latitude: number, longitude: number }, destinationLocations: { id: number, latitude: number, longitude: number }[] }) => {
  const response = await getDistances(data);
  return response;
});

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action: PayloadAction<Location>) => {
        state.loading = false;
        const index = state.locations.findIndex(location => location.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        } else {
          state.locations.push(action.payload);
        }
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchAllLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDistances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistances.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchDistances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
