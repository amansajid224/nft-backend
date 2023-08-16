import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { TokenTransferHistory } from "../../containers/table/tokenTransferHistory";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { openModal } from "../../store/slices/ModalSlice";
import { fetchTokens, selectTokens } from "../../store/slices/TokenSlice";
import { UseTokenBalance } from "../../utils";
import { isEmpty } from "@chakra-ui/utils";
import { useWeb3Context } from "../../context/web3Context";

export default function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tokenAddress, name, id } = router.query;
  const tokens = useSelector(selectTokens);
  const [tokenDetail, setTokenDetail] = useState({});
  const { tokenBalance } = UseTokenBalance(tokenAddress);
  const { account } =
  useWeb3Context();
  const recieveToken = (contractAddress) => {
    dispatch(
      openModal({
        modal: "RecieveTokenModal",
        props: {
          contractAddress: contractAddress,
        },
      })
    );
  };
  const transferToken = (tokenName, tokenAddress) => {
    dispatch(
      openModal({
        modal: "TransferTokenModal",
        props: { isOpen: true, tokenName, tokenAddress },
      })
    );
  };
  useEffect(() => {
    if ([router.isReady]) {
      const token = tokens.find((token) => token.id == id);
      setTokenDetail(token);
    }
  }, [tokens, router.isReady]);
  useEffect(() => {
    if (tokens.length === 0) {
      dispatch(fetchTokens());
    }
  }, [tokens]);
  return (
    <>
      {tokenDetail?.id && tokenDetail?.contractAddress ? (
        <>
          <Box flex="1">
            {account && <Flex
              alignItems={"center"}
              borderBottom={"1px solid"}
              borderColor={"#3B2864"}
              mb={"30px"}
              pb={"17px"}
              flexWrap={'wrap'}
            >
              <Button
                me={"16px"}
                p={"0"}
                w={"40px"}
                h={"40px"}
                variant="outline"
                size="lg"
                onClick={() => router.back()}
              >
                <ArrowBackIcon boxSize={26} />
              </Button>
              <Flex mr={"auto"} alignItems={"center"}>
                <Avatar
                  boxSize={"40px"}
                  me={"15px"}
                  src={tokenDetail?.tokenImage}
                  alt={"Token Icon"}
                />
                <Heading me={"20px"} as={"h2"} size={"lg"}>
                  {tokenDetail?.name}
                </Heading>
                <Text me={"10px"} fontStyle={"600"}>
                </Text>
                <Heading
                  mr={"auto"}
                  mb={["20px", "20px", "0", "0"]}
                  as={"h3"}
                  size={"md"}
                >
                  {!isEmpty(tokenDetail) && tokenBalance ? (
                    Number(tokenBalance).toFixed(4)
                  ) : (
                    <Spinner />
                  )}
                </Heading>
              </Flex>
              <Button
                me={"16px"}
                variant="outline"
                size="lg"
                onClick={() => recieveToken(tokenAddress)}
              >
                RECEIVE
              </Button>
              <Button
                variant="solid"
                size="lg"
                onClick={() => transferToken(name, tokenAddress)}
                isDisabled={tokenBalance ? false : true}
              >
                Transfer
              </Button>
            </Flex>}
            <TokenTransferHistory tokenBalance={tokenBalance} />
          </Box>
        </>
      ) : (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
}
