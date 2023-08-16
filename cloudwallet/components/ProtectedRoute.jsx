import { Spinner } from "@chakra-ui/spinner";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const publicRoutes = [
    "/",
  ];

  useEffect(() => {
    if (isEmpty(user) && token === null) {
      switch (router.pathname) {
        case "/":
          break;
        default:
          router.push("/");
      }
    } else if (
      !isEmpty(user) &&
      token !== null &&
      publicRoutes.includes(router.pathname.split("/")[2] || router.pathname)
    ) {
      router.push("/dashboard");
    }
  }, [router, user]);
  if (loading || !token) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return children;
};

export default ProtectedRoute;
