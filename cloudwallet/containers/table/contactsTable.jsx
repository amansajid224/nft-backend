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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  selectContacts,
  selectContactMeta,
  selectIsLoading,
  fetchContacts,
} from "../../store/slices/ContactSlice";
import moment from "moment";
import { closeModal, openModal } from "../../store/slices/ModalSlice";
import { messages } from "../../constants";
import { useTableContext } from "../../context/TableContext";
import { SearchIcon } from "@chakra-ui/icons";
import { selectPagination } from "../../store/slices/NotificationSlice";

export const ContactsTable = () => {
  const contancts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const meta = useSelector(selectContactMeta);
  const dispatch = useDispatch();
  const { setGlobalFilter, globalFilter } = useTableContext();
  const [limit, setLimit] = useState(null);
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState("");

  const getContacts = (data) => {
    setLimit(data.limit);
    setPage(data.page);
  };
  /*DataTable*/
  const handleColumnSort = (sortBy,sortOrder) => {
    dispatch(fetchContacts({ limit, page, q: search , sortOrder , sortBy }));
  };

  const contactsColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => {
        return (
          <Flex alignItems={"center"}>
            <Avatar boxSize={"40px"} me={"8px"} src="" name={info.getValue()} />
            <Text>{info.getValue()}</Text>
          </Flex>
        );
      },
    },
    {
      header: "Wallet Address",
      accessorKey: "walletAddress",
      cell: (info) => {
        const walletAddress = info.getValue();
        return (
          walletAddress
        );
      },
    },
    // {
    //   header: "Email",
    //   accessorKey: "email",
    //   cell: (info) => {
    //     return info.getValue();
    //   },
    // },
    // {
    //   header: "Date",
    //   accessorKey: "createdAt",
    //   cell: (info) => {
    //     return moment(info.getValue()).format("YY-MM-DD hh:mm");
    //   },
    // },

    // {
    //   header: "Status",
    //   accessorKey: "isActive",
    //   cell: (info) => {
    //     return info.getValue() ? "Active" : "Inactive";
    //   },
    // },

    {
      header: "Action",
      accessorKey: "_id",
      cell: (info) => {
        const userName = info.row.original.name;
        const walletAddress = info.row.original.walletAddress;
        return (
          <Button
            variant="link"
            onClick={() => {
              dispatch(
                openModal({
                  modal: "ConfirmationModal",
                  props: {
                    isOpen: true,
                    title: messages["confirmation_modal"]?.title,
                    message: `You are going to remove “${userName}” from your contact list with wallet address “${
                      walletAddress?.slice(0, 5) +
                      "..." +
                      walletAddress?.slice(-5)
                    }”`,
                    actionLabel: messages["confirmation_modal"]?.actionLabel,
                    cancelLabel: messages["confirmation_modal"].cancelLabel,
                    handleAction: () => deleteContactFn(info.row.original.id),
                  },
                })
              );
            }}
          >
            DELETE
          </Button>
        );
      },
    },
    // {
    //   header: "",
    //   accessorKey: "_id",
    //   cell: (info) => {
    //     return (
    //       <Menu>
    //         <MenuButton bg={"none"} border={"none"} as={Button} variant="link">
    //           <Icon
    //             fill="#ada7b7"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="4px"
    //             height="18px"
    //             viewBox="0 0 4 18"
    //           >
    //             <g transform="translate(-1546 -861)">
    //               <path
    //                 d="M2,4A2,2,0,1,0,0,2,2.006,2.006,0,0,0,2,4Z"
    //                 transform="translate(1546 861)"
    //               />
    //               <path
    //                 d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
    //                 transform="translate(1546 868)"
    //               />
    //               <path
    //                 d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
    //                 transform="translate(1546 875)"
    //               />
    //             </g>
    //           </Icon>
    //         </MenuButton>
    //         <MenuList
    //           bg={"#140533"}
    //           border={"solid 1px"}
    //           borderColor={"#3B2864"}
    //           textTransform={"uppercase"}
    //           rounded="lg"
    //           py={2}
    //           minWidth="90px"
    //         >
    //           <MenuItem>VIEW DETAILS</MenuItem>
    //         </MenuList>
    //       </Menu>
    //     );
    //   },
    // },
  ];
  const deleteContactFn = (id) => {

    dispatch(deleteContact(id)).then(() => {
      dispatch(closeModal())
      dispatch(fetchContacts({ page: meta?.pageIndex, limit: meta?.pageSize }));
    });

  };
  useEffect(() => {
    if (limit || page) {
      dispatch(fetchContacts({ limit, page, q: search }));
    }
  }, [limit, page, search]);
  return (
    <>
      <Flex mb={"17px"} direction={{ sm: "column", md: "row" }}>
        <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
        >
          Contacts
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
        <Button
          ml={{ sm: "0", md: "16px" }}
          mb={["24px", "24px", "0", "0"]}
          variant="outline"
          size="lg"
          onClick={() => dispatch(openModal({ modal: "AddContactModal" }))}
        >
          Add Contact
        </Button>
      </Flex>
      <DataTable
        data={contancts}
        columns={contactsColumns}
        isLoading={isLoading}
        meta={meta}
        isPagination={true}
        onSorting={handleColumnSort}
        fetchData={(data) => getContacts(data)}
      />
    </>
  );
};
