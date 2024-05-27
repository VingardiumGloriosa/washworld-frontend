import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchLocation, fetchLocations, calculateDistances } from "../api";

export interface Location {
  id: number;
  name: string;
  address: string;
  photo: string;
  mapsUrl: string;
  distance: number;
  latitude: number;
  longitude: number;
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

// Thunk to fetch location by ID
export const fetchLocationById = createAsyncThunk('location/fetchLocationById', async (locationId: number) => {
  const response = await fetchLocation(locationId);
  return response;
});

// Thunk to fetch all locations
export const fetchAllLocations = createAsyncThunk('location/fetchAllLocations', async () => {
  const response = await fetchLocations();
  return response;
});

//Thunk to calculate distances for all locations
export const calculateDistancesForAllLocations = createAsyncThunk('location/calculateDistancesForAllLocations', async (_, { getState, dispatch }) => {
  const locations = await fetchLocations();
  const distances = await calculateDistances(55.77419181465124, 12.514585695774914)
  const updatedLocations = locations.map(location => {
    return ({
      ...location,
      distance: distances.find(d => d.id === location.id)?.distance || null
    })
  });
  return updatedLocations;
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
      .addCase(calculateDistancesForAllLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateDistancesForAllLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.loading = false;
        state.locations = action.payload
      })
      .addCase(calculateDistancesForAllLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
