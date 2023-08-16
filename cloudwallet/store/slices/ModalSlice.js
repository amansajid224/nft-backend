import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "modal",
  initialState: { modal: [], props: {} },
  reducers: {
    openModal: (state, action) => {
      if (state.modal.includes(action.payload?.modal)) {
      } else {
        state.modal = state.modal.concat(action.payload?.modal);
        if (action.payload?.props) {
          state.props = action.payload.props;
        }
      }
    },
    closeModal: (state) => {
      state.modal.pop();
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
const { reducer } = ModalSlice;

export const selectModal = (state) => state.modal.modal;
export const selectModalProps = (state) => state.modal.props;

export default reducer;
