import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";
import TokenReducer from "./slices/TokenSlice";
import ContactReducer from "./slices/ContactSlice";
import NotificationReducer from "./slices/NotificationSlice";
import NftReducer from "./slices/NftSlice";
import DappReducer from "./slices/DappSlice";
import MobileWalletSlice from "./slices/mobileWalletSlice";

const store = configureStore({
  reducer: {
    modal: ModalReducer,
    tokens: TokenReducer,
    contacts: ContactReducer,
    notifications: NotificationReducer,
    nfts: NftReducer,
    dapps: DappReducer,
    mobileWallet:MobileWalletSlice
  },
  devTools: true,
});

export default store;
