import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toggleLoyaltyReward, fetchUserHome } from "../api";

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
  // try {
  //   const rewards = await fetchLoyaltyRewards();
  //   return rewards; // Return the fetched rewards
  // } catch (error) {
  //   throw new Error("Failed to fetch rewards"); // Throw an error if fetching fails
  // }
});

// Thunk to toggle loyalty reward
export const toggleReward = createAsyncThunk("loyaltyReward/toggleReward", async (rewardId: number) => {
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
