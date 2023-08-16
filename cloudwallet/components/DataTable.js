import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
  Flex,
  Center,
  Spinner,
  Input,
  Box,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import SelectTheme from "./Select";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";

import { Pageinator } from "./Paginator";

const DataTable = ({
  data,
  columns,
  isLoading,
  meta,
  isPagination,
  fetchData, onSorting,arrow
}) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },

    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: meta?.pageCount,
    autoResetPageIndex: false,
  });
  const { getHeaderGroups } = table;
  const [pageNumerLimt, setPageNumberLimit] = useState(6);
  const [maxPageNumber, setMaxPageNumber] = useState(20);
  const [minPageNumber, setMinPageNumber] = useState(0);
  const [activeColorA, setActiveColorA] = useState(0);
  const [activeColorD, setActiveColorD] = useState(0);
  const PageLength = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
  ];
  useEffect(() => {
    fetchData &&
      fetchData({
        limit: table.getState().pagination.pageSize,
        page: table.getState().pagination.pageIndex + 1,
      });
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
  ]);
  const activeColorButtonA=(id)=>{
    setActiveColorA(id);
    setActiveColorD(0);
  }
  const activeColorButtonD=(id)=>{
    setActiveColorD(id);
    setActiveColorA(0);
  }


  return (
    <>
      <TableContainer mb={"16px"} w={"100%"}>
        <Table border={"solid 1px"} borderColor={"#3B2864"}>
          <Thead bgColor="#3B2864">
            {getHeaderGroups().map((headerGroup) => {
              return (
                <>
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta;
                      return (
                        <Th
                          borderColor={"#3B2864"}
                          position="sticky"
                          key={header.id}
                          isNumeric={meta?.isNumeric}
                          style={{
                            width: header.column.columnDef.width,
                          }}
                        >
                          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>

                          <Text
                            variant="subtitleLabel"
                            textTransform={"capitalize"}
                            fontSize={"14px"}
                            color="#9FC131"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                            <Box as={'span'} pl="4"  >
                              { !arrow ?
                                  <>
                                    {
                                      header.column.columnDef.header === "Action" ? "" :
                                          <>
                                            <TriangleDownIcon aria-label="sorted descending" style={{
                                              color: activeColorA === header.id ? '#9FC131' : '',
                                              cursor:'pointer'
                                            }}  onClick={()=>{onSorting(header.id,"ASC"),activeColorButtonA(header.id)}} />
                                            <TriangleUpIcon aria-label="sorted ascending"
                                                            style={{
                                                              color: activeColorD === header.id ? '#9FC131' : '',
                                                              cursor:'pointer'
                                                            }}
                                                            onClick={()=>{onSorting(header.id,"DESC"),activeColorButtonD(header.id)}}  />
                                          </>
                                    }</>:''
                              }


                              {/*{header.column.getIsSorted() ? (*/}
                              {/*    header.column.getIsSorted() === "desc" ? (*/}
                              {/*        <TriangleDownIcon aria-label="sorted descending" />*/}
                              {/*    ) : (*/}
                              {/*        <TriangleUpIcon aria-label="sorted ascending" />*/}
                              {/*    )*/}
                              {/*) : null}*/}
                            </Box>
                          </Box>
                        </Th>
                      );
                    })}
                  </Tr>
                </>
              );
            })}
          </Thead>
          <Tbody bgColor="#241446">
            {/* {table.getRowModel().rows?.length === 0 && !isLoading && (
              <Tr>
                <Td colSpan={columns.length} border="none">
                  <Center w="100%">
                    <Text>No Record Found</Text>
                  </Center>
                </Td>
              </Tr>
            )} */}
            {/* {isLoading && (
              <Tr>
                <Td colSpan="10" border="none">
                  <Center w="100%">
                    <Spinner />
                  </Center>
                </Td>
              </Tr>
            )} */}
            {/*{console.log(*/}
            {/*  "isloading",*/}
            {/*  isLoading,*/}
            {/*  table.getRowModel().rows?.length*/}
            {/*)}*/}
            {isLoading && table.getRowModel().rows?.length === 0 ? (
              <Tr>
                <Td colSpan="10" border="none">
                  <Center w="100%">
                    <Spinner />
                  </Center>
                </Td>
              </Tr>
            ) : data?.length <= 0 ? (
              <Tr>
                <Td colSpan={columns.length} border="none">
                  <Center w="100%">
                    <Text>No Record Found</Text>
                  </Center>
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows?.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;
                    return (
                      <Td
                        borderColor={"#3B2864"}
                        key={cell.id}
                        isNumeric={meta?.isNumeric}
                        style={{
                          width: cell.column.columnDef.width,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {isPagination && (
        <Flex
          gap={"10px"}
          alignItems={"center"}
          direction={{ sm: "column", md: "row" }}
        >
          {/*<Flex*/}
          {/*  alignItems={"center"}*/}
          {/*  whiteSpace={"nowrap"}*/}
          {/*  fontSize={"16px"}*/}
          {/*  gap="2"*/}
          {/*>*/}
          {/*  Showing*/}
          {/*  <SelectTheme*/}
          {/*    options={PageLength}*/}
          {/*    isSearchable={false}*/}
          {/*    defaultValue={PageLength.find(*/}
          {/*      (page) =>*/}
          {/*        parseInt(page.value) === table.getState().pagination.pageSize*/}
          {/*    )}*/}
          {/*    onChange={(e) => {*/}
          {/*      table.setPageSize(e.value);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  of*/}
          {/*  <Text mx={"5px"} as={"Span"} color={"#9FC131"}>*/}
          {/*    {meta.entries}*/}
          {/*  </Text>*/}
          {/*  entries*/}
          {/*</Flex>*/}
          <Flex>
            {/*<Text mx={"5px"} as={"Span"} color={"#9FC131"}>*/}
            {/*    Total Entries = {meta.entries}*/}
            {/*    </Text>*/}
          </Flex>
          <Flex ml={{ sm: "0", md: "auto" }}>
            <Pageinator
              current={table.getState().pagination.pageIndex + 1}
              total={meta.entries}
              pageSize={table.getState().pagination.pageSize}
              onPageChange={(page) => {
                table.setPageIndex(page - 1);
              }}
            />
            {/* <Button
              _hover={{ bg: "#3B2864", color: "#fff" }}
              color={"#513D7B"}
              mr={"8px"}
              width={"40px"}
              height={"40px"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"solid 1px"}
              borderColor={"#3B2864"}
              borderRadius={"6px"}
              bg={"#1E103C"}
              onClick={() => {
                table.setPageIndex(0);
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftIcon fontSize={"18px"} />
            </Button>
            <Button
              _hover={{ bg: "#3B2864", color: "#fff" }}
              color={"#513D7B"}
              mr={"8px"}
              width={"40px"}
              height={"40px"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"solid 1px"}
              borderColor={"#3B2864"}
              borderRadius={"6px"}
              bg={"#1E103C"}
              onClick={() => {
                table.previousPage();
                console.warn(
                  table.getState().pagination.pageIndex % pageNumerLimt
                );
                if (table.getState().pagination.pageIndex !== 0) {
                  if (
                    table.getState().pagination.pageIndex % pageNumerLimt ===
                    0
                  ) {
                    setMaxPageNumber(maxPageNumber - pageNumerLimt);
                    setMinPageNumber(minPageNumber - pageNumerLimt);
                  }
                }
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon fontSize={"26px"} />
            </Button>

            {Array.from(Array(table.getPageCount()).keys(), (e, number) => {
              if (number <= maxPageNumber && number >= minPageNumber) {
                return (
                  <Button
                    _hover={{ bg: "#3B2864", color: "#fff" }}
                    color={
                      table.getState().pagination.pageIndex === number
                        ? "#fff"
                        : "#513D7B"
                    }
                    mr={"8px"}
                    width={"40px"}
                    height={"40px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={"solid 1px"}
                    borderColor={"#3B2864"}
                    borderRadius={"6px"}
                    bg={
                      table.getState().pagination.pageIndex === number
                        ? "#3B2864"
                        : "#1E103C"
                    }
                    key={number}
                    onClick={() => table.setPageIndex(number)}
                  >
                    {number + 1}
                  </Button>
                );
              } else {
                return null;
              }
            })}
            <Button
              _hover={{ bg: "#3B2864", color: "#fff" }}
              color={"#513D7B"}
              mr={"8px"}
              width={"40px"}
              height={"40px"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"solid 1px"}
              borderColor={"#3B2864"}
              borderRadius={"6px"}
              bg={"#1E103C"}
              onClick={() => {
                table.nextPage();
                if (table.getState().pagination.pageIndex >= maxPageNumber) {
                  setMaxPageNumber(maxPageNumber + pageNumerLimt);
                  setMinPageNumber(minPageNumber + pageNumerLimt);
                }
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon fontSize={"26px"} />
            </Button>

            <Button
              _hover={{ bg: "#3B2864", color: "#fff" }}
              color={"#513D7B"}
              mr={"8px"}
              width={"40px"}
              height={"40px"}
              justifyContent={"center"}
              alignItems={"center"}
              border={"solid 1px"}
              borderColor={"#3B2864"}
              borderRadius={"6px"}
              bg={"#1E103C"}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightIcon fontSize={"18px"} />
            </Button> */}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default DataTable;
