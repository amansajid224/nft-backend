import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../api";
import { endpoints } from "../../constants";
import detail from "../../pages/nft/detail";
import { findUrlKeyInObj, genrateNftUrl } from "../../utils";

const headers = {
  "Content-Type": "application/json",
  "api-key": process.env.NEXT_PUBLIC_NFT_API_KEY,
  "api-secret": process.env.NEXT_PUBLIC_NFT_SECRET_KEY,
};
export const fetchNfts = createAsyncThunk(
  "nft/fetch",
  async (args, thunkAPI) => {
    const { walletAddress, meta } = args;
    const { q, sortBy } = meta;
    try {
      // const state = thunkAPI.getState();
      // if (meta?.page < state?.nfts?.pagination?.currentPage) {
      //   return;
      // }
      const resp = await Api.get(`${endpoints.NFTS}/${walletAddress}`, {
        params: meta,
      });
      const data = await resp.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const fetchNftDetail = createAsyncThunk(
  "nft/fetch/detail",
  async (args, thunkAPI) => {
    const { tokenAddress, id } = args;
    try {
      const resp = await Api.get(
        `${endpoints.NFT_DETAIL}/${id}/${tokenAddress}?limit=5`
      );
      const data = await resp.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const fetchTransferHistory = createAsyncThunk(
  "nft/fetch/transfer",
  async (args, thunkAPI) => {
    try {
      const { tokenAddress, id, meta } = args;
      const resp = await Api.get(
        // `${endpoints.NFT_TRANSFER_HISTORY}/0x92D7E77ED57440eeC5aCdBDE01Aab2C82d5723e8/0xC5B6Ef4b3666Dd9bE32C7A2263aA568Bc2E0D965`,
        `${endpoints.NFT_TRANSFER_HISTORY}/${id}/${tokenAddress}`,
        {
          params: meta,
        }
      );
      const data = await resp.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
const initialState = {
  list: [],
  pagination: {},
  detail: {},
  transferHistory: {},
  isLoading: false,
  error: null,
  nftTransferId:0
};

export const NftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    removeAllNfts: (state, action) => {
      state.list = [];
    },
    updateList:(state,action)=>{
      state.nftTransferId=action.payload.id
    }
  },
  extraReducers: (builder) => {
    // fetch NFTs Status
    builder.addCase(fetchNfts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload !== undefined) {
        const { currentPage, pageSize, results, totalPages, data } =
          action.payload;
        // if (action?.payload?.currentPage === 1) {
        //   state.list = action.payload?.data;
        // } else {
        //   state.list = [...state.list, ...data];
        // }
        state.list = data;
        state.pagination = { currentPage, pageSize, results, totalPages };
      }
    });
    builder.addCase(fetchNfts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNfts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    });

    // fetch nft detail
    builder.addCase(fetchNftDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detail = action.payload?.data;
    });
    builder.addCase(fetchNftDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNftDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    });

    // fetch Transfer history
    builder.addCase(fetchTransferHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transferHistory = action.payload?.data;
    });
    builder.addCase(fetchTransferHistory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransferHistory.rejected, (state, action) => {
      state.isLoading = false;
      console.log("action.payload.error", action);
      state.error = action.payload?.error;
    });
  },
});
export const { removeAllNfts,updateList } = NftSlice.actions;
const { reducer } = NftSlice;
export const selectNftsList = (state) => state?.nfts?.list;
export const selectNftDetail = (state) => state?.nfts?.detail;
export const selectIsLoading = (state) => state?.nfts?.isLoading;
export const selectTransactionHistory = (state) => {
  return state?.nfts?.transferHistory;
};
export const selectNftByIdJson = (id) => (state) => {
  const nftById = state?.nfts?.list.find((nft, index) => nft.id === id);
  return state?.nfts?.list;
};
export default reducer;
