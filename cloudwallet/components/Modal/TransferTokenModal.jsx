import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../context/web3Context";
import { useWeb3React } from "@web3-react/core";
import {
  fetchContacts,
  selectContactsOption,
} from "../../store/slices/ContactSlice";
import { closeModal } from "../../store/slices/ModalSlice";
import { transferTokenValidations } from "../../validations/transferTokenValidations";
import SelectTheme from "../Select";
import { transferApi } from "../../api/notifications/Transfer";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { fetchLatestNotifications } from "../../store/slices/NotificationSlice";
import Cookies from "js-cookie";

const TransferTokenModal = ({ isOpen, tokenName, tokenAddress }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { account } = useWeb3React();
  const contactsOptions = useSelector(selectContactsOption);
  const {
    transeferTokenFn,
    error,
    transactionHash,
    setError,
    setTransactionHash,
    isLoading,
  } = useWeb3Context();
  const [tokenData, setTokenData] = useState();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(transferTokenValidations),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;
  
  const inputValue = watch(['amount','walletAddress']);

  const onSubmit = (data) => {
    setIsBtnLoading(true)
    try {
      transeferTokenFn(data?.walletAddress, data.amount, tokenAddress);
      setTokenData(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (error) {
      toast({
        title: error.message,
        isClosable: true,
        status: "error",
      });
      setError(null);
      dispatch(closeModal());
    }
  }, [error]);

  const tokenTransferNotif = async () => {
    try {
      const res = await transferApi({
        title: "Token transfered successfully!",
        description: ` ${tokenName} Transferred from  ${account
          .slice(0, 5)
          .toLowerCase()}...${account
          .slice(37, 42)
          .toLowerCase()} to  ${tokenData?.walletAddress
          .slice(0, 5)
          .toLowerCase()}...${tokenData?.walletAddress
          .slice(37, 42)
          .toLowerCase()} for ${tokenData.amount}`,
      });
      if (res) {
        dispatch(fetchLatestNotifications(5));
        Cookies.set("hasUnreadNotif", true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (transactionHash) {
      tokenTransferNotif();
      toast({
        title: "Transaction is completed successfully",
        isClosable: true,
        status: "success",
      });
      setTransactionHash(null);
      dispatch(closeModal());
    }
  }, [transactionHash]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={() => dispatch(closeModal())}>
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
              {`Transfer Token (${tokenName ? tokenName : ""})`}
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
              onClick={() => dispatch(closeModal())}
            />
            <ModalBody>
              <FormControl mb={"24px"} isInvalid={errors?.amount}>
                <FormLabel>Enter Amount</FormLabel>
                <NumberInput>
                  <NumberInputField
                    placeholder={`0.0 ${tokenName}`}
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="amount"
                    {...register("amount")}
                  />
                </NumberInput>
                {errors?.amount && (
                  <FormErrorMessage>{errors?.amount.message}</FormErrorMessage>
                )}
                {inputValue[0] && (inputValue[0] <0 || inputValue[0] == 0) && (
                  <Text color="red" fontSize="14px">Amount should be greater than 0</Text >
                )}
              </FormControl>
              <FormControl
                mb={"24px"}
                isInvalid={errors?.walletAddress}
                isRequired
              >
                <FormLabel>Address</FormLabel>
                <SelectTheme
                  color={"#fff"}
                  type="creatAble"
                  name="walletAddress"
                  options={contactsOptions}
                  isInvalid={errors.walletAddress}
                  onChange={(e) => {
                    setValue("walletAddress", e.value);
                    if (errors.addressType) {
                      clearErrors("addressType");
                    }
                  }}
                />
                {errors?.walletAddress && (
                  <FormErrorMessage>
                    {errors?.walletAddress.message}
                  </FormErrorMessage>
                )}
                {account == inputValue[1] && (
                  <Text color="red" fontSize="14px">Sender's and receiver's wallet address should not be same</Text >
                )}
                {inputValue[1] && (inputValue[1]?.slice(0,2) !=='0x' || inputValue[1]?.length<20) && (
                  <Text color="red" fontSize="14px">Please Enter a vallid Wallet Address</Text >
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Box display={"flex"} justifyContent={"start"}>
              </Box>

              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => dispatch(closeModal())}
              >
                CANCEL
              </Button>
              <Button type="submit" variant="solid" isDisabled={(inputValue[0] <=0) || (account == inputValue[1]) || (!inputValue[0] || !inputValue[1]) || (inputValue[1].slice(0,2) !=='0x' || inputValue[1].length<20)} isLoading={isBtnLoading}>
                {isLoading ? <Spinner size="sm" /> : ""}
                TRANSFER
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default TransferTokenModal;
