import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { isDisabled, isEmpty } from "@chakra-ui/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../api";
import { endpoints } from "../../constants";
import { closeModal } from "../../store/slices/ModalSlice";
import {
  createCustomTokens,
  fetchTokenAddressInfo,
  selectTokenInfo,
  fetchTokens,
  fetchDefaultTokens,
} from "../../store/slices/TokenSlice";
import { createTokenSchema } from "../../validations/tokenValidations";

const AddCustomTokenModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const btnRef = useRef();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(createTokenSchema),
    defaultValues: {
      contractAddress: "",
      symbol: "",
      decimalPlaces: "",
      name: "",
      tokenImage: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    control,
  } = methods;
  const contractAdressWatch = useWatch({ name: "contractAddress", control });
  const toast = useToast();
  const onSubmit = (data) => {
    const { decimalPlaces, ...rest } = data;
    dispatch(
      createCustomTokens({ ...rest, decimalPlaces: parseInt(decimalPlaces) })
    ).then((resp) =>{
      resp && dispatch(closeModal());
      toast({
        title: resp.payload.message,
        isClosable: true,
        status: "success",
      });}
    );
    document.getElementById("closeAllModal").click()
    setTimeout(()=>{dispatch(fetchDefaultTokens())},2000)
  };
  useEffect(() => {
    if (contractAdressWatch) {
      setIsDisabled(true);
      setTimeout(async () => {
        try {
          const resp = await Api.post(endpoints.TOKEN_ADDRESS_INFO, {
            contractAddress: contractAdressWatch,
          });
          const data = resp.data;
          if (data.status) {
            setValue("symbol", data?.data?.tokenSymbol);
            setValue("decimalPlaces", data?.data?.tokenDecimals);
            setValue("name", data?.data?.tokenName);
            setIsDisabled(false);
          }
        } catch (error) {
          toast({
            title: error?.response?.data?.message,
            isClosable: true,
            status: "error",
          });
        }
      }, 3000);
    } else {
      setValue("symbol", "");
      setValue("decimalPlaces", "");
      setValue("name", "");
    }
  }, [contractAdressWatch]);
  
  return (
    <>
      <Modal size={"xl"} isOpen={isOpen} onClose={() => {}}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <FormProvider>
          <form action="" onSubmit={handleSubmit(onSubmit)} type="post">
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
                Add Custom Token
              </ModalHeader>
              <ModalCloseButton
                fontSize={"15px"}
                mt={2}
                _focus={{ boxShadow: "none" }}
                color={"#ada7b7"}
                onClick={() => dispatch(closeModal())}
              />
              <ModalBody>
                <Box width="100%">
                  {/* <FileInput /> */}
                  <FormControl
                    mb={"24px"}
                    isInvalid={errors?.contractAddress}
                    isRequired
                  >
                    <FormLabel>Token Contract</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Token Contract"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="contractAddress"
                      onBlur={() => {
                        alert("blur");
                      }}
                      {...register("contractAddress")}
                    />
                    {errors?.contractAddress && (
                      <FormErrorMessage>
                        {errors?.contractAddress?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    mb={"24px"}
                    isInvalid={errors?.symbol}
                    isRequired
                  >
                    <FormLabel>Symbol</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Symbol"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="symbol"
                      {...register("symbol")}
                    />
                    {errors.symbol && (
                      <FormErrorMessage>
                        {errors.symbol.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    mb={"24px"}
                    isInvalid={errors?.decimalPlaces}
                    isRequired
                  >
                    <FormLabel>Decimals Places</FormLabel>
                    <Input
                      size="lg"
                      placeholder="18"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="number"
                      min="1"
                      max="18"
                      name="decimalPlaces"
                      {...register("decimalPlaces")}
                    />
                    {errors?.decimalPlaces && (
                      <FormErrorMessage>
                        {errors?.decimalPlaces?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl mb={"24px"} isInvalid={errors?.name} isRequired>
                    <FormLabel>Token Name</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Display Token Name"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="name"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <FormErrorMessage>
                        {errors?.name?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    mb={"24px"}
                    isInvalid={errors?.tokenImage}
                    isRequired
                  >
                    <FormLabel>Token Image</FormLabel>
                    <Input
                      size="lg"
                      placeholder="e.g IPFS, HASH / URL"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="tokenImage"
                      {...register("tokenImage")}
                    />
                    {errors?.tokenImage && (
                      <FormErrorMessage>
                        {errors?.tokenImage.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => dispatch(closeModal())}
                >
                  CANCEL
                </Button>
                <Button type="submit" isDisabled={isDisabled} variant="solid">
                  {isDisabled && <Spinner size="sm" mr={2} />}
                  ADD TOKEN
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddCustomTokenModal;
