import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toggleLoyaltyReward } from "../api";

export interface LoyaltyReward {
  id: number;
  name: string;
  isActive: boolean;
}

interface LoyaltyRewardState {
  rewards: LoyaltyReward[];
  loading: boolean;
  error: string | null;
}

const initialState: LoyaltyRewardState = {
  rewards: [],
  loading: false,
  error: null,
};

// Thunk to toggle loyalty reward
export const toggleReward = createAsyncThunk('loyaltyReward/toggleReward', async (rewardId: number) => {
  const response = await toggleLoyaltyReward(rewardId);
  return response;
});

const loyaltyRewardSlice = createSlice({
  name: "loyaltyReward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleReward.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleReward.fulfilled, (state, action: PayloadAction<LoyaltyReward>) => {
        state.loading = false;
        const updatedReward = action.payload;
        const index = state.rewards.findIndex(reward => reward.id === updatedReward.id);
        if (index !== -1) {
          state.rewards[index] = updatedReward;
        } else {
          state.rewards.push(updatedReward);
        }
        state.error = null;
      })
      .addCase(toggleReward.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loyaltyRewardSlice.reducer;
