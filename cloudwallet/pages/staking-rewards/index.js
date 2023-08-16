import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Circle,
  Image,
  Input,
  InputLeftElement,
  InputGroup,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import Header from "../../components/Header";
import Siderbar from "../../components/Siderbar";
import Head from "next/head";
import ProfileBar from "../../components/ProfileBar";
import BgWelcome from "../../public/banner-welcome.png";
import SlideLogo1 from "../../public/SlideLogo-1.png";
import SlideLogo2 from "../../public/SlideLogo-2.png";
import SlideLogo3 from "../../public/SlideLogo-3.png";
import SlideLogo4 from "../../public/SlideLogo-4.png";
import SlideLogo5 from "../../public/SlideLogo-5.png";
import SlideLogo6 from "../../public/SlideLogo-6.png";
import SlideLogo7 from "../../public/SlideLogo-7.png";
import SlideLogo8 from "../../public/SlideLogo-8.png";
import BTCCurrency from "../../public/btc-currency.png";
import ETHCurrency from "../../public/eth-currency.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import DataTable from "../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";

export default function Dashboard() {
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    swipeToSlide: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    //variableWidth: true
  };

  /*DataTable*/
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("Number", {
      cell: (info) => info.getValue(),
      header: "No.",
      /*meta: {
                isNumeric: true
            }*/
    }),
    columnHelper.accessor("Token", {
      cell: (info) => {
        return (
          <Flex alignItems={"center"}>
            <Image
              boxSize={"40px"}
              me={"8px"}
              src={info.getValue().tokenImg}
              alt={"Token Icon"}
            />
            <Text>{info.getValue().tokenName}</Text>
          </Flex>
        );
      },
      header: "Staked PYR",
    }),
    columnHelper.accessor("Transaction_ID", {
      cell: (info) => info.getValue(),
      header: "Transaction ID",
    }),
    columnHelper.accessor("Reward", {
      cell: (info) => info.getValue(),
      header: "Reward",
    }),
    columnHelper.accessor("Date", {
      cell: (info) => info.getValue(),
      header: "Date",
    }),
    columnHelper.accessor("Expiry", {
      cell: (info) => info.getValue(),
      header: "Expiry",
    }),
    columnHelper.accessor("Status", {
      cell: (info) => {
        /*return <Text color={'#9FC131'} fontSize={'14px'}>{info.getValue()}</Text>*/
        return (
          <>
            {info.getValue().ProcessingStatus !== "" ? (
              <Text color={"#25A7DE"}>{info.getValue().ProcessingStatus}</Text>
            ) : (
              ""
            )}
            {info.getValue().WithdrawStatus !== "" ? (
              <Text color={"#FF0000"}>{info.getValue().WithdrawStatus}</Text>
            ) : (
              ""
            )}
            {info.getValue().CompleteStatus !== "" ? (
              <Text color={"#fff"}>{info.getValue().CompleteStatus}</Text>
            ) : (
              ""
            )}
          </>
        );
      },
      header: "Status",
    }),
    columnHelper.accessor("Action", {
      cell: (info) => {
        return (
          <Text color={"#9FC131"} fontSize={"14px"}>
            {info.getValue()}
          </Text>
        );
      },
      header: "Action",
    }),
    columnHelper.accessor("DropDownDots", {
      cell: (info) => {
        return (
          <Menu>
            <MenuButton bg={"none"} border={"none"} as={Button} variant="link">
              <Icon
                fill="#ada7b7"
                xmlns="http://www.w3.org/2000/svg"
                width="4px"
                height="18px"
                viewBox="0 0 4 18"
              >
                <g transform="translate(-1546 -861)">
                  <path
                    d="M2,4A2,2,0,1,0,0,2,2.006,2.006,0,0,0,2,4Z"
                    transform="translate(1546 861)"
                  />
                  <path
                    d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
                    transform="translate(1546 868)"
                  />
                  <path
                    d="M2,0A2,2,0,1,0,4,2,2.006,2.006,0,0,0,2,0Z"
                    transform="translate(1546 875)"
                  />
                </g>
              </Icon>
            </MenuButton>
            <MenuList
              bg={"#140533"}
              border={"solid 1px"}
              borderColor={"#3B2864"}
              textTransform={"uppercase"}
              rounded="lg"
              py={2}
              minWidth="90px"
            >
              {info.getValue().transferAction !== "" ? (
                <MenuItem>{info.getValue().transferAction}</MenuItem>
              ) : (
                ""
              )}
              {info.getValue().anyOtherAction !== "" ? (
                <MenuItem>{info.getValue().anyOtherAction}</MenuItem>
              ) : (
                ""
              )}
            </MenuList>
          </Menu>
        );
      },
      header: "",
    }),
  ];
  const data = [
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "Processing",
        WithdrawStatus: "",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "02",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "Withdraw",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "",
        CompleteStatus: "Completed",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "Processing",
        WithdrawStatus: "",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "02",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "Withdraw",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "",
        CompleteStatus: "Completed",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "Processing",
        WithdrawStatus: "",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "02",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "Withdraw",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "",
        CompleteStatus: "Completed",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "Processing",
        WithdrawStatus: "",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "02",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "Withdraw",
        CompleteStatus: "",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
    {
      Number: "01",
      Token: { tokenImg: BTCCurrency.src, tokenName: "BTC" },
      Transaction_ID: "#3456",
      Reward: "11.0989 PYR",
      Date: "02 Oct, 2022",
      Expiry: "00d : 00h : 00m : 00s",
      Status: {
        ProcessingStatus: "",
        WithdrawStatus: "",
        CompleteStatus: "Completed",
      },
      Action: "CLAIM REWARD",
      DropDownDots: {
        transferAction: "WITHDRAW",
        anyOtherAction: "STAKE AGAIN",
      },
    },
  ];

  return (
    <>
      <Flex mb={"17px"} direction={{ sm: "column", md: "row"}}>
        <Heading
                mr={"auto"}
                mb={["20px", "20px", "0", "0"]}
                as={"h3"}
                size={"md"}
        >
          Staking Rewards
        </Heading>
        <FormControl maxW={{ sm: "100%", md: "300px"}} mb={["24px", "24px", "0", "0"]}>
          <InputGroup size="md">
            <Input
                    pl="2.5rem"
                    type="text"
                    placeholder="Search"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
            />
            <InputLeftElement width="2.5rem">
              <SearchIcon color={"#5C498E"} />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
      </Flex>
      <DataTable data={data} columns={columns} />
    </>
  );
}
