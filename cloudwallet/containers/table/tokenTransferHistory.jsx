import {
  Flex,
  Text,
  Heading,
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataTable from "../../components/DataTable";
import { useWeb3Context } from "../../context/web3Context";
import {truncateFromMiddle, UseTokenBalance} from "../../utils";
import moment from "moment";
import { SearchIcon } from "@chakra-ui/icons";
import Api from "../../api";
import { endpoints } from "../../constants";
import  WalletButton  from "../../pages/tokens/walletButton"

export const TokenTransferHistory = ({tokenBalance}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tokenAddress } = router.query;
  const [tokenDetail, setTokenDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { convertToEther, account } = useWeb3Context();
  const [search, setSearch] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getTokenTransferHistory = (data) => {
    setLimit(data.limit);
    setPage(data.page);
  };
  const handleColumnSort = (sortBy,sortOrder) => {
    fetchTokenDetail(sortBy,sortOrder);
  };
  const fetchTokenDetail = async (sortBy,sortOrder) => {
    try {
      const resp = await Api.get(
          `${endpoints.TOKENS_DETAIL}/${tokenAddress}/${account}`,
          {
            params: { limit, page, q: search,sortBy,sortOrder },
          }
      );
      const data = await resp.data;
      setTokenDetail(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      fetchTokenDetail();
    }
  }, [router.isReady, page, limit, search,tokenBalance]);
  const columns = [
    {
      header: "Txn #",
      accessorKey: "tx_id",
      cell: (info) => {
        return <Text fontSize={'16px'}>{truncateFromMiddle(info.getValue(), 11, "...")}</Text>;
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (info) => {
        const date = moment(info.getValue());
        return <Text fontSize={'16px'}>{date.format("YY-MM-DD hh:mm")}</Text>;
      },
    },
    {
      header: "From",
      accessorKey: "from",
      cell: (info) => {
        return <Text fontSize={'16px'}>{truncateFromMiddle(info.getValue(), 11, "...")}</Text>;
      },
    },
    {
      header: "To",
      accessorKey: "to",
      cell: (info) => {
        return <Text fontSize={'16px'}>{truncateFromMiddle(info.getValue(), 11, "...")}</Text>;
      },
    },
    {
      header: "Txn Fee",
      accessorKey: "transaction_fee",
      cell: (info) => {
        return (
            <Text fontSize={'16px'}>{Number(convertToEther(info.getValue())).toFixed(4)}</Text>
        );
      },
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: (info) => {
        return (
            <Flex alignItems={"center"}>
              <Text fontSize={'16px'}>{Number(convertToEther(info.getValue())).toFixed(4)}</Text>
            </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex mb={"17px"} direction={{ sm: "column", md: "row" }}>
        <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
        >
          Transfer History
        </Heading>
        <FormControl
          maxW={{ sm: "100%", md: "300px" }}
          mb={["24px", "24px", "0", "0"]}
        >
          <InputGroup size="md">
            <Input
              pl="2.5rem"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setTimeout(setSearch(e.target.value), 500);
              }}
              _placeholder={{ opacity: 1, color: "#5C498E" }}
            />
            <InputLeftElement width="2.5rem">
              <SearchIcon color={"#5C498E"} />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
      </Flex>
      {tokenDetail?.transactionDetails && account ? (
        <DataTable
          data={tokenDetail?.transactionDetails}
          isLoading={isLoading}
          columns={columns}
          meta={{
            pageCount: tokenDetail?.totalPages,
            entries: tokenDetail?.results,
            pageSize: tokenDetail?.pageSize,
            pageIndex: tokenDetail?.currentPage,
          }}
          isPagination={true}
          onSorting={handleColumnSort}
          fetchData={(data) => getTokenTransferHistory(data)}
        />
      ) : (
        isLoading ? <Flex justifyContent="center">
        <Spinner />
      </Flex> : <WalletButton />
      )}
    </>
  );
};
