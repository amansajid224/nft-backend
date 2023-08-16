import { useSelector } from "react-redux";
import { selectModal } from "../../store/slices/ModalSlice";
import { selectModalProps } from "../../store/slices/ModalSlice";
import EditProfileModal from "./EditProfileModal";
import TwoFactorAuthModal from "./TwoFactorAuthModal";
import ConfirmationModal from "./ConfirmationModal";
import AddContactModal from "./AddContactModal";
import AddTokenModal from "./AddTokenModal";
import AddCustomTokenModal from "./AddCustomTokenModal";
import TransferTokenModal from "./TransferTokenModal";
import ExportQrCodeModal from "./ExportQrCodeModal";
import WebauthnModal from "./WebauthnModal";
import { RecieveTokenModal } from "./RecieveTokenModal";
import { TransferNftModal } from "./TransferNftModal";

const modalComponentLookupTable = {
  EditProfileModal,
  TwoFactorAuthModal,
  ConfirmationModal,
  AddContactModal,
  AddTokenModal,
  AddCustomTokenModal,
  TransferTokenModal,
  ExportQrCodeModal,
  WebauthnModal,
  RecieveTokenModal,
  TransferNftModal,
};
const ModalManager = () => {
  const currentModals = useSelector(selectModal);
  const modalProps = useSelector(selectModalProps);
  return (
    <>
      {currentModals?.map((modalType, index) => {
        const ModalComponent = modalComponentLookupTable[modalType];
        return (
          <ModalComponent
            {...modalProps}
            key={modalType + index}
            isOpen="true"
          />
        );
      })}
    </>
  );
};

export default ModalManager;
