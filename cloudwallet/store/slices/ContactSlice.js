import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import Api from "../../api";
import { endpoints } from "../../constants";

export const fetchContacts = createAsyncThunk(
  "contacts/fetch",
  async (meta, thunkAPI) => {
    try {
      const res = await Api.get(endpoints.CONTACT_BOOK, { params: meta });
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/add",
  async (Contact, thunkAPI) => {
    try {
      const res = await Api.post(endpoints.CONTACT_BOOK, Contact);
      const data = res.data;
      return data;
    } catch (error) {
      console.log("error 123", error);
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacta/delete",
  async (id, thunkAPI) => {
    try {
      const res = await Api.delete(endpoints.CONTACT_BOOK + `/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response?.data });
    }
  }
);
const initialState = {
  list: [],
  pagination: {},
  isLoading: false,
  isError: false,
  error: null,
  success: null,
};

export const ContactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    deleteSuccessMessage: (state, action) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      // const [contactBook, ...rest] = action.payload.data;
      state.isLoading = false;
      state.list = action.payload.data.contactBooks;
      state.pagination = {
        pageCount: action.payload.data.totalPages,
        pageIndex: action.payload.data.currentPage,
        pageSize: action.payload.data.pageSize,
        entries: action.payload.data.results,
      };
      state.success = null;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload?.message;
      state.list = [action.payload.data.contact, ...state.list];
      state.isError = false;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message;
    });
    builder.addMatcher(
      isAnyOf(fetchContacts.rejected, addContact.rejected),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error;
        state.isError = true;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
      (state, action) => {
        state.isLoading = true;
      }
    );
  },
});

export const { deleteSuccessMessage } = ContactSlice.actions;
const { reducer } = ContactSlice;

export const selectContacts = (state) => state.contacts.list;
export const selectContactMeta = (state) => state.contacts.pagination;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectError = (state) => state.contacts.error;
export const selectSuccess = (state) => state.contacts.success;
export const selectContactsOption = (state) => {
  const options = state.contacts.list.map((contact, index) => {
    return {
      label: `${contact.name} ${
        contact.walletAddress.slice(0, 5) +
        "..." +
        contact.walletAddress.slice(contact.walletAddress.length - 5)
      }`,
      value: contact.walletAddress,
    };
  });
  return options;
};
// export const selectModalProps = (state) => state.modal.props;

export default reducer;
