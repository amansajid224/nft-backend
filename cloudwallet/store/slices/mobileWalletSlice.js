import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mobileAccount: null,
};

const mobileWalletSlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setMobileAccount: (state, action) => {
      state.mobileAccount = action.payload;
    },
  },
});

export const { setMobileAccount } = mobileWalletSlice.actions;
export default mobileWalletSlice.reducer;