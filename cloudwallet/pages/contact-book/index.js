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
  Icon,
  Modal,
  useToast,
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

import { ContactsTable } from "../../containers/table/contactsTable";
import { TableContextProvider } from "../../context/TableContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSuccessMessage,
  selectContacts,
  selectError,
  selectIsError,
  selectSuccess,
} from "../../store/slices/ContactSlice";

export default function Dashboard() {
  const [sliderRef, setSliderRef] = useState(null);
  const toast = useToast();
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
  const isError = useSelector(selectIsError);
  const contactError = useSelector(selectError);
  const contactSuccess = useSelector(selectSuccess);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast({
        title: contactError ? contactError?.message : "Something went wrong",
        isClosable: true,
        status: "error",
      });
    }
  }, [isError, contactError]);

  useEffect(() => {
    if (contactSuccess !== null) {
      toast({
        title: contactSuccess,
        isClosable: true,
        status: "success",
      });
    }
    dispatch(deleteSuccessMessage());
  }, [contactSuccess]);

  return (
    <TableContextProvider>
      <ContactsTable />
    </TableContextProvider>
  );
}
