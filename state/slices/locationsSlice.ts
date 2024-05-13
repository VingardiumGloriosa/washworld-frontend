import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocations } from '../api'; // Import your API function to fetch locations
import { AppThunk } from '../store';

interface Location {
  id: number;
  photo_url: string;
  name: string;
  address: string;
  maps_url: string;
}

interface LocationsState {
  locations: Location[];
}

const initialState: LocationsState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    }
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;

export const fetchLocations = (): AppThunk => async (dispatch) => {
  try {
    const locations = await getLocations();
    dispatch(setLocations(locations));
  } catch (error) {
    console.error('Error fetching locations:', error);  }
};
