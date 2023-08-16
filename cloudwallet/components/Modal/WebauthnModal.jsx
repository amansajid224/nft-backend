import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { closeModal } from "../../store/slices/ModalSlice";
import { setToLocalStorage } from "../../utils";

const WebauthnModal = ({ isOpen }) => {
  // const methods = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const { generatePasskey, dismissPasskey } = useAuth();
  const handleClose = () => {
    dismissPasskey();
    dispatch(closeModal());
  };
  return (
    <Modal
      size={"xs"}
      marginLeft="50px"
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <FormProvider>
        {/* <form action="" type="post" onSubmit={handleSubmit(onSubmit)}> */}
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
            Use a passkey for stronger security
          </ModalHeader>
          <ModalCloseButton
            fontSize={"15px"}
            mt={2}
            _focus={{ boxShadow: "none" }}
            color={"#ada7b7"}
            onClick={() => dispatch(closeModal())}
          />
          <ModalBody>
            {/* <FormControl mb={"24px"} isInvalid={errors?.email}>
              <FormLabel>Email</FormLabel>
              <Input
                size="lg"
                placeholder="Enter your Email"
                _placeholder={{ opacity: 1, color: "#5C498E" }}
                type="text"
                name="email"
                {...register("email", {
                  required: true,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email && (
                <FormErrorMessage>{errors?.email.message}</FormErrorMessage>
              )}
            </FormControl> */}
            Passkey provides better protection then passwords. All you need is
            your phone.
          </ModalBody>

          <ModalFooter flexDirection="column-reverse">
            <Button colorScheme="blue" onClick={handleClose} w="100%">
              No thanks
            </Button>
            <Button
              type="submit"
              variant="solid"
              w="100%"
              onClick={() => generatePasskey()}
              mb={2}
            >
              Create a passkey
            </Button>
          </ModalFooter>
        </ModalContent>
        {/* </form> */}
      </FormProvider>
    </Modal>
  );
};

export default WebauthnModal;
