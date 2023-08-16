import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  InputLeftElement,
  InputGroup,
  FormControl,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Input,
  Image,
  Circle,
  Spinner,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import Header from "../../components/Header";
import Siderbar from "../../components/Siderbar";
import Head from "next/head";
import ProfileBar from "../../components/ProfileBar";

import NftImg1 from "../../public/nft-img-1.png";
import NftImg2 from "../../public/nft-img-2.png";
import NftImg3 from "../../public/nft-img-3.png";
import NftImg4 from "../../public/nft-img-4.png";

import React, { Component } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDapps,
  selectDapps,
  selectIsLoading,
} from "../../store/slices/DappSlice";
import { generateRandomImage } from "../../utils";

//import { cardTheme } from '../../components/card'

export default function Tokens() {
  const PageLength = [
    { value: "0", label: "Sort by" },
    { value: "1", label: "Ascending" },
    { value: "2", label: "Descending" },
  ];
  const dispatch = useDispatch();
  const dapps = useSelector(selectDapps);
  const isLoading = useSelector(selectIsLoading);

  // useEffect(() => {
  //   dispatch(fetchDapps());
  // }, []);
  return (
    <>
      <Flex mb={"17px"}>
        <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
        >
          Supported dApps
        </Heading>
      </Flex>
      <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
      >
        No data Available
      </Heading>
      {/*{isLoading ?*/}
      {/*    <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} mt={'20px'}>*/}
      {/*      <Spinner size="md" />*/}
      {/*    </Flex>*/}
      {/*  : ""}*/}
      {/*<SimpleGrid spacing={4} columns={[1, 2, 4, 6]} mb={5}>*/}

      {/*  {!isLoading && dapps.length <= 0 ? "No Record Found" : ""}*/}
      {/*  {!isLoading && dapps.map((dapp, index) => {*/}
      {/*    return (*/}
      {/*      <Flex*/}
      {/*        whiteSpace={"nowrap"}*/}
      {/*        fontSize={"16px"}*/}
      {/*        flexDirection={"column"}*/}
      {/*        justifyContent={"center"}*/}
      {/*        alignItems={"center"}*/}
      {/*        border={"solid 1px"}*/}
      {/*        borderColor={"#3B2864"}*/}
      {/*        borderRadius={"16px"}*/}
      {/*        bg={"#241446"}*/}
      {/*        p={"20px"}*/}
      {/*      >*/}
      {/*        <Circle*/}
      {/*          flexDirection={"column"}*/}
      {/*          justifyContent={"center"}*/}
      {/*          alignItems={"center"}*/}
      {/*          mb={"12px"}*/}
      {/*          boxSize={"80px"}*/}
      {/*          bg={"#3B2864"}*/}
      {/*        >*/}
      {/*          <Image*/}
      {/*            width={"52px"}*/}
      {/*            height={"52px"}*/}
      {/*            objectFit={"contain"}*/}
      {/*            src={generateRandomImage()}*/}
      {/*            alt="Image"*/}
      {/*          />*/}
      {/*        </Circle>*/}
      {/*        {dapp?.title}*/}
      {/*      </Flex>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</SimpleGrid>*/}
    </>
  );
}
