import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMembershipTypes, createMembership, deleteMembership, pauseMembership, resumeMembership } from "../api";

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
  activeMembership: MembershipType | null;
  isPaused: boolean;
}

const initialState: MembershipState = {
  membershipTypes: [],
  loading: false,
  error: null,
  activeMembership: null,
  isPaused: false,
};

// Thunks
export const fetchMembershipTypesData = createAsyncThunk("membership/fetchMembershipTypesData", async () => {
  const response = await fetchMembershipTypes();
  return response;
});

export const addMembership = createAsyncThunk("membership/addMembership", async ({membershipTypeId }: {membershipTypeId: number }) => {
  console.log("Add Membership Thunk Called", membershipTypeId);
  const response = await createMembership(membershipTypeId);
  console.log("Add Membership Response", response);
  return response;
});

export const removeMembership = createAsyncThunk("membership/removeMembership", async (userId: number) => {
  await deleteMembership(userId);
  return userId;
});

export const togglePauseMembership = createAsyncThunk("membership/togglePauseMembership", async ({ userId, isPaused }: { userId: number; isPaused: boolean }) => {
  if (isPaused) {
    await resumeMembership(userId);
  } else {
    await pauseMembership(userId);
  }
  return !isPaused;
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
        console.log("Fetching membership types data...");
      })
      .addCase(fetchMembershipTypesData.fulfilled, (state, action: PayloadAction<MembershipType[]>) => {
        state.loading = false;
        state.membershipTypes = action.payload;
        console.log("Membership types data fetched successfully");
      })
      .addCase(fetchMembershipTypesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Failed to fetch membership types data", action.error.message);
      })
      .addCase(addMembership.fulfilled, (state, action: PayloadAction<MembershipType>) => {
        state.activeMembership = action.payload;
        state.isPaused = false;
        console.log("Membership added successfully", action.payload);
      })
      .addCase(addMembership.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Failed to add membership", action.error.message);
      })
      .addCase(removeMembership.fulfilled, (state) => {
        state.activeMembership = null;
        state.isPaused = false;
        console.log("Membership removed successfully", state.activeMembership);
      })
      .addCase(removeMembership.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Failed to remove membership", action.error.message);
      })
      .addCase(togglePauseMembership.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isPaused = action.payload;
        console.log("Membership pause state toggled successfully", action.payload);
      })
      .addCase(togglePauseMembership.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Failed to toggle membership pause state", action.error.message);
      })
      .addCase(togglePauseMembership.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Toggling membership pause state...");
      });
  },
});

export default membershipSlice.reducer;
