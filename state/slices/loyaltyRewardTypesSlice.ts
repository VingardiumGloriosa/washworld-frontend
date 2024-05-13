import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { getLoyaltyRewardTypes } from '../api'; // Import your API function to fetch loyalty reward types

interface LoyaltyRewardType {
  id: number;
  name: string;
  description: string;
}

interface LoyaltyRewardTypesState {
  loyaltyRewardTypes: LoyaltyRewardType[];
}

const initialState: LoyaltyRewardTypesState = {
  loyaltyRewardTypes: [],
};

const loyaltyRewardTypesSlice = createSlice({
  name: 'loyaltyRewardTypes',
  initialState,
  reducers: {
    setLoyaltyRewardTypes: (state, action: PayloadAction<LoyaltyRewardType[]>) => {
      state.loyaltyRewardTypes = action.payload;
    },
  },
});

export const { setLoyaltyRewardTypes } = loyaltyRewardTypesSlice.actions;

export const fetchLoyaltyRewardTypes = (): AppThunk => async (dispatch) => {
  try {
    const loyaltyRewardTypes = await getLoyaltyRewardTypes();
    dispatch(setLoyaltyRewardTypes(loyaltyRewardTypes));
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};

export default loyaltyRewardTypesSlice.reducer;