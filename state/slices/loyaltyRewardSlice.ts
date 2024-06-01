import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toggleLoyaltyReward, fetchUserHome, fetchLoyaltyRewardTypes } from "../api";

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

// Thunk to fetch loyalty rewards
export const fetchRewards = createAsyncThunk("loyaltyRewards/fetchRewards", async () => {
  const rewards = await fetchLoyaltyRewardTypes();
  return rewards; // Return the fetched rewards
});

// Thunk to toggle loyalty reward
export const toggleReward = createAsyncThunk("loyaltyReward/toggleReward", async ({ userId, rewardId, isActive }: { userId: number, rewardId: number, isActive: boolean }) => {
  const response = await toggleLoyaltyReward(userId, rewardId, isActive);
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
        const index = state.rewards.findIndex((reward) => reward.id === updatedReward.id);
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
      })
      .addCase(fetchRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action: PayloadAction<LoyaltyReward[]>) => {
        state.loading = false;
        state.rewards = action.payload;
        state.error = null;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default loyaltyRewardSlice.reducer;
