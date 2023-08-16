import { useEffect, useState } from "react";
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
  Img,
  Icon,
  ListItem,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
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
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import DataTable from "../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import {
  fetchDapps,
  selectIsLoading,
  selectDapps,
} from "../../store/slices/DappSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomImage } from "../../utils";
import { closeModal, openModal } from "../../store/slices/ModalSlice";
import { useAuth } from "../../context/AuthContext";
import { useMediaQuery } from "@chakra-ui/media-query";
import {OrderedList} from "@chakra-ui/layout";
import Cookies, {remove, set} from "js-cookie";

export default function Dashboard() {
  const [sliderRef, setSliderRef] = useState(null);
  const dapps = useSelector(selectDapps);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { webauthn } = useAuth();
  const [screenSize] = useMediaQuery("(max-width: 480px)");
  const [firstUser,setFirstuser]=useState();
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    swipeToSlide: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    // className: " variable-width",
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // useEffect(() => {
  //   dispatch(fetchDapps());
  // }, []);
  useEffect(()=>{
    const isFirstVisit = !localStorage.getItem('visited');

    if (isFirstVisit) {
      // First visit: display "Welcome, first-time user!" message
      localStorage.setItem('visited', 'true');
      setFirstuser(true)
    } else {
      // Returning visit: display "Welcome back!" message
      setFirstuser(false)
    }
  },[])

  // useEffect(() => {
  //   if (screenSize && !webauthn) {
  //     dispatch(
  //       openModal({
  //         modal: "WebauthnModal",
  //         props: { tokenName: "LAVA" },
  //       })
  //     );
  //   }
  // }, [webauthn, screenSize]);

  /*DataTable*/

  return (
    <>
      <Box>
        <Box
          mb={"52px"}
          // minH={"px"}
          border={"solid 1px"}
          borderColor={"#3B2864"}
          borderRadius={"16px"}
          backgroundImage={BgWelcome.src}
          backgroundSize={"cover"}
          p={"25px"}
        >
          <Heading mb={"12px"} as={"h3"} size={"md"}>
            Welcome {!firstUser ? "Back!" : ''}
          </Heading>
          {/*<Text maxWidth={{ xl: "600px", lg: "400px", md: "auto" }} fontSize={'16px'}>*/}
          {/*  Elysium is solving many of the problems that have held back*/}
          {/*  blockchain technology so far — all in one place, without*/}
          {/*  compromising.<br/>*/}
          {/*  For smooth experience please connect your <span>mettamask</span> wallet.</Text>*/}
        </Box>
        <Box
          mb={"52px"}
          display={"flex"}
          flexDirection={"column"}
          maxW={"inherit!important"}
          overflow={"hidden"}
        >
          <Heading mb={"20px"} as={"h3"} size={"md"}>
            dApps
          </Heading>
          <Box width={'100%'} padding={'50px'} border={'1px solid #3b2864'} display={"flex"} alignItems={'center'} justifyContent={'center'} borderRadius={'16px'}>
            <Text mb={"20px"} fontSize={"20px"} fontWeight={'bold'}>No Data Available</Text>
          </Box>
          {/*{isLoading ? (*/}
          {/*    <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} mt={'20px'}>*/}
          {/*      <Spinner size="md" />*/}
          {/*    </Flex>*/}
          {/*) : (*/}
          {/*  <Slider ref={setSliderRef} {...settings}>*/}
          {/*    {dapps?.map((dapp, index) => {*/}
          {/*      return (*/}
          {/*        <Box key={index}>*/}
          {/*          <Flex*/}
          {/*            whiteSpace={"nowrap"}*/}
          {/*            mx={"8px"}*/}
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
          {/*              <Image src={generateRandomImage()} alt="Image" />*/}
          {/*            </Circle>*/}
          {/*            {dapp?.title}*/}
          {/*          </Flex>*/}
          {/*        </Box>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </Slider>*/}
          {/*)}*/}
          {/*<Flex pt={"16px"} justifyContent={"end"}>*/}
          {/*  <Button*/}
          {/*    _hover={{ bg: "#3B2864", color: "#fff" }}*/}
          {/*    color={"#513D7B"}*/}
          {/*    mr={"8px"}*/}
          {/*    width={"40px"}*/}
          {/*    height={"40px"}*/}
          {/*    justifyContent={"center"}*/}
          {/*    alignItems={"center"}*/}
          {/*    border={"solid 1px"}*/}
          {/*    borderColor={"#3B2864"}*/}
          {/*    borderRadius={"6px"}*/}
          {/*    bg={"#1E103C"}*/}
          {/*    onClick={sliderRef?.slickPrev}*/}
          {/*  >*/}
          {/*    <ChevronLeftIcon fontSize={"30px"} />*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    _hover={{ bg: "#3B2864", color: "#fff" }}*/}
          {/*    color={"#513D7B"}*/}
          {/*    mr={"8px"}*/}
          {/*    width={"40px"}*/}
          {/*    height={"40px"}*/}
          {/*    justifyContent={"center"}*/}
          {/*    alignItems={"center"}*/}
          {/*    border={"solid 1px"}*/}
          {/*    borderColor={"#3B2864"}*/}
          {/*    borderRadius={"6px"}*/}
          {/*    bg={"#1E103C"}*/}
          {/*    onClick={sliderRef?.slickNext}*/}
          {/*  >*/}
          {/*    <ChevronRightIcon fontSize={"30px"} />*/}
          {/*  </Button>*/}
          {/*</Flex>*/}
        </Box>

        {/* <Flex mb={"17px"}>
          <Heading
            mr={"auto"}
            mb={["20px", "20px", "0", "0"]}
            as={"h3"}
            size={"md"}
          >
            Tokens
          </Heading>
          <FormControl
            maxW={"300px"}
            mr={"16px"}
            mb={["24px", "24px", "0", "0"]}
          >
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
          <Button mb={["24px", "24px", "0", "0"]} variant="outline" size="lg">
            ADD TOKEN
          </Button>
        </Flex> */}

        {/* <DataTable data={data} columns={columns} /> */}
      </Box>
    </>
  );
}
