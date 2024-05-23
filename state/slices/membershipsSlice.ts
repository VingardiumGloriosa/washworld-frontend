import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMembershipTypes, createMembership, deleteMembership, pauseMembership } from "../api";

export interface MembershipType {
  id: number;
  name: string;
  price: number;
  currency: string;
  washingDuration: number;
}

interface MembershipState {
  membershipTypes: MembershipType[];
  loading: boolean;
  error: string | null;
}

const initialState: MembershipState = {
  membershipTypes: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchMembershipTypesData = createAsyncThunk("membership/fetchMembershipTypesData", async () => {
  const response = await fetchMembershipTypes();
  return response;
});

export const addMembership = createAsyncThunk("membership/addMembership", async ({ userId, membershipTypeId }: { userId: number; membershipTypeId: number }) => {
  const response = await createMembership(userId, membershipTypeId);
  return response;
});

export const removeMembership = createAsyncThunk("membership/removeMembership", async (userId: number) => {
  await deleteMembership(userId);
  return userId;
});

export const pauseUserMembership = createAsyncThunk("membership/pauseUserMembership", async (userId: number) => {
  const response = await pauseMembership(userId);
  return response;
});

export const updateMembership = createAsyncThunk("membership/updateMembership", async ({ userId, membershipTypeId }: { userId: number; membershipTypeId: number }) => {
  const response = await updateMembership(userId, membershipTypeId);
  return response;
});

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembershipTypesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembershipTypesData.fulfilled, (state, action: PayloadAction<MembershipType[]>) => {
        state.loading = false;
        state.membershipTypes = action.payload;
      })
      .addCase(fetchMembershipTypesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMembership.fulfilled, (state, action: PayloadAction<any>) => {
        // Handle the addition of a membership
      })
      .addCase(removeMembership.fulfilled, (state, action: PayloadAction<number>) => {
        // Handle the removal of a membership
      })
      .addCase(pauseUserMembership.fulfilled, (state, action: PayloadAction<any>) => {
        // Handle the pausing of a membership
      })
      .addCase(updateMembership.fulfilled, (state, action: PayloadAction<any>) => {
        // Handle the updating of a membership
      });
  },
});

export default membershipSlice.reducer;
