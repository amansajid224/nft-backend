import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../context/web3Context";
import { closeModal } from "../../store/slices/ModalSlice";
import {
  setTokenBalance,
  setTokensBalances,
} from "../../store/slices/TokenSlice";
export const RecieveTokenModal = ({ isOpen, contractAddress }) => {
  const dispatch = useDispatch();
  const { getTokenBalance } = useWeb3Context();
  const tokenBalances = useSelector((state) => state.tokens.tokenBalances);
  const methods = useForm({
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;
  
  const inputValue = watch('tokenAddress');

  const onSubmit = (data) => {
    getTokenBalance(data.tokenAddress).then((result) => {
      const updatedTokenBalances = { ...tokenBalances };
      updatedTokenBalances[data.tokenAddress] = result;
      dispatch(setTokensBalances({ tokenBalances: updatedTokenBalances }));
      dispatch(setTokenBalance({ tokenBalance: result }));
      dispatch(closeModal());
    });
  };
  
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
              Receive Funds
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Address</FormLabel>
                <Input
                  onChange={(event) => console.log(event.target.value)}
                  size="lg"
                  placeholder="Token Address"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="tokenAddress"
                  {...register("tokenAddress")}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => dispatch(closeModal())}
              >
                CANCEL
              </Button>
              <Button type="submit" variant="solid" isDisabled={!inputValue || inputValue.slice(0,2) !=='0x' || inputValue.length<20}>
                CONFIRM
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};
