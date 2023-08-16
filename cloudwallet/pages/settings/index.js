import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  SimpleGrid,
  FormLabel,
  Switch,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Circle,
  Avatar,
  Alert,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useMediaQuery,
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
import { useWeb3React } from "@web3-react/core";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  AddIcon,
} from "@chakra-ui/icons";
import DataTable from "../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import EthereumLogo from "../../public/ethereum.svg";
import IconPolygon from "../../public/IconPolygon.svg";
import IconPYR from "../../public/icon-pyr.png";
import BgGradient from "../../public/gradient-bg.png";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/ModalSlice";
import { messages } from "../../constants";
import moment from "moment";
import { getFromLocalStorage } from "../../utils";

export default function Dashboard() {
  const { user, disableTwoFa, generatePasskey, deletePasskey, webauthn } = useAuth();
  const dispatch = useDispatch();
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const [screenSize] = useMediaQuery("(max-width: 480px)");
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
  // console.log("user", user);
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
      <Heading
        mb={"40px"}
        as={"h3"}
        size={"md"}
        textAlign={{ sm: "center", md: "start" }}
      >
        Account Details
      </Heading>
      <Flex
        flexDirection={{ sm: "column", md: "colum", lg: "row" }}
        borderBottom={"solid 1px"}
        borderColor={"#3B2864"}
        pb={"30px"}
        mb={"56px"}
        alignItems={"center"}
      >
        <Avatar
          boxSize="200px"
          name={user?.displayName}
          src={
            user?.profilePhoto
              ? `data:image/png;base64, ${user?.profilePhoto}`
              : "/profile-image"
          }
          me={{ sm: "0", md: "0", lg: "24px" }}
          mb={{ sm: "24px", md: "24px", lg: "0" }}
        />
        <Box flex={"1"} w={{ sm: "100%", md: "100%", lg: "auto" }}>
          <Flex
            borderBottom={"solid 1px"}
            borderColor={"#3B2864"}
            pb={"16px"}
            mb={"24px"}
            alignItems={"center"}
          >
            <Flex me={"auto"}>
              <Heading
                mr={"32px"}
                mb={["20px", "20px", "0", "0"]}
                as={"h3"}
                size={"md"}
              >
                {user?.displayName}
              </Heading>
              <Flex>
                {user?.twitter ? (
                  <Link mr={"14px"} href={user?.twitter} target="_blank">
                    <Icon
                      fill="#ada7b7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23px"
                      height="19px"
                      viewBox="0 0 23 19"
                    >
                      <path
                        d="M16.3,112.8a12.948,12.948,0,0,1-7.025-2.049A.516.516,0,0,1,9.6,109.8q.483.041,1,.04a8.479,8.479,0,0,0,4.1-1.061,4.623,4.623,0,0,1-1.53-.783,4.83,4.83,0,0,1-1.682-2.383.517.517,0,0,1,.34-.652,4.852,4.852,0,0,1-.79-.77,4.981,4.981,0,0,1-1.121-3.115v-.1a.516.516,0,0,1,.771-.448l.019.011a5.363,5.363,0,0,1-.79-2.632,5.2,5.2,0,0,1,.7-2.5.515.515,0,0,1,.845-.065,11.974,11.974,0,0,0,3.811,3.089,11.71,11.71,0,0,0,4.24,1.272c-.01-.147-.015-.292-.015-.438a4.889,4.889,0,0,1,8.256-3.574,8.435,8.435,0,0,0,2.375-.929.515.515,0,0,1,.745.617,5.319,5.319,0,0,1-.664,1.3q.279-.1.552-.224a.515.515,0,0,1,.635.763,10.211,10.211,0,0,1-2.1,2.24c.009.108.013.212.013.311a13.15,13.15,0,0,1-1.521,6.05A12.657,12.657,0,0,1,16.3,112.8Zm-4.71-1.982a12.292,12.292,0,0,0,4.7.95A11.624,11.624,0,0,0,26.87,105.36a12.118,12.118,0,0,0,1.41-5.583,3.53,3.53,0,0,0-.037-.473.514.514,0,0,1,.2-.484A9.2,9.2,0,0,0,29.4,98q-.437.1-.88.157a.509.509,0,0,1-.551-.336.516.516,0,0,1,.208-.611,4.238,4.238,0,0,0,.981-.851,9.606,9.606,0,0,1-1.484.412.516.516,0,0,1-.474-.153,3.853,3.853,0,0,0-6.675,2.671,5.565,5.565,0,0,0,.076.908.515.515,0,0,1-.125.43.508.508,0,0,1-.415.169,12.871,12.871,0,0,1-5.27-1.439,13.018,13.018,0,0,1-3.6-2.739,4.251,4.251,0,0,0-.242,1.3A4.006,4.006,0,0,0,12.7,101.16a.515.515,0,0,1-.337.935,5.411,5.411,0,0,1-1.333-.269,3.848,3.848,0,0,0,3.029,3.057.516.516,0,0,1,.007,1.007,5.726,5.726,0,0,1-1.283.139,3.81,3.81,0,0,0,3.313,1.939.516.516,0,0,1,.3.921,9.219,9.219,0,0,1-4.809,1.925Z"
                        transform="translate(-9.036 -94.364)"
                        fill="#fff"
                      />
                    </Icon>
                  </Link>
                ) : (
                  ""
                )}
                {user?.medium ? (
                  <Link mr={"14px"} href={user?.medium} target="_blank">
                    <Icon
                      fill="#ada7b7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="19.801px"
                      height="15.627px"
                      viewBox="0 0 19.801 15.627"
                    >
                      <path
                        d="M-4641.867-5917.173a.481.481,0,0,1-.435-.271l-4.573-9.217a.1.1,0,0,0-.088-.056h-.022a.1.1,0,0,0-.08.1v5.208a.1.1,0,0,0,.021.063l2.641,3.387a.491.491,0,0,1,.055.513.492.492,0,0,1-.437.272h-5.53a.492.492,0,0,1-.438-.272.492.492,0,0,1,.054-.513l2.642-3.387a.115.115,0,0,0,.021-.062v-7.5a.1.1,0,0,0-.022-.063l-2.479-3.036a.486.486,0,0,1-.062-.515.486.486,0,0,1,.438-.279h5.485a.487.487,0,0,1,.442.283l4.021,8.749a.1.1,0,0,0,.09.058.1.1,0,0,0,.094-.063l2.192-5.685a.106.106,0,0,0,.007-.037v-2.817a.488.488,0,0,1,.486-.487h5.857a.486.486,0,0,1,.45.3.483.483,0,0,1-.112.53l-1.764,1.72a.107.107,0,0,0-.03.07v10.134a.1.1,0,0,0,.021.061l1.578,2.022a.492.492,0,0,1,.054.512.492.492,0,0,1-.437.272h-7.317a.487.487,0,0,1-.436-.272.491.491,0,0,1,.052-.513l1.577-2.021a.1.1,0,0,0,.022-.061v-6.2a.1.1,0,0,0-.082-.1h-.019a.1.1,0,0,0-.093.063l-3.391,8.792a.49.49,0,0,1-.432.311Zm5.109-14.655a.1.1,0,0,0-.072.029.1.1,0,0,0-.029.071v11.888a.486.486,0,0,1-.1.3l-.962,1.234a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h4.917a.1.1,0,0,0,.089-.057.1.1,0,0,0-.01-.1l-.962-1.234a.5.5,0,0,1-.1-.3v-10.583a.49.49,0,0,1,.146-.349l.91-.886a.1.1,0,0,0,.022-.108.1.1,0,0,0-.092-.062Zm-10.792,11.474a.1.1,0,0,0-.078.039l-1.566,2.009a.1.1,0,0,0-.01.1.1.1,0,0,0,.089.057h3.131a.1.1,0,0,0,.089-.057.1.1,0,0,0-.011-.1l-1.565-2.009a.1.1,0,0,0-.079-.04Zm-1.376-11.474a.1.1,0,0,0-.091.058.1.1,0,0,0,.013.106l1.83,2.237v.006a.412.412,0,0,1,.027.038l.009.013c.006.011.012.021.018.033h0l5.091,10.263a.1.1,0,0,0,.089.055.1.1,0,0,0,.094-.064l1.224-3.171a.1.1,0,0,0,0-.079l-4.342-9.442a.1.1,0,0,0-.091-.059Z"
                        transform="translate(4650.8 5932.8)"
                        fill="#fff"
                      />
                    </Icon>
                  </Link>
                ) : (
                  ""
                )}
                {user?.telegram ? (
                  <Link mr={"14px"} href={user?.telegram} target="_blank">
                    <Icon
                      fill="#ada7b7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="19.801px"
                      height="17.157px"
                      viewBox="0 0 19.801 17.157"
                    >
                      <path
                        d="M-4635.624-5915.643a1.1,1.1,0,0,1-.7-.251l-3.773-3.086a.106.106,0,0,0-.064-.024.1.1,0,0,0-.06.021l-.391.292-2.837,2.124-.01.008a.816.816,0,0,1-.468.223.435.435,0,0,1-.112-.016.536.536,0,0,1-.381-.471c-.046-.207-1.305-6.053-1.312-6.085a.1.1,0,0,0-.058-.07l-4.349-1.9a1.1,1.1,0,0,1-.663-1.067,1.1,1.1,0,0,1,.759-1l17.585-5.8a1.075,1.075,0,0,1,.345-.055,1.112,1.112,0,0,1,.75.291,1.108,1.108,0,0,1,.331,1.069l-3.516,14.942a1.1,1.1,0,0,1-.722.795,1.087,1.087,0,0,1-.355.06Zm-.34-13.346a.478.478,0,0,1,.386.188.483.483,0,0,1-.034.634l-6.146,6.427a.1.1,0,0,0-.026.074.1.1,0,0,0,.036.071l1.912,1.565,4.13,3.379a.123.123,0,0,0,.082.031.123.123,0,0,0,.044-.008.126.126,0,0,0,.085-.1l3.515-14.942a.126.126,0,0,0-.039-.126.124.124,0,0,0-.086-.037.114.114,0,0,0-.038.005h-.005l-17.586,5.8a.123.123,0,0,0-.091.119.126.126,0,0,0,.079.128l4.358,1.906a.1.1,0,0,0,.042.009.093.093,0,0,0,.048-.013l9.1-5.056a.488.488,0,0,1,.235-.055Zm-6.264,8.292a.087.087,0,0,0-.03,0,.1.1,0,0,0-.067.067l-.646,2.259a.1.1,0,0,0,.039.11.1.1,0,0,0,.057.018.1.1,0,0,0,.062-.021l1.777-1.331a.1.1,0,0,0,.04-.078.1.1,0,0,0-.036-.08l-1.133-.926a.093.093,0,0,0-.063-.02Zm3.16-5.508a.1.1,0,0,0-.049.012l-5.583,3.1a.1.1,0,0,0-.05.11l.813,3.764a.1.1,0,0,0,.094.079.1.1,0,0,0,.1-.073l.729-2.541v-.007a.009.009,0,0,0,0-.008.469.469,0,0,1,.111-.187l3.9-4.082a.1.1,0,0,0,.007-.131.1.1,0,0,0-.072-.032Z"
                        transform="translate(4650.803 5932.8)"
                        fill="#fff"
                      />
                    </Icon>
                  </Link>
                ) : (
                  ""
                )}
              </Flex>
            </Flex>
            <Button
              ml={"auto"}
              variant="outline"
              size="lg"
              onClick={() =>
                dispatch(
                  openModal({
                    modal: "EditProfileModal",
                    props: { isOpen: true },
                  })
                )
              }
            >
              EDIT PROFILE
            </Button>
          </Flex>
          <SimpleGrid columns={[1, 1, 3, 3]} spacing={4}>
            <Box>
              <Text
                fontFamily={"Roboto"}
                fontWeight={"300"}
                fontSize={"16px"}
                color={"#9EA5B4"}
                as={"label"}
              >
                Full Name
              </Text>
              <Text fontFamily={"Archivo"} fontWeight={"600"}>
                {user?.displayName}
              </Text>
            </Box>
            <Box>
              <Text
                fontFamily={"Roboto"}
                fontWeight={"300"}
                fontSize={"16px"}
                color={"#9EA5B4"}
                as={"label"}
              >
                Member Since
              </Text>
              <Text fontFamily={"Archivo"} fontWeight={"600"}>
                {moment(user?.createdAt).format("DD-MM-YY")}
              </Text>
            </Box>
            {/*<Box>*/}
            {/*  <Text*/}
            {/*    fontFamily={"Roboto"}*/}
            {/*    fontWeight={"300"}*/}
            {/*    fontSize={"16px"}*/}
            {/*    color={"#9EA5B4"}*/}
            {/*    as={"label"}*/}
            {/*  >*/}
            {/*    Email*/}
            {/*  </Text>*/}
            {/*  <Text fontFamily={"Archivo"} fontWeight={"600"}>*/}
            {/*    {user?.email}*/}
            {/*  </Text>*/}
            {/*</Box>*/}
            <Box>
              <Text
                fontFamily={"Roboto"}
                fontWeight={"300"}
                fontSize={"16px"}
                color={"#9EA5B4"}
                as={"label"}
              >
                Wallet Address
              </Text>
              <Text fontFamily={"Archivo"} fontWeight={"600"}>
                {account
                  ? account?.slice(0, 5) + "..." + account?.slice(37, 42)
                  : null}
              </Text>
            </Box>
            <Box>
              <Text
                fontFamily={"Roboto"}
                fontWeight={"300"}
                fontSize={"16px"}
                color={"#9EA5B4"}
                as={"label"}
              >
                Connected Wallet
              </Text>
              <Text fontFamily={"Archivo"} fontWeight={"600"}>
                MetaMask
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>

      {/*<Tabs variant="borderVariant">*/}
      {/*  <TabList>*/}
      {/*    <Tab>ACCOUNT SECURITY</Tab>*/}
      {/*    /!* <Tab>WALLETS SETTINGS</Tab>*/}
      {/*      <Tab>DEVELOPERS SETTINGS</Tab>*/}
      {/*      <Tab>CREATE NEW ACCOUNT</Tab> *!/*/}
      {/*  </TabList>*/}
      {/*  <TabPanels>*/}
      {/*    <TabPanel>*/}
      {/*      <SimpleGrid columns={[1, 1, 2, 2]} spacing={4}>*/}
      {/*        {screenSize ? (*/}
      {/*          <Box*/}
      {/*            position={"relative"}*/}
      {/*            _before={{*/}
      {/*              content: '""',*/}
      {/*              position: "absolute",*/}
      {/*              top: `0`,*/}
      {/*              left: `0`,*/}
      {/*              height: `100%`,*/}
      {/*              width: `100%`,*/}
      {/*              display: "block",*/}
      {/*              borderRadius: "16px",*/}
      {/*              zIndex: "-1",*/}
      {/*              backgroundImage: `${BgGradient.src}`,*/}
      {/*              backgroundSize: "100% 100%",*/}
      {/*              backgroundRepeat: "no-repeat",*/}
      {/*              mixBlendMode: "color-dodge",*/}
      {/*            }}*/}
      {/*            p={"25px"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"rgba(255,255,255,0.1)"}*/}
      {/*          >*/}
      {/*            <Heading mb={"20px"} as={"h4"} size={"sm"} display={"block"}>*/}
      {/*              Generate Passkey*/}
      {/*            </Heading>*/}
      {/*            <Text mb={"50px"}>*/}
      {/*              Secret Recovery Key to access your accounts. Save them*/}
      {/*              somewhere safe and secret.*/}
      {/*            </Text>*/}
      {/*            {webauthn ? (*/}
      {/*              <Button*/}
      {/*                variant="solid"*/}
      {/*                size="lg"*/}
      {/*                onClick={() => deletePasskey()}*/}
      {/*              >*/}
      {/*                Remove*/}
      {/*              </Button>*/}
      {/*            ) : (*/}
      {/*              <Button*/}
      {/*                variant="solid"*/}
      {/*                size="lg"*/}
      {/*                onClick={() => generatePasskey()}*/}
      {/*              >*/}
      {/*                Generate*/}
      {/*              </Button>*/}
      {/*            )}*/}
      {/*          </Box>*/}
      {/*        ) : (*/}
      {/*          ""*/}
      {/*        )}*/}
      {/*        /!*<Box*!/*/}
      {/*        /!*  position={"relative"}*!/*/}
      {/*        /!*  _before={{*!/*/}
      {/*        /!*    content: '""',*!/*/}
      {/*        /!*    position: "absolute",*!/*/}
      {/*        /!*    top: `0`,*!/*/}
      {/*        /!*    left: `0`,*!/*/}
      {/*        /!*    height: `100%`,*!/*/}
      {/*        /!*    width: `100%`,*!/*/}
      {/*        /!*    display: "block",*!/*/}
      {/*        /!*    borderRadius: "16px",*!/*/}
      {/*        /!*    zIndex: "-1",*!/*/}
      {/*        /!*    backgroundImage: `${BgGradient.src}`,*!/*/}
      {/*        /!*    backgroundSize: "100% 100%",*!/*/}
      {/*        /!*    backgroundRepeat: "no-repeat",*!/*/}
      {/*        /!*    mixBlendMode: "color-dodge",*!/*/}
      {/*        /!*  }}*!/*/}
      {/*        /!*  p={"25px"}*!/*/}
      {/*        /!*  borderRadius={"16px"}*!/*/}
      {/*        /!*  border={"solid 1px"}*!/*/}
      {/*        /!*  borderColor={"rgba(255,255,255,0.1)"}*!/*/}
      {/*        /!*>*!/*/}
      {/*        /!*  <Heading mb={"20px"} as={"h4"} size={"sm"} display={"block"}>*!/*/}
      {/*        /!*    Enable 2FA*!/*/}
      {/*        /!*  </Heading>*!/*/}
      {/*        /!*  <Text mb={"50px"}>*!/*/}
      {/*        /!*    2FA authentication for your account and wallet.*!/*/}
      {/*        /!*  </Text>*!/*/}
      {/*        /!*  {user?.is2FAEnabled ? (*!/*/}
      {/*        /!*    <Button*!/*/}
      {/*        /!*      variant="solid"*!/*/}
      {/*        /!*      size="lg"*!/*/}
      {/*        /!*      onClick={() =>*!/*/}
      {/*        /!*        dispatch(*!/*/}
      {/*        /!*          openModal({*!/*/}
      {/*        /!*            modal: "ConfirmationModal",*!/*/}
      {/*        /!*            props: {*!/*/}
      {/*        /!*              isOpen: true,*!/*/}
      {/*        /!*              title: messages["confirmation_modal"]?.title,*!/*/}
      {/*        /!*              message: messages["confirmation_modal"].message,*!/*/}
      {/*        /!*              actionLabel:*!/*/}
      {/*        /!*                messages["confirmation_modal"]?.actionLabel,*!/*/}
      {/*        /!*              cancelLabel:*!/*/}
      {/*        /!*                messages["confirmation_modal"].cancelLabel,*!/*/}
      {/*        /!*              handleAction: disableTwoFa,*!/*/}
      {/*        /!*            },*!/*/}
      {/*        /!*          })*!/*/}
      {/*        /!*        )*!/*/}
      {/*        /!*      }*!/*/}
      {/*        /!*    >*!/*/}
      {/*        /!*      DiSABLE 2FA*!/*/}
      {/*        /!*    </Button>*!/*/}
      {/*        /!*  ) : (*!/*/}
      {/*        /!*    <Button*!/*/}
      {/*        /!*      variant="solid"*!/*/}
      {/*        /!*      size="lg"*!/*/}
      {/*        /!*      isDisabled={user?.isSocialLogin ? true : false}*!/*/}
      {/*        /!*      onClick={() =>*!/*/}
      {/*        /!*        dispatch(*!/*/}
      {/*        /!*          openModal({*!/*/}
      {/*        /!*            modal: "TwoFactorAuthModal",*!/*/}
      {/*        /!*            props: { isOpen: true },*!/*/}
      {/*        /!*          })*!/*/}
      {/*        /!*        )*!/*/}
      {/*        /!*      }*!/*/}
      {/*        /!*    >*!/*/}
      {/*        /!*      ENABLE 2FA*!/*/}
      {/*        /!*    </Button>*!/*/}
      {/*        /!*  )}*!/*/}
      {/*        /!*</Box>*!/*/}
      {/*      </SimpleGrid>*/}
      {/*    </TabPanel>*/}
      {/*    /!* <TabPanel>*/}
      {/*        <Heading mb={"20px"} as={"h3"} size={"md"}>*/}
      {/*          Authorized dApps*/}
      {/*        </Heading>*/}
      {/*        <SimpleGrid spacing={4} columns={[2, null, 6]}>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo1.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo2.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo3.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo4.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo5.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo6.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo7.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*          <Flex*/}
      {/*            whiteSpace={"nowrap"}*/}
      {/*            fontSize={"16px"}*/}
      {/*            flexDirection={"column"}*/}
      {/*            justifyContent={"center"}*/}
      {/*            alignItems={"center"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"#3B2864"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            bg={"#241446"}*/}
      {/*            p={"20px"}*/}
      {/*          >*/}
      {/*            <Circle*/}
      {/*              flexDirection={"column"}*/}
      {/*              justifyContent={"center"}*/}
      {/*              alignItems={"center"}*/}
      {/*              mb={"12px"}*/}
      {/*              boxSize={"80px"}*/}
      {/*              bg={"#3B2864"}*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                width={"52px"}*/}
      {/*                height={"52px"}*/}
      {/*                objectFit={"contain"}*/}
      {/*                src={SlideLogo8.src}*/}
      {/*                alt="Image"*/}
      {/*              />*/}
      {/*            </Circle>*/}
      {/*            VulcanForged*/}
      {/*          </Flex>*/}
      {/*        </SimpleGrid>*/}
      {/*      </TabPanel> *!/*/}
      {/*    /!* <TabPanel>*/}
      {/*        <SimpleGrid columns={3} spacing={4}>*/}
      {/*          <Box*/}
      {/*            position={"relative"}*/}
      {/*            _before={{*/}
      {/*              content: '""',*/}
      {/*              position: "absolute",*/}
      {/*              top: `0`,*/}
      {/*              left: `0`,*/}
      {/*              height: `100%`,*/}
      {/*              width: `100%`,*/}
      {/*              display: "block",*/}
      {/*              borderRadius: "16px",*/}
      {/*              zIndex: "-1",*/}
      {/*              backgroundImage: `${BgGradient.src}`,*/}
      {/*              backgroundSize: "100% 100%",*/}
      {/*              backgroundRepeat: "no-repeat",*/}
      {/*              mixBlendMode: "color-dodge",*/}
      {/*            }}*/}
      {/*            p={"25px"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"rgba(255,255,255,0.1)"}*/}
      {/*          >*/}
      {/*            <Heading mb={"20px"} as={"h4"} size={"sm"} display={"block"}>*/}
      {/*              Generate Security Key*/}
      {/*            </Heading>*/}
      {/*            <FormControl*/}
      {/*              display="flex"*/}
      {/*              alignItems="center"*/}
      {/*              justifyContent={"space-between"}*/}
      {/*            >*/}
      {/*              <FormLabel htmlFor="crash-reports" mb="0">*/}
      {/*                Enabling this option will generate a pass key*/}
      {/*              </FormLabel>*/}
      {/*              <Switch*/}
      {/*                id="crash-reports"*/}
      {/*                onChange={handleGeneratePasskey}*/}
      {/*              />*/}
      {/*            </FormControl>*/}
      {/*          </Box>*/}
      {/*          <Box*/}
      {/*            position={"relative"}*/}
      {/*            _before={{*/}
      {/*              content: '""',*/}
      {/*              position: "absolute",*/}
      {/*              top: `0`,*/}
      {/*              left: `0`,*/}
      {/*              height: `100%`,*/}
      {/*              width: `100%`,*/}
      {/*              display: "block",*/}
      {/*              borderRadius: "16px",*/}
      {/*              zIndex: "-1",*/}
      {/*              backgroundImage: `${BgGradient.src}`,*/}
      {/*              backgroundSize: "100% 100%",*/}
      {/*              backgroundRepeat: "no-repeat",*/}
      {/*              mixBlendMode: "color-dodge",*/}
      {/*            }}*/}
      {/*            p={"25px"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"rgba(255,255,255,0.1)"}*/}
      {/*          >*/}
      {/*            <Heading mb={"20px"} as={"h4"} size={"sm"} display={"block"}>*/}
      {/*              Collect Crash Report*/}
      {/*            </Heading>*/}
      {/*            <FormControl*/}
      {/*              display="flex"*/}
      {/*              alignItems="center"*/}
      {/*              justifyContent={"space-between"}*/}
      {/*            >*/}
      {/*              <FormLabel htmlFor="crash-reports" mb="0">*/}
      {/*                We will collect crash reports*/}
      {/*              </FormLabel>*/}
      {/*              <Switch id="crash-reports" />*/}
      {/*            </FormControl>*/}
      {/*          </Box>*/}
      {/*        </SimpleGrid>*/}
      {/*      </TabPanel> *!/*/}
      {/*    /!* <TabPanel>*/}
      {/*        <SimpleGrid columns={3} spacing={4}>*/}
      {/*          <Box*/}
      {/*            position={"relative"}*/}
      {/*            _before={{*/}
      {/*              content: '""',*/}
      {/*              position: "absolute",*/}
      {/*              top: `0`,*/}
      {/*              left: `0`,*/}
      {/*              height: `100%`,*/}
      {/*              width: `100%`,*/}
      {/*              display: "block",*/}
      {/*              borderRadius: "16px",*/}
      {/*              zIndex: "-1",*/}
      {/*              backgroundImage: `${BgGradient.src}`,*/}
      {/*              backgroundSize: "100% 100%",*/}
      {/*              backgroundRepeat: "no-repeat",*/}
      {/*              mixBlendMode: "color-dodge",*/}
      {/*            }}*/}
      {/*            p={"25px"}*/}
      {/*            borderRadius={"16px"}*/}
      {/*            border={"solid 1px"}*/}
      {/*            borderColor={"rgba(255,255,255,0.1)"}*/}
      {/*          >*/}
      {/*            <Heading mb={"20px"} as={"h4"} size={"sm"} display={"block"}>*/}
      {/*              Create New Account*/}
      {/*            </Heading>*/}
      {/*            <Text mb={"50px"}>Setup new Elysium Cloud account.</Text>*/}

      {/*            <Button variant="solid" size="lg">*/}
      {/*              CREATE NEW ACCOUNT*/}
      {/*            </Button>*/}
      {/*          </Box>*/}
      {/*        </SimpleGrid>*/}
      {/*      </TabPanel> *!/*/}
      {/*  </TabPanels>*/}
      {/*</Tabs>*/}
    </>
  );
}
