import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  SecretHeaderAPIKey:
    "C4A729E4555D1A47321B585AABB75_JAMIE_VULCAN_MINION_595878CC743CF6FA5658A946C46A4",
};

export const fetchDapps = createAsyncThunk(
  "fetch/dapps",
  async (args, thunkAPI) => {
    try {
      const resp = await axios.get(process.env.NEXT_PUBLIC_DAPPS_URL, {
        headers,
      });
      const data = await resp.data;
      return data;
    } catch (error) {
      throw new Error("something went wrong");
    }
  }
);
const initialState = {
  list: [],
  isLoading: true,
  error: null,
};
export const DappSlice = createSlice({
  name: "dapps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDapps.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchDapps.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDapps.rejected, (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload.error;
    });
  },
});

const { reducer } = DappSlice;

export const selectDapps = (state) => state.dapps?.list;
export const selectIsLoading = (state) => state.dapps?.isLoading;

export default reducer;
