import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getMembershipTypes } from "../api"; // Import your API function to fetch membership types

interface MembershipType {
  id: number;
  name: string;
  price: number;
  currency: string;
  washing_duration: string;
}

interface MembershipTypesState {
  membershipTypes: MembershipType[];
}

const initialState: MembershipTypesState = {
  membershipTypes: [],
};

const membershipTypesSlice = createSlice({
  name: "membershipTypes",
  initialState,
  reducers: {
    setMembershipTypes: (state, action: PayloadAction<MembershipType[]>) => {
      state.membershipTypes = action.payload;
    },
  },
});

export const { setMembershipTypes } = membershipTypesSlice.actions;

export default membershipTypesSlice.reducer;

export const fetchMembershipTypes = (): AppThunk => async (dispatch) => {
  try {
    const membershipTypes = await getMembershipTypes();
    dispatch(setMembershipTypes(membershipTypes));
  } catch (error) {
    console.error("Error fetching membership types:", error);
  }
};
