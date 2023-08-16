import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {Stack, Box, FormErrorMessage, Text} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  selectContactMeta,
  addContact,
  fetchContacts,
  selectIsLoading,
} from "../../store/slices/ContactSlice";
import { closeModal } from "../../store/slices/ModalSlice";
import SelectTheme from "../Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { addContactSchema } from "../../validations/contactValidations";

const AddContactModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectIsLoading);
  const meta = useSelector(selectContactMeta);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(addContactSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = methods;
  const onSubmit = (data) => {
    dispatch(addContact(data)).then(() => {
      dispatch(fetchContacts({ page: meta?.pageIndex, limit: meta?.pageSize }));
      dispatch(closeModal());
    });
  };
  const inputValue = watch(['walletAddress']);

  return (
    <Modal
      size={"3xl"}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <FormProvider {...methods}>
        <form action="" type="post" onSubmit={handleSubmit(onSubmit)}>
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
              Add Contact
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Box width="100%">
                <FormControl mb={"24px"} isInvalid={errors.name} isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    size="lg"
                    placeholder="User Name"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  mb={"24px"}
                  isInvalid={errors.addressType}
                  isRequired
                >
                  <FormLabel>Address Type</FormLabel>

                  <SelectTheme
                    options={[
                      { value: "contact-type", label: "Wallet" },
                    ]}
                    defaultValue={{value: "contact-type", label: "Wallet" }}
                    name="addressType"
                    isInvalid={errors.addressType}
                    placeholder="Select address type"
                    onChange={(e) => {
                      setValue("addressType", e.value);
                      if (errors.addressType) {
                        clearErrors("addressType");
                      }
                    }}
                  />
                  {errors.addressType && (
                    <FormErrorMessage>
                      {errors.addressType.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  mb={"24px"}
                  isInvalid={errors.walletAddress}
                  isRequired
                >
                  <FormLabel>Wallet Address</FormLabel>
                  <Input
                    size="lg"
                    placeholder="Wallet Address"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="walletAddress"
                    {...register("walletAddress")}
                  />
                  {errors.walletAddress && (
                    <FormErrorMessage>
                      {errors.walletAddress.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                {/*<FormControl mb={"24px"} isInvalid={errors.email} isRequired>*/}
                {/*  <FormLabel>Email</FormLabel>*/}
                {/*  <Input*/}
                {/*    size="lg"*/}
                {/*    placeholder="Your Email"*/}
                {/*    _placeholder={{ opacity: 1, color: "#5C498E" }}*/}
                {/*    type="text"*/}
                {/*    name="email"*/}
                {/*    {...register("email")}*/}
                {/*  />*/}
                {/*  {errors.email && (*/}
                {/*    <FormErrorMessage>{errors.email.message}</FormErrorMessage>*/}
                {/*  )}*/}
                {/*</FormControl>*/}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => dispatch(closeModal())}
              >
                Close
              </Button>
              <Button type="submit" variant="solid" isDisabled={!inputValue[0] || inputValue[0].slice(0,2) !=='0x' || inputValue[0].length<20}>
                SAVE CHANGES
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default AddContactModal;
