import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store'; // Assuming you have defined AppThunk type
import { getLoyaltyRewards } from '../api';


interface LoyaltyReward {
  id: number;
  user_id: number;
  status: string;
  loyalty_reward_type_id: number;
}

interface LoyaltyRewardState {
  loyaltyRewards: LoyaltyReward[];
}

const initialState: LoyaltyRewardState = {
  loyaltyRewards: [],
};

const loyaltyRewardSlice = createSlice({
  name: 'loyaltyReward',
  initialState,
  reducers: {
    setLoyaltyRewards: (state, action: PayloadAction<LoyaltyReward[]>) => {
        state.loyaltyRewards = action.payload;
      },
  },
});

export const { setLoyaltyRewards } = loyaltyRewardSlice.actions;

// Thunk action creator to fetch loyalty rewards
export const fetchLoyaltyRewardsAsync = (): AppThunk => async (dispatch) => {
    try {
      const loyaltyRewards = await getLoyaltyRewards(); // Assuming fetchLoyaltyRewardsFromDatabase is an API function
      dispatch(setLoyaltyRewards(loyaltyRewards));
    } catch (error) {
      console.error('Error fetching loyalty rewards:', error);
    }
  };
  

export default loyaltyRewardSlice.reducer;
