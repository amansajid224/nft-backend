import { createColumnHelper } from "@tanstack/table-core";
import DataTable from "../../components/DataTable";
import BTCCurrency from "../../public/btc-currency.png";
import ETHCurrency from "../../public/eth-currency.png";
import {
  Flex,
  Avatar,
  Text,
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuItem,
  Heading,
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
  Spinner,
  Box,
  Image,
  Divider,Center
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDefaultTokens,
  fetchTokens,
  selectIsLoading,
  selectTokenMeta,
} from "../../store/slices/TokenSlice";
import moment from "moment";
import { closeModal, openModal } from "../../store/slices/ModalSlice";
import { messages } from "../../constants";
import { useTableContext } from "../../context/TableContext";
import { SearchIcon } from "@chakra-ui/icons";
import { selectTokens } from "../../store/slices/TokenSlice";
import { fetchContacts } from "../../store/slices/ContactSlice";
import { useWeb3Context } from "../../context/web3Context";
import Link from "next/link";
import { result } from "lodash-es";
import { UseTokenBalance } from "../../utils";
import axios from "axios";
import { transferApi } from "../../api/notifications/Transfer";
import WalletButton from "../../pages/tokens/walletButton";
import {fetchTransferHistory} from "../../store/slices/NftSlice";

export const TokenTable = () => {
  const tokens = useSelector(selectTokens);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const meta = useSelector(selectTokenMeta);
  const [limit, setLimit] = useState(null);
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState("");
  const { getTokenBalance } = useWeb3Context();
  const [balance, setBalance] = useState(0);
  const { tokenBalances,tokenBalance } = UseTokenBalance();
  const { account, connect } = useWeb3Context();
  const [tokenSorting,setTokenSorting]=useState(true)

  /*DataTable*/
  const transferToken = (tokenName, tokenAddress) => {
    dispatch(
      openModal({
        modal: "TransferTokenModal",
        props: { isOpen: true, tokenName, tokenAddress },
      })
    );
  };
  const handleColumnSort = (sortBy,sortOrder) => {
    dispatch(fetchTokens({ page, limit, q: search,sortOrder,sortBy }));

  };

  const tokenColumns = [
    {
      header: "Token",
      accessorKey: "name",
      cell: (info) => {
        return (
          <Link
            href={{
              pathname: "/tokens/details/",
              query: {
                tokenAddress: info.row.original.contractAddress,
                name: info.getValue(),
                id: info.row.original.id,
              },
            }}
          >
            <Flex alignItems={"center"}>
              <Image
                borderRadius={"50px"}
                boxSize={"35px"}
                me={"8px"}
                src={info.row.original.tokenImage}
                name={info.getValue()}
              />
              <Text fontSize={"16px"}>{info.getValue()}</Text>
            </Flex>
          </Link>
        );
      },
    },
    {
      header: "Balance",
      accessorKey: "balance",
      cell: (info) => {
        return (
          <>
            {tokenBalances[info.row.original.contractAddress] ? (
              <Text fontSize={"16px"}>
                {parseFloat( tokenBalances[info.row.original.contractAddress])?.toFixed(4)}{" "}                {info.row.original.symbol}
              </Text>
            ) : (
              <Text fontSize={"16px"}>0</Text>
            )}
          </>
        );
      },
    },
    {
      header: "USD Value",
      accessorKey: "isActive",
      cell: (info) => {
        return (
          <>
            <Text fontSize={"16px"}>N/A</Text>
          </>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "_id",
      cell: (info) => {
        return (
            <Flex>

          <Button
            variant="link"
            color={"#9FC131"}
            fontSize={"16px"}
            textDecoration="none"
            _hover={{
              textDecoration: "none",
            }}
            _focus={{
              color: "#9FC131",
            }}
            onClick={() =>
              dispatch(
                openModal({
                  modal: "RecieveTokenModal",
                  props: {
                    contractAddress: info.row.original.contractAddress,
                    setBalance,
                  },
                })
              )
            }
          >
            RECEIVE
          </Button>
              <Center height='25px' px={4}>
                <Divider orientation='vertical' />
              </Center>
              <Button
                  variant="link"
                  color={"#9FC131"}
                  fontSize={"16px"}
                  textDecoration="none"
                  _hover={{
                    textDecoration: "none",
                  }}
                  _focus={{
                    color: "#9FC131",
                  }}
                  onClick={() =>
                      transferToken(
                          info.row.original.symbol,
                          info.row.original.contractAddress
                      )
                  }
                  isDisabled={
                    tokenBalances[info.row.original.contractAddress] > 0
                        ? false
                        : true
                  }
              >
                {tokenBalances[info.row.original.contractAddress] ? (

                    ' TRANSFER'
                ) : (
                    <Flex justifyContent="center">
                      <Spinner />
                    </Flex>
                )}
              </Button>
            </Flex>
        );
      },
    },
  ];
  const getTokens = (page, limit) => {
    setLimit(limit);
    setPage(page);
  };

  useEffect(() => {
    if (account) {
      dispatch(fetchDefaultTokens());
    }
  }, [account]);
  useEffect(() => {
    if (page || limit || search) {
      dispatch(fetchTokens({ page, limit, q: search }));
    }
  }, [page, search, limit,tokenBalance]);


  return (
    <>
      <Flex mb={"17px"} direction={{ sm: "column", md: "row" }}>
        <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
        >
          Tokens
        </Heading>
        <FormControl
          maxW={{ sm: "100%", md: "300px" }}
          mb={["24px", "24px", "0", "0"]}
        >
          <InputGroup size="md">
            <Input
              pl="2.5rem"
              type="text"
              value={search}
              placeholder="Search"
              _placeholder={{ opacity: 1, color: "#5C498E" }}
              onChange={(e) => {
                setTimeout(setSearch(e.target.value), 5000);
              }}
            />
            <InputLeftElement width="2.5rem">
              <SearchIcon color={"#5C498E"} />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
        <Button
          ml={{ sm: "0", md: "16px" }}
          mb={["24px", "24px", "0", "0"]}
          variant="outline"
          size="lg"
          onClick={() => dispatch(openModal({ modal: "AddTokenModal" }))}
        >
          Add Token
        </Button>
      </Flex>
      <DataTable
          data={tokens}
          arrow={tokenSorting}
          columns={tokenColumns}
          meta={meta}
          isPagination={true}
          isLoading={isLoading}
          onSorting={handleColumnSort}
          fetchData={({ page, limit }) => getTokens(page, limit)}
      />
    </>
  );
};
