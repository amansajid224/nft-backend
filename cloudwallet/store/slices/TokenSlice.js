import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  current,
} from "@reduxjs/toolkit";
import Api from "../../api";
import { endpoints } from "../../constants";

export const fetchTokens = createAsyncThunk(
  "tokens/fetchTokens",
  async (meta, thunkAPI) => {
    try {
      const resp = await Api.get(endpoints.TOKENS, { params: meta });
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);

export const fetchTokenDetail = createAsyncThunk(
  "tokens/fetch/detail",
  async (args, thunkAPI) => {
    const { tokenAddress, meta } = args;
    try {
      const resp = await Api.get(`${endpoints.TOKENS_DETAIL}/${tokenAddress}`, {
        params: meta,
      });
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const fetchTokenAddressInfo = createAsyncThunk(
  "tokens/fetchTokenAddressInfo",
  (contractAddress, thunkAPI) => {
    Api.post(endpoints.TOKEN_ADDRESS_INFO, {
      contractAddress,
    })
      .then((result) => {
      })
      .catch((error) => {
        console.log("error", error);
      });
    // try {
    //   const resp = await Api.post(endpoints.TOKEN_ADDRESS_INFO, {
    //     contractAddress,
    //   });
    // } catch (error) {
    //   console.log("error", error);
    // }
    // try {
    //   const resp = await Api.post(endpoints.TOKEN_ADDRESS_INFO, {
    //     contractAddress,
    //   });
    //   const data = await resp.data;
    //   return data;
    // } catch (error) {
    //   console.log("errorr....", error);
    //   return thunkAPI.rejectWithValue({ error: error.response?.data });
    // }
  }
);
export const fetchDefaultTokens = createAsyncThunk(
  "tokens/fetchDefaultTokens",
  async (args, thunkAPI) => {
    try {
      const resp = await Api.get(endpoints.DEFAULT_TOKENS);
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const createCustomTokens = createAsyncThunk(
  "tokens/createCustomToken",
  async (token, thunkAPI) => {
    try {
      const resp = await Api.post(endpoints.CREAT_TOKEN, token);
      const data = resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const addTokens = createAsyncThunk(
  "tokens/addTokens",
  async (selectTokenList, thunkAPI) => {
    try {
      const resp = await Api.post(endpoints.ADD_TOKEN, {
        tokenIds: selectTokenList,
      });
      const data = await resp.data;
      return { ...data, tokenIds: selectTokenList };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchNativeTokenPrice = createAsyncThunk(
  "token/fetchNativeTokenPrice",
  async (arg, thunkAPI) => {
    try {
      const resp = await Api.get("https://api.lunarwhale.co.th/dex/lava");
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
  tokens: [],
  tokenAddressInfo: {},
  defaultTokens: [],
  selectedTokens: [],
  tokenBalances: {},
  tokenBalance: 0,
  pagination: {},
  nativeTokenPrice: {},
  tokenDetail: {},
  isLoading: true,
  isError: false,
  error: null,
  success: null,
};

export const TokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    emptySuccess: (state, action) => {
      state.success = null;
    },
    setTokensBalances: (state, action) => {
      state.tokenBalances = action.payload.tokenBalances;
    },
    setTokenBalance: (state, action) => {
      state.tokenBalance = action.payload.tokenBalance;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokens.fulfilled, (state, action) => {
      state.tokens = action.payload.data.tokens;
      state.pagination = {
        pageCount: action.payload.data.totalPages,
        pageIndex: action.payload.data.currentPage,
        pageSize: action.payload.data.pageSize,
        entries: action.payload.data.results,
      };
      state.isLoading = false;
    });
    builder.addCase(fetchTokenAddressInfo.fulfilled, (state, action) => {
      state.tokenAddressInfo = action.payload.data;
    });
    builder.addCase(fetchDefaultTokens.fulfilled, (state, action) => {
      state.defaultTokens = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchNativeTokenPrice.fulfilled, (state, action) => {
      state.nativeTokenPrice = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createCustomTokens.fulfilled, (state, action) => {
      state.defaultTokens = [
        ...state.defaultTokens,
        { ...action.payload.data, isSelected: true },
      ];
      state.success = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(addTokens.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.tokens = current(state).defaultTokens.filter((token) =>
      //   action.payload.tokenIds.includes(token._id)
      // );
      state.defaultTokens = current(state).defaultTokens.map((token) => {
        if (action.payload.tokenIds.includes(token?.id)) {
          return { ...token, isSelected: true };
        } else {
          return { ...token, isSelected: false };
        }
      });
    });
    // builder.addCase(fetchTokenAddressInfo.rejected, (state, action) => {
    //   state.tokenAddressInfo = {};
    // });
    builder.addCase(fetchTokenDetail.fulfilled, (state, action) => {
      state.tokenDetail = action.payload.data;
      state.isLoading = false;
    });
    builder.addMatcher(
      isAnyOf(
        fetchTokens.pending,
        fetchDefaultTokens.pending,
        fetchTokenDetail.pending
      ),
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(createCustomTokens.rejected, fetchTokenAddressInfo.rejected),
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
      }
    );
  },
});

export const { emptySuccess, setTokensBalances, setTokenBalance } =
  TokenSlice.actions;
const { reducer } = TokenSlice;

export const selectDefaultTokens = (state) => state.tokens.defaultTokens;
export const selectIsLoading = (state) => state.tokens.isLoading;
export const selectTokens = (state) => state.tokens.tokens;
export const selectTokenMeta = (state) => state.tokens.pagination;
export const selectIsError = (state) => state.tokens.isError;
export const selectError = (state) => state.tokens.error;
export const selectSuccess = (state) => state.tokens.success;
export const selectTokenInfo = (state) => state.tokens.tokenAddressInfo;
export const selectNativeTokenPrice = (state) => state.tokens.nativeTokenPrice;
export const selectTokenHistory = (state) => state.tokens.tokenDetail;
export const selectDefaultSelectedToken = (state) => {
  return (
    state?.tokens &&
    state?.tokens?.defaultTokens?.reduce((selected, currentToken) => {
      if (currentToken?.isSelected) {
        return selected.concat(currentToken?.id);
      }
      return selected;
    }, [])
  );
};
// export const selectModalProps = (state) => state.modal.props;

export default reducer;
