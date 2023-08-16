import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Link,
  Icon,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import React from "react";

import { useRouter } from "next/router";

import LogoCompact from "../public/elysium-logo-compact.svg";
import LogoCompactMbl from "../public/elysium-icon-512x512.png";
import NextLink from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { UseOnClickOutside } from "../utils";
import { useSideBarContext } from "../context/sideBarContext";
import {useWeb3Context} from "../context/web3Context";
import Cookies from "js-cookie";

const SideBar = React.forwardRef((props, ref) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobile, setMobile] = useState(true);
  const { toggleSideBar, setToggleSideBar } = useSideBarContext();
    const { disconnect } =
        useWeb3Context();

  const SidebarContent = () => (
    <>
      <VStack h={"calc(100vh - 100px)"} pb={"10px"} alignItems={"start"}>
        <NextLink
          href="/dashboard"
          className={router.asPath === "/dashboard" ? "link active" : "link"}
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-dashboard" style={{ marginRight: "10px" }}></i>
            DASHBOARD
          </Box>
        </NextLink>
        {/* <NextLink
          href="/wallet"
          className={router.asPath === "/wallet" ? "link active" : "link"}
        >
          <i className="icon-wallet" style={{ marginRight: "10px" }}></i>WALLET
        </NextLink> */}
        <NextLink
          href="/tokens"
          className={
            router.pathname.startsWith("/tokens") ? "link active" : "link"
          }
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-token" style={{ marginRight: "10px" }}></i>TOKENS
          </Box>
        </NextLink>
          <NextLink
              href={'/nft'}
              // href={Cookies.get("nftId") ? `/nft?nftId=${Cookies.get("nftId")}` : "/nft"}
              className={
              router.pathname.startsWith("/nft") ? "link active" : "link"}
              // className={router.asPath === "/nft" ? "link active" : "link"}
          >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-nft" style={{ marginRight: "10px" }}></i>NFT
          </Box>
        </NextLink>
        <NextLink
          href="/dapps"
          className={router.asPath === "/dapps" ? "link active disabled-dapps" : "link disabled-dapps"}
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-dapps" style={{ marginRight: "10px" }}></i>DAPPS
          </Box>
        </NextLink>
        <Link
          href="https://myforge.vulcanforged.com/StakingProgram"
          textDecoration="none"
          target="_blank"
          className={
            router.asPath === "/staking-rewards" ? "link active" : "link"
          }
          _hover={{ textDecoration: "none" }}
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-rewards" style={{ marginRight: "10px" }}></i>
            STAKING REWARDS
          </Box>
        </Link>
        {/*<Link*/}
        {/*  href="https://swap.elysiumchain.tech/swap"*/}
        {/*  textDecoration="none"*/}
        {/*  target="_blank"*/}
        {/*  className={*/}
        {/*    router.asPath === "/staking-rewards" ? "link active" : "link"*/}
        {/*  }*/}
        {/*  _hover={{ textDecoration: "none" }}*/}
        {/*>*/}
        {/*  <Box*/}
        {/*    onClick={() => {*/}
        {/*      setTimeout(() => {*/}
        {/*        setToggleSideBar(false);*/}
        {/*      }, 1000);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <i className="icon-swap" style={{ marginRight: "10px" }}></i>*/}
        {/*    SWAP*/}
        {/*  </Box>*/}
        {/*</Link>*/}
        {/*<Link*/}
        {/*  href="https://bridge.elysiumchain.tech/"*/}
        {/*  textDecoration="none"*/}
        {/*  target="_blank"*/}
        {/*  className={*/}
        {/*    router.asPath === "/staking-rewards" ? "link active" : "link"*/}
        {/*  }*/}
        {/*  _hover={{ textDecoration: "none" }}*/}
        {/*>*/}
        {/*  <Box*/}
        {/*    onClick={() => {*/}
        {/*      setTimeout(() => {*/}
        {/*        setToggleSideBar(false);*/}
        {/*      }, 1000);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <i className="icon-bridge" style={{ marginRight: "10px" }}></i>*/}
        {/*    BRIDGE*/}
        {/*  </Box>*/}
        {/*</Link>*/}
        <NextLink
          href="/contact-book"
          className={router.asPath === "/contact-book" ? "link active" : "link"}
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-contact" style={{ marginRight: "10px" }}></i>
            CONTACT BOOK
          </Box>
        </NextLink>
        <NextLink
          href="/settings"
          className={router.asPath === "/settings" ? "link active" : "link"}
        >
          <Box
            onClick={() => {
              setTimeout(() => {
                setToggleSideBar(false);
              }, 1000);
            }}
          >
            <i className="icon-gear" style={{ marginRight: "10px" }}></i>
            SETTINGS
          </Box>
        </NextLink>
        <Button
          mt={"auto !important"}
          display={"flex"}
          alignItems={"start"}
          justifyContent={"start"}
          role="group"
          p={"10px 15px 10px 20px"}
          w="100%"
          fontWeight={"normal"}
          fontFamily={"Roboto"}
          fontSize={"16px"}
          borderColor="transparent"
          color="#fff"
          borderRadius="6px"
          _hover={{
            bg: "#241446",
            color: "#9fc131",
            borderColor: "#3b2864 !important",
            border: "1px",
          }}
          onClick={(e) =>{
              e.preventDefault();
              disconnect();
              logout();

          }}
        >
          <i className="icon-logout" style={{ marginRight: "10px" }}></i>
          LOG OUT
        </Button>
      </VStack>
    </>
  );

  return (
    <>
      <Box
        position={{
          xl: "fixed",
          lg: "absolute",
          md: "absolute",
          sm: "absolute",
        }}
        w="auto"
        top={0}
        h={{
          sm: `${!mobile ? "auto" : "100%"}`,
        }}
        bg={{
          sm: `${!mobile ? "#241446" : "transparent"}`,
          lg: `${!mobile ? "#241446" : "transparent"}`,
        }}
        className={props.className}
        display={{ sm: "none", md: "none", lg: "none", xl: "block" }}
      >
        <NextLink href="/dashboard">
          <Image
            pr={"10px"}
            my={"25px"}
            w={"100%"}
            maxW={"180px"}
            src="/elysium-logo-compact.svg"
            alt="Elysium"
            display={{ sm: "none", md: "none", lg: "none", xl: "block" }}
          />
        </NextLink>
        <SidebarContent />
      </Box>
      <Drawer
        isOpen={toggleSideBar}
        placement="left"
        onClose={() => setToggleSideBar(false)}
      >
        <DrawerOverlay>
          <DrawerContent bg="#140533">
            <DrawerCloseButton />
            <DrawerHeader>
              <Image
                w={"100%"}
                maxW={"200px"}
                mb={["17px"]}
                src={LogoCompact.src}
                alt="Elysium"
              />
            </DrawerHeader>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});

export default SideBar;
