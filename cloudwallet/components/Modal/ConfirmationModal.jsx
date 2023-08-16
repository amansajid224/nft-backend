import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/ModalSlice";

const ConfirmationModal = ({
  isOpen,
  handleAction,
  title,
  message,
  cancelLabel,
  actionLabel,
  ...rest
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg={"#241446"}
        borderRadius={"24px"}
        border={"1px solid"}
        borderColor={"#3B2864"}
        p={"25px"}
        className={"ModalCentered"}
      >
        <ModalHeader
          mb={"20px"}
          p={0}
          className={"Archivo"}
          fontSize={"24px"}
          fontWeight={"bold"}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          fontSize={"15px"}
          mt={2}
          _focus={{ boxShadow: "none" }}
          color={"#ada7b7"}
        />
        <ModalBody p={0} mb={"24px"}>
          <Text fontSize={"14px"}>{message}</Text>
        </ModalBody>
        <ModalFooter p={0}>
          <Button
            onClick={() => dispatch(closeModal())}
            variant="outline"
            size="lg"
            mr="10px"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              handleAction();
            }}
            variant="solid"
            size="lg"
          >
            {actionLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ConfirmationModal;
