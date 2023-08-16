import { isEmpty } from "@chakra-ui/utils";
import { async } from "@firebase/util";
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  current,
} from "@reduxjs/toolkit";
import Api from "../../api";
import { endpoints } from "../../constants";
import { generateNotification } from "../../utils";

export const createNotification = createAsyncThunk(
  "notifications/create",
  async (transactionHash, thunkAPI) => {
    const notification = generateNotification("tokenTransaction", {
      transactionHash: transactionHash,
    });
    try {
      const resp = await Api.post(endpoints.NOTIFICATION, notification);
      const data = resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchNotification = createAsyncThunk(
  "notifications/fetch",
  async (meta, thunkAPI) => {
    try {
      const resp = await Api.get(endpoints.NOTIFICATION, { params: meta });
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchLatestNotifications = createAsyncThunk(
  "notifications/fetch/latest",
  async (limit, thunkAPI) => {
    try {
      const resp = await Api.get(endpoints.NOTIFICATION, {
        params: { limit: limit },
      });
      const data = await resp.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const readNotification = createAsyncThunk(
  "notification/update/read",
  async (id) => {
    try {
      const resp = await Api.post(`${endpoints.NOTIFICATION}/${id}/read`);
      const data = await resp.data;
      return { ...data, id };
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  list: [],
  latesNotifications: [],
  pagination: {},
  isLoading: false,
  success: "",
  isSuccess: false,
  isError: false,
  error: null,
};

export const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.success = action.payload.message;
      state.pagination = { ...state.pagination, isRead: true };
      let latestNotifications = state.latesNotifications.pop();
      state.latesNotifications = [
        action.payload.data,
        ...state.latesNotifications,
      ];
    });
    builder.addCase(fetchNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.success = action.payload.message;
      state.list = action.payload.data.notifications;
      state.pagination = {
        totalPages: action.payload.data.totalPages,
        pageSize: action.payload.data.pageSize,
        currentPage: action.payload.data.currentPage,
        results: action.payload.data.results,
        isRead: action.payload.data.isUnreadMessageExist,
      };
    });
    builder.addCase(fetchLatestNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.latesNotifications = action.payload.data.notifications;
      state.pagination = {
        totalPages: action.payload.data.totalPages,
        pageSize: action.payload.data.pageSize,
        currentPage: action.payload.data.currentPage,
        results: action.payload.data.results,
        isRead: action.payload.data.isUnreadMessageExist,
      };
    });
    builder.addCase(readNotification.fulfilled, (state, action) => {
      const updatedNotifcationList = current(state).list.map(
        (notification, index) => {
          if (notification.id === action?.payload?.id) {
            return { ...notification, isRead: true };
          }
          return notification;
        }
      );
      state.list = updatedNotifcationList;
    });
    builder.addMatcher(
      isAnyOf(createNotification.rejected, fetchNotification.rejected),
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
      }
    );
    builder.addMatcher(
      isAnyOf(createNotification.pending, fetchNotification.pending),
      (state, action) => {
        state.isLoading = true;
      }
    );
  },
});

const { reducer } = NotificationSlice;
export const selectNotifications = (state) => state.notifications?.list;
export const selectPagination = (state) => state.notifications?.pagination;
export const selectLatestNotifications = (state) =>
  state.notifications?.latesNotifications;
export const selectIsLoading = (state) => state.notifications?.isLoading;
export const hasPendingNotifications = (state) => {
  if (!state.notifications?.isLoading) {
    return state.notifications?.pagination.isRead;
  }
};
export default reducer;
