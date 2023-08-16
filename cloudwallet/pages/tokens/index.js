import { useEffect, useState } from "react";
import { useToast, Box } from "@chakra-ui/react";

import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emptySuccess,
  fetchTokens,
  selectError,
  selectIsError,
  selectSuccess,
} from "../../store/slices/TokenSlice";
import { TokenTable } from "../../containers/table/tokenTable";

export default function Tokens() {
  const dispatch = useDispatch();
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const toast = useToast();
  // useEffect(() => {
  //   dispatch(fetchTokens());
  // }, []);
  useEffect(() => {
    if (isError) {
      toast({
        title: error ? error?.message : "Something went wrong",
        isClosable: true,
        status: "error",
      });
    }
  }, [isError, error]);
  // useEffect(() => {
  //   if (success !== null) {
  //     toast({
  //       title: success,
  //       isClosable: true,
  //       status: "success",
  //     });
  //   }
  //   dispatch(emptySuccess);
  // }, [success]);

  return (
    <>
      <TokenTable/>
    </>
  );
}
