import {
  Box,
  Button,
  Input,
  Flex,
  Icon,
  Image,
  Heading,
  Text,
  VStack,
  Avatar,
  Link,
  Tooltip,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useClipboard, useOutsideClick } from "@chakra-ui/react";
import ImgProfile from "../public/profile-img.png";

import { CopyInput } from "./CopyInput";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { CURRENCY_SYMBOL, messages } from "../constants";
import { useSideBarContext } from "../context/sideBarContext";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/slices/ModalSlice";
import { useWeb3Context } from "../context/web3Context";
import { selectNativeTokenPrice } from "../store/slices/TokenSlice";

export default function ProfileBar({ withoutBorder ,className}) {
  const dispatch = useDispatch();
  const { account, balance, walletConnect, disconnect } = useWeb3Context();
  const { user } = useAuth();
  const nativeTokenPrice = useSelector(selectNativeTokenPrice);
  return (
    <Box className={className}
      w={{ xl: "250px", lg: "250px", md: "100%", sm: "100%" }}
      minW={"250px"}
      maxW={{ xl: "250px", lg: "250px", md: "94%", sm: "94%" }}
      bg={"#241446"}
      border={withoutBorder ? "" : "solid 1px"}
      borderColor={"#3B2864"}
      borderRadius={"16px"}
      position={{ xl: "sticky" }}
      top={{ sm: "90px", md: "90px", lg: "5px" }}
      right={"20px"}
      py={withoutBorder ? 0 : 3}
      //display={{ sm: toggleProfile ? "block" : "none", xl: "block" }}
      left={withoutBorder ? 0 : { md: "20px", sm: "10px" }}
    >
      <Box textAlign={"center"} px={4}>
        <Avatar
          boxSize="96px"
          mb={"24px"}
          mx={"auto"}
          name={user?.displayName}
          src={
            user?.profilePhoto && `data:image/png;base64, ${user?.profilePhoto}`
          }
          alt={user?.displayName}
        />
        <Heading mb={"8px"} as={"h4"} size={"sm"}>
          {user?.displayName}
        </Heading>

        <CopyInput
          copyText={
            account ? account?.slice(0, 5) + "..." + account?.slice(37, 42) : ""
          }
          copyValue={account}
        />
        {withoutBorder && (
          <Button
            onClick={() => {
              account
                ? dispatch(
                    openModal({
                      modal: "ConfirmationModal",
                      props: {
                        isOpen: true,
                        title: messages.confirmation_modal.title,
                        message: "Do you want to disconnect wallet",
                        cancelLabel: messages.confirmation_modal.cancelLabel,
                        actionLabel: messages.confirmation_modal.actionLabel,
                        handleAction: disconnect,
                      },
                    })
                  )
                : walletConnect();
            }}
            display={{ sm: "flex" }}
            className={"Archivo"}
            fontWeight={"500"}
            color={"#301C50"}
            fontSize={"14px"}
            bg={"#ADA7B7"}
            _hover={{ bg: "#ADA7B7" }}
            borderRadius={"6px"}
            p={"4px"}
            border={0}
            w={"100%"}
            mt={"8px"}
          >
            <Icon
              me={"10px"}
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              viewBox="0 0 64 64"
            >
              <g transform="translate(-295 -842)">
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  transform="translate(295 842)"
                  fill="#513d7b"
                />
                <g transform="translate(310 858)">
                  <path
                    d="M33.263,1,19.824,11l2.5-5.893Z"
                    transform="translate(-0.564 -1)"
                    fill="#e17726"
                    stroke="#e17726"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M2.663,1,15.982,11.093,13.6,5.107Z"
                    transform="translate(-0.961 -1)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M28.31,23.533l-3.576,5.493,7.656,2.12,2.193-7.493Z"
                    transform="translate(-0.45 -0.347)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M1.273,23.653l2.18,7.493,7.643-2.12L7.533,23.533Z"
                    transform="translate(-0.994 -0.347)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M10.519,14.645,8.392,17.872l7.576.347-.253-8.2Z"
                    transform="translate(-0.829 -0.739)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M25.274,14.648,20,9.928l-.173,8.293,7.576-.347Z"
                    transform="translate(-0.564 -0.741)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M10.873,29.022,15.459,26.8,11.511,23.7Z"
                    transform="translate(-0.771 -0.342)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M20.266,26.8l4.572,2.227-.625-5.32Z"
                    transform="translate(-0.554 -0.342)"
                    fill="#e27625"
                    stroke="#e27625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M24.838,28.935l-4.572-2.227.372,2.987-.04,1.267Z"
                    transform="translate(-0.554 -0.255)"
                    fill="#d5bfb2"
                    stroke="#d5bfb2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M10.873,28.935l4.254,2.027L15.1,29.695l.359-2.987Z"
                    transform="translate(-0.771 -0.255)"
                    fill="#d5bfb2"
                    stroke="#d5bfb2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M15.194,21.851l-3.8-1.12,2.685-1.24Z"
                    transform="translate(-0.759 -0.464)"
                    fill="#233447"
                    stroke="#233447"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M20.513,21.851l1.117-2.36,2.7,1.24Z"
                    transform="translate(-0.548 -0.464)"
                    fill="#233447"
                    stroke="#233447"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M10.954,29.027l.665-5.493-4.227.12Z"
                    transform="translate(-0.852 -0.347)"
                    fill="#cc6228"
                    stroke="#cc6228"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M24.1,23.533l.651,5.493,3.576-5.373Z"
                    transform="translate(-0.465 -0.347)"
                    fill="#cc6228"
                    stroke="#cc6228"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M27.4,17.651,19.824,18l.7,3.907,1.117-2.36,2.7,1.24Z"
                    transform="translate(-0.564 -0.517)"
                    fill="#cc6228"
                    stroke="#cc6228"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M11.462,20.784l2.685-1.24,1.117,2.36.7-3.907-7.576-.347Z"
                    transform="translate(-0.829 -0.517)"
                    fill="#cc6228"
                    stroke="#cc6228"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M8.392,17.651l3.177,6.227-.106-3.093Z"
                    transform="translate(-0.829 -0.517)"
                    fill="#e27525"
                    stroke="#e27525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M24.244,20.784l-.12,3.093L27.3,17.651Z"
                    transform="translate(-0.464 -0.517)"
                    fill="#e27525"
                    stroke="#e27525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M15.813,17.988l-.7,3.907L16,26.508l.2-6.08Z"
                    transform="translate(-0.673 -0.508)"
                    fill="#e27525"
                    stroke="#e27525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M19.833,17.988l-.372,2.427.186,6.093.891-4.613Z"
                    transform="translate(-0.572 -0.508)"
                    fill="#e27525"
                    stroke="#e27525"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M20.533,21.816l-.891,4.613.638.453,3.948-3.093.12-3.093Z"
                    transform="translate(-0.568 -0.429)"
                    fill="#f5841f"
                    stroke="#f5841f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M11.393,20.7l.106,3.093,3.948,3.093.638-.453-.891-4.613Z"
                    transform="translate(-0.759 -0.429)"
                    fill="#f5841f"
                    stroke="#f5841f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M20.816,30.9l.04-1.267-.346-.293H15.433l-.332.293.027,1.267-4.254-2.027L12.362,30.1l3.017,2.093H20.55L23.581,30.1l1.475-1.227Z"
                    transform="translate(-0.771 -0.192)"
                    fill="#c0ac9d"
                    stroke="#c0ac9d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M20.388,26.721l-.638-.453H16l-.638.453L15,29.708l.332-.293h5.078l.346.293Z"
                    transform="translate(-0.676 -0.268)"
                    fill="#161616"
                    stroke="#161616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M33.824,11.653l1.13-5.52L33.252,1,20.266,10.667l5,4.24,7.058,2.067,1.555-1.827-.678-.493,1.077-.987-.824-.64,1.077-.827Z"
                    transform="translate(-0.554 -1)"
                    fill="#763e1a"
                    stroke="#763e1a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M1,6.133l1.143,5.52-.731.547,1.09.827-.824.64,1.077.987-.678.493,1.555,1.827,7.058-2.067,5-4.24L2.7,1Z"
                    transform="translate(-1 -1)"
                    fill="#763e1a"
                    stroke="#763e1a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M32.232,16.582l-7.058-2.067L27.3,17.742l-3.177,6.227,4.2-.053H34.6Z"
                    transform="translate(-0.464 -0.608)"
                    fill="#f5841f"
                    stroke="#f5841f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M10.683,14.515,3.625,16.582,1.273,23.915H7.533l4.2.053L8.557,17.742Z"
                    transform="translate(-0.994 -0.608)"
                    fill="#f5841f"
                    stroke="#f5841f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                  <path
                    d="M19.974,18.364l.452-7.813,2.047-5.56H13.354l2.047,5.56.452,7.813.173,2.453.013,6.067h3.748l.013-6.067Z"
                    transform="translate(-0.714 -0.884)"
                    fill="#f5841f"
                    stroke="#f5841f"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.25"
                  />
                </g>
              </g>
            </Icon>
            {account
              ? account?.slice(0, 5) + "..." + account?.slice(37, 42)
              : "Connect"}
          </Button>
        )}
      </Box>
      <Box
        borderTop={"solid 1px"}
        borderBottom={"solid 1px"}
        borderColor={"#3B2864"}
        py={4}
        px={4}
        my={4}
      >
        <Text mb={"8px"} fontWeight={"500"}>
          Balance
        </Text>
        <Heading mb={"8px"} as={"h3"} size={"md"}>
          {account ?  Number(balance) >= 1000000 ? (Number(balance) / 1000000).toFixed(2) + 'M':Number(balance).toFixed(2) : "0"}
          <Text
            fontFamily={"Roboto"}
            fontSize={"18px"}
            fontWeight={"400"}
            ml={"10px"}
            as={"Span"}
          >
            {CURRENCY_SYMBOL}
          </Text>
        </Heading>
        <Text fontSize={"16px"} fontWeight={"300"}>
          {`1 ${CURRENCY_SYMBOL} = ${Number(
            nativeTokenPrice?.lava_price
          ).toFixed(4)} USD`}
        </Text>
      </Box>
      <VStack spacing={"20px"} px={4} mb={3} alignItems={"start"}>
        <Button
          display={"flex"}
          alignItems={"start"}
          justifyContent={"start"}
          role="group"
          border={"0"}
          w="100%"
          h="30px"
          padding={"0"}
          color={"#fff"}
          fontFamily={"Archivo"}
          fontSize={"16px"}
          _hover={{ color: "#9FC131", bg: "transparent" }}
          isDisabled={account ? false : true}
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              openModal({
                modal: "TransferTokenModal",
                props: { tokenName: "LAVA" },
              })
            );
          }}
        >
          <Icon
            _groupHover={{ fill: "#9FC131" }}
            fill={"#fff"}
            xmlns="http://www.w3.org/2000/svg"
            me={"10px"}
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
          >
            <path
              d="M16431.3,6143.52a.649.649,0,0,1-.135-.211l-2.729-6.75-6.754-2.729a.594.594,0,0,1-.205-.138,1.634,1.634,0,0,1,.635-2.708l14.727-4.9a1.677,1.677,0,0,1,.521-.086,1.65,1.65,0,0,1,1.326.684,1.622,1.622,0,0,1,.225,1.471l-4.9,14.723a1.637,1.637,0,0,1-2.713.643Zm.967-.829a.365.365,0,0,0,.188.052.384.384,0,0,0,.367-.259l4.7-14.117-7.859,7.86Zm-9.756-10.516a.378.378,0,0,0-.252.273.414.414,0,0,0,.041.276l6.467,2.616,7.863-7.862Z"
              transform="translate(-16421 -6125.999)"
            />
          </Icon>
          SEND
        </Button>
        <Button
          display={"flex"}
          alignItems={"start"}
          justifyContent={"start"}
          role="group"
          border={"0"}
          w="100%"
          h="30px"
          padding={"0"}
          color={"#fff"}
          fontFamily={"Archivo"}
          fontSize={"16px"}
          _hover={{ color: "#9FC131", bg: "transparent" }}
          _isDisabled={{ color: "#707070", bg: "transparent" }}
          cursor={"not-allowed"}
          // isDisabled={account ? false : true}
          isDisabled={true}
        >
          <Icon
            _groupHover={{ fill: "#9FC131" }}
            fill={"#fff"}
            xmlns="http://www.w3.org/2000/svg"
            me={"10px"}
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
          >
            <path
              d="M16432.076,6139.5a1.543,1.543,0,0,1,.023-.27h-2.383a1.53,1.53,0,0,1-1.5,1.8,1.527,1.527,0,0,1-1.527-1.527,1.543,1.543,0,0,1,.025-.27h-1.285a1.591,1.591,0,0,1-1.52-1.5l-1.014-10.107c-.023-.218-.158-.367-.268-.367h-1a.629.629,0,1,1,0-1.257h1a1.6,1.6,0,0,1,1.52,1.5l1.012,10.108c.021.217.156.366.27.366h11.176a.629.629,0,0,1,0,1.257h-1.5a1.52,1.52,0,0,1-1.5,1.8A1.527,1.527,0,0,1,16432.076,6139.5Zm1.258,0a.27.27,0,1,0,.27-.27A.27.27,0,0,0,16433.334,6139.5Zm-5.393,0a.271.271,0,1,0,.271-.27A.273.273,0,0,0,16427.941,6139.5Zm-.934-1.9a1.507,1.507,0,0,1-1.525-1.444l-.736-6.812c0-.021,0-.045,0-.065a1.51,1.51,0,0,1,1.525-1.486h11.232a1.5,1.5,0,0,1,1.248.557,1.629,1.629,0,0,1,.137,1.5l-1.832,6.436a1.8,1.8,0,0,1-1.758,1.313Zm-1.008-8.346.736,6.794c0,.024,0,.045,0,.069a.252.252,0,0,0,.27.228h8.287a.552.552,0,0,0,.551-.4l1.832-6.446a.019.019,0,0,0,0-.014.715.715,0,0,0,.053-.39.455.455,0,0,0-.234-.045h-11.232A.259.259,0,0,0,16426,6129.258Z"
              transform="translate(-16421 -6126)"
            />
          </Icon>
          {`BUY ${CURRENCY_SYMBOL}`}
        </Button>
        {!account ? (
          <Button
            isDisabled={account ? false : true}
            display={"flex"}
            alignItems={"start"}
            justifyContent={"start"}
            role="group"
            border={"0"}
            w="100%"
            h="30px"
            padding={"0"}
            color={"#fff"}
            fontFamily={"Archivo"}
            fontSize={"16px"}
            _hover={{ color: "#9FC131", bg: "transparent" }}
          >
            <Icon
              _groupHover={{ fill: "#9FC131" }}
              fill={"#fff"}
              xmlns="http://www.w3.org/2000/svg"
              me={"10px"}
              width="18px"
              height="18px"
              viewBox="0 0 18 18"
            >
              <path d="M8.386,17.84.752,13.9a1.361,1.361,0,0,1-.2-2.309L2.3,10.262l-1.546-.8a1.375,1.375,0,0,1-.75-1.094A1.355,1.355,0,0,1,.545,7.163L2.407,5.749.756,4.9a1.374,1.374,0,0,1-.75-1.1A1.355,1.355,0,0,1,.547,2.6L3.579.295A1.468,1.468,0,0,1,5.131.162l7.613,3.923a1.375,1.375,0,0,1,.75,1.094,1.354,1.354,0,0,1-.539,1.209L11.094,7.8l1.65.85a1.375,1.375,0,0,1,.75,1.1,1.354,1.354,0,0,1-.539,1.208L11.185,12.3l1.562.806a1.375,1.375,0,0,1,.748,1.1,1.361,1.361,0,0,1-.541,1.211l-3.038,2.3A1.436,1.436,0,0,1,9.048,18H9.043A1.436,1.436,0,0,1,8.386,17.84ZM1.348,12.579a.121.121,0,0,0-.049.113.116.116,0,0,0,.064.1L9,16.732a.109.109,0,0,0,.117-.01l3.038-2.3a.124.124,0,0,0,.049-.113.122.122,0,0,0-.066-.1l-2.067-1.067-.146.111a1.469,1.469,0,0,1-1.554.133l-4.813-2.48ZM1.36,8.147a.122.122,0,0,0-.049.113.12.12,0,0,0,.065.1L8.99,12.281a.107.107,0,0,0,.117-.011l3.032-2.3a.121.121,0,0,0,.049-.113.123.123,0,0,0-.066-.1L9.975,8.65l-.052.039a1.468,1.468,0,0,1-1.554.132L3.664,6.4ZM4.393,1.279l-3.032,2.3a.121.121,0,0,0-.049.113.118.118,0,0,0,.065.1L8.991,7.716a.109.109,0,0,0,.05.012.112.112,0,0,0,.067-.023L12.14,5.4a.121.121,0,0,0,.049-.113.123.123,0,0,0-.066-.1L4.511,1.268a.124.124,0,0,0-.051-.012A.109.109,0,0,0,4.393,1.279Z" />
            </Icon>
            {`STAKE ${CURRENCY_SYMBOL}`}
          </Button>
        ) : (
          <Link
            display={"flex"}
            alignItems={"start"}
            justifyContent={"start"}
            role="group"
            border={"0"}
            w="100%"
            h="30px"
            padding={"0"}
            color={"#fff"}
            fontFamily={"Archivo"}
            fontSize={"16px"}
            _hover={{ color: "#9FC131", bg: "transparent" }}
            href={
              account
                ? "https://myforge.vulcanforged.com/StakingProgram#Lands"
                : ""
            }
            target="_blank"
          >
            <Icon
              _groupHover={{ fill: "#9FC131" }}
              fill={"#fff"}
              xmlns="http://www.w3.org/2000/svg"
              me={"10px"}
              width="18px"
              height="18px"
              viewBox="0 0 18 18"
            >
              <path d="M8.386,17.84.752,13.9a1.361,1.361,0,0,1-.2-2.309L2.3,10.262l-1.546-.8a1.375,1.375,0,0,1-.75-1.094A1.355,1.355,0,0,1,.545,7.163L2.407,5.749.756,4.9a1.374,1.374,0,0,1-.75-1.1A1.355,1.355,0,0,1,.547,2.6L3.579.295A1.468,1.468,0,0,1,5.131.162l7.613,3.923a1.375,1.375,0,0,1,.75,1.094,1.354,1.354,0,0,1-.539,1.209L11.094,7.8l1.65.85a1.375,1.375,0,0,1,.75,1.1,1.354,1.354,0,0,1-.539,1.208L11.185,12.3l1.562.806a1.375,1.375,0,0,1,.748,1.1,1.361,1.361,0,0,1-.541,1.211l-3.038,2.3A1.436,1.436,0,0,1,9.048,18H9.043A1.436,1.436,0,0,1,8.386,17.84ZM1.348,12.579a.121.121,0,0,0-.049.113.116.116,0,0,0,.064.1L9,16.732a.109.109,0,0,0,.117-.01l3.038-2.3a.124.124,0,0,0,.049-.113.122.122,0,0,0-.066-.1l-2.067-1.067-.146.111a1.469,1.469,0,0,1-1.554.133l-4.813-2.48ZM1.36,8.147a.122.122,0,0,0-.049.113.12.12,0,0,0,.065.1L8.99,12.281a.107.107,0,0,0,.117-.011l3.032-2.3a.121.121,0,0,0,.049-.113.123.123,0,0,0-.066-.1L9.975,8.65l-.052.039a1.468,1.468,0,0,1-1.554.132L3.664,6.4ZM4.393,1.279l-3.032,2.3a.121.121,0,0,0-.049.113.118.118,0,0,0,.065.1L8.991,7.716a.109.109,0,0,0,.05.012.112.112,0,0,0,.067-.023L12.14,5.4a.121.121,0,0,0,.049-.113.123.123,0,0,0-.066-.1L4.511,1.268a.124.124,0,0,0-.051-.012A.109.109,0,0,0,4.393,1.279Z" />
            </Icon>
            {`STAKE PYR`}
          </Link>
        )}
        <Button
          display={"flex"}
          alignItems={"start"}
          justifyContent={"start"}
          role="group"
          border={"0"}
          w="100%"
          h="30px"
          color={"#fff"}
          fontFamily={"Archivo"}
          padding={"0"}
          fontSize={"16px"}
          _hover={{ color: "#9FC131", bg: "transparent" }}
          isDisabled={account ? false : true}
          onClick={() =>
            dispatch(openModal({ modal: "ExportQrCodeModal", props: {} }))
          }
        >
          <Icon
            _groupHover={{ fill: "#9FC131" }}
            fill={"#fff"}
            xmlns="http://www.w3.org/2000/svg"
            me={"10px"}
            width="18px"
            height="18px"
            viewBox="0 0 18 18"
          >
            <path d="M15.53,18a1.466,1.466,0,0,1-1.465-1.465V15.32H12.344a2.3,2.3,0,0,1-2.3-2.3v-.678a2.3,2.3,0,0,1,2.3-2.3h.678a2.3,2.3,0,0,1,2.3,2.3v1.72h1.215A1.466,1.466,0,0,1,18,15.53v1A1.466,1.466,0,0,1,16.535,18Zm-.21-1.465a.21.21,0,0,0,.21.21h1a.21.21,0,0,0,.21-.21v-1a.21.21,0,0,0-.21-.21H15.321ZM11.3,12.344v.678a1.043,1.043,0,0,0,1.042,1.042h1.72v-1.72A1.043,1.043,0,0,0,13.022,11.3h-.678A1.043,1.043,0,0,0,11.3,12.344ZM2.3,18A2.3,2.3,0,0,1,0,15.7V12.344a2.3,2.3,0,0,1,2.3-2.3H5.655a2.3,2.3,0,0,1,2.3,2.3V15.7a2.3,2.3,0,0,1-2.3,2.3ZM1.256,12.344V15.7A1.044,1.044,0,0,0,2.3,16.744H5.655A1.044,1.044,0,0,0,6.7,15.7V12.344A1.044,1.044,0,0,0,5.655,11.3H2.3A1.044,1.044,0,0,0,1.256,12.344Zm2.582,3.018a1.2,1.2,0,0,1-1.2-1.2v-.279a1.2,1.2,0,0,1,1.2-1.2h.279a1.2,1.2,0,0,1,1.2,1.2v.279a1.2,1.2,0,0,1-1.2,1.2Zm8.507-7.409a2.3,2.3,0,0,1-2.3-2.3V2.3a2.3,2.3,0,0,1,2.3-2.3H15.7A2.3,2.3,0,0,1,18,2.3V5.655a2.3,2.3,0,0,1-2.3,2.3ZM11.3,2.3V5.655A1.044,1.044,0,0,0,12.344,6.7H15.7a1.044,1.044,0,0,0,1.043-1.043V2.3A1.044,1.044,0,0,0,15.7,1.256H12.344A1.044,1.044,0,0,0,11.3,2.3Zm-9,5.655A2.3,2.3,0,0,1,0,5.655V2.3A2.3,2.3,0,0,1,2.3,0H5.655a2.3,2.3,0,0,1,2.3,2.3V5.655a2.3,2.3,0,0,1-2.3,2.3ZM1.256,2.3V5.655A1.044,1.044,0,0,0,2.3,6.7H5.655A1.044,1.044,0,0,0,6.7,5.655V2.3A1.044,1.044,0,0,0,5.655,1.256H2.3A1.044,1.044,0,0,0,1.256,2.3ZM13.883,5.316a1.2,1.2,0,0,1-1.2-1.2V3.837a1.2,1.2,0,0,1,1.2-1.2h.279a1.2,1.2,0,0,1,1.2,1.2v.279a1.2,1.2,0,0,1-1.2,1.2Zm-9.951,0h-.29A1,1,0,0,1,2.637,4.311v-.67a1,1,0,0,1,1.005-1h.67a1,1,0,0,1,1,1v.67a1,1,0,0,1-1,1.005Z" />
          </Icon>
          EXPORT QR CODE
        </Button>
      </VStack>
    </Box>
  );
}
