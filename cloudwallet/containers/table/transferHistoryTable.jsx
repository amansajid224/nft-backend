import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { isEmpty } from "lodash-es";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import {
  fetchTransferHistory,
  selectIsLoading,
  selectTransactionHistory,
} from "../../store/slices/NftSlice";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import {useWeb3Context} from "../../context/web3Context";

export const NftTransferHistoryTable = ({ id, tokenAddress }) => {
  const transferHistory = useSelector(selectTransactionHistory);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const { convertToEther, account } = useWeb3Context();
  const getTransferHistory = (data) => {
    setLimit(data.limit);
    setPage(data.page);
  };
  const handleColumnSort = (sortBy,sortOrder) => {
    dispatch(
        fetchTransferHistory({
          id,
          tokenAddress,
          meta: { limit, page, q: search,sortOrder,sortBy },
        })
    );
  };
  useEffect(() => {
    if (id && tokenAddress) {
      if (limit || page) {
        dispatch(
          fetchTransferHistory({
            id,
            tokenAddress,
            meta: { limit, page, q: search },
          })
        );
      }
    }
  }, [limit, page, search, id, tokenAddress]);

  const transferColumns = [
    {
      header: "Txn #",
      accessorKey: "txID",
      cell: (info) => {
        return (
          <Text>
            {info?.getValue()?.slice(0, 6) +
              "..." +
              info?.getValue()?.slice(info?.getValue()?.length - 6)}
          </Text>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (info) => {
        return <Text>
          {moment(info?.getValue()).format(
              "YY-MM-DD hh:mm"
          )}</Text>;
      },
    },
    {
      header: "From",
      accessorKey: "from",
      cell: (info) => {
        return (
          <Text>
            {info?.getValue()?.slice(0, 5) +
              "..." +
              info?.getValue()?.slice(info?.getValue()?.length - 5)}
          </Text>
        );
      },
    },
    {
      header: "To",
      accessorKey: "to",
      cell: (info) => {
        return (
          <Text>
            {info?.getValue()?.slice(0, 5) +
              "..." +
              info?.getValue()?.slice(info?.getValue()?.length - 5)}
          </Text>
        );
      },
    },
    {
      header: "Txn Fee",
      accessorKey: "transaction_fee",
      cell: (info) => {
        return <Text>
          {info.getValue()==null ? '0':
            Number(convertToEther(info.getValue())).toFixed(4)}
          </Text>;
      },
    },

    // {
    //   header: "status",
    //   accessorKey: "status",
    //   cell: (info) => {
    //     return <Text>Completed</Text>;
    //   },
    // },
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
      {!isEmpty(transferHistory) && (
        <DataTable
          data={transferHistory?.transferHistory}
          columns={transferColumns}
          isLoading={isLoading}
          meta={{
            pageCount: transferHistory?.totalPages,
            entries: transferHistory?.results,
            pageSize: transferHistory?.pageSize,
            pageIndex: transferHistory?.currentPage,
          }}
         onSorting={handleColumnSort}
          isPagination={true}
          fetchData={(data) => getTransferHistory(data)}
        />
      )}
    </>
  );
};
