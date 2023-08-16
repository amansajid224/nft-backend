import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
  Button,
  Img,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../context/web3Context";
import {
  fetchContacts,
  selectContactsOption,
} from "../../store/slices/ContactSlice";
import {fetchNfts} from "../../store/slices/NftSlice";
import { closeModal } from "../../store/slices/ModalSlice";
import SelectTheme from "../Select";


export const TransferNftModal = ({ isOpen, nft }) => {
  const dispatch = useDispatch();
  const contactsOptions = useSelector(selectContactsOption);
  const { transferNft, isLoading } = useWeb3Context();
  const { account } = useWeb3Context();

  const methods = useForm({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;


  const inputValue = watch('walletAddress');

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
 useEffect(() => {
    dispatch(fetchContacts());
    }, [nft]);

  const onSubmit = async (data) => {
    try {
      await transferNft(
        nft?.tokenId,
        nft?.tokenAddress,
        account,
        data.walletAddress
      );

    } catch (error) {
      console.log(error);
    }
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
              Transfer NFT
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
              onClick={() => dispatch(closeModal())}
            />
            <ModalBody>
              <Stack direction="row">
                <Img src={nft?.image_url} w="50%" level={"H"} />
                <Flex w="100%" direction="column">
                  <Text textAlign="left">{nft?.name}</Text>
                  <FormControl
                    mt="auto"
                    isInvalid={errors?.walletAddress}
                    isRequired
                  >
                    <FormLabel>Wallet Address</FormLabel>
                    <SelectTheme
                      maxWidth={"230px"}
                      color={"#fff"}
                      type="creatAble"
                      options={contactsOptions}
                      name="walletAddress"
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
                    {inputValue && (account == inputValue) && (
                      <Text color="red" fontSize="14px">Please Enter a vallid Wallet Address</Text >
                    )}
                    {inputValue && (inputValue?.slice(0,2) !=='0x' || inputValue?.length<20) && (
                      <Text color="red" fontSize="14px">Please Enter a vallid Wallet Address</Text >
                    )}
                  </FormControl>
                </Flex>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                variant="outline"
                mr="15px"
                onClick={() => dispatch(closeModal())}
              >
                CANCEL
              </Button>
              <Button type="submit" isDisabled={isLoading || (account == inputValue) || !inputValue || (inputValue.slice(0,2) !=='0x' || inputValue.length<20)} variant="solid">
                {isLoading && <Spinner size="sm" color={'#fff'} mr={'10px'} />}
                TRANSFER NOW
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};
