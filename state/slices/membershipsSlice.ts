import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMembership } from '../api';
import { AppThunk } from '../store'

interface Membership {
  id: number;
  membership_type_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
}

interface MembershipState {
  membership: Membership | null;
}

const initialState: MembershipState = {
  membership: null,
};

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    setMembership: (state, action: PayloadAction<Membership>) => {
      state.membership = (action.payload);
    },
  },
});

export const { setMembership } = membershipSlice.actions;

export const fetchAndSetMembership = (): AppThunk => async (dispatch) => {
  try {
    const membership = await getMembership();
    dispatch(setMembership(membership));
  }catch(error) {
    console.error('Error fetching membership:', error)
  }
}

export default membershipSlice.reducer;
