import { Grid, GridItem } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useEffect, useRef, useState } from "react";
import ProfileBar from "./ProfileBar";
import Siderbar from "./Siderbar";
import { Box, Button, Flex } from "@chakra-ui/react";
import Header from "./Header";
import { SideBarProvider, useSideBarContext } from "../context/sideBarContext";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { fetchNativeTokenPrice } from "../store/slices/TokenSlice";
import { fetchDapps } from "../store/slices/DappSlice";
import { closeModal, openModal } from "../store/slices/ModalSlice";
import dynamic from "next/dynamic";
const Tour = dynamic(() => import("./tour"), { ssr: false });
const MobileProfileBar = () => {
  const { toggleProfile, setToggleProfile } = useSideBarContext();
  const [screenSize] = useMediaQuery("(max-width: 480px)");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNativeTokenPrice());
    // dispatch(fetchDapps());
  }, []);


  return (
    <Drawer
      isOpen={toggleProfile}
      placement="right"
      onClose={() => setToggleProfile(false)}
    >
      <DrawerOverlay />
      <DrawerContent bg="#241446">
        <DrawerCloseButton />
        <DrawerBody>
          <ProfileBar withoutBorder={true} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default function Layout({ children }) {

  const [tour,setTour]= useState(false);
  useEffect(()=>{
    const isFirstVisit = !localStorage.getItem('tour');

    if (isFirstVisit) {
      // First visit: display "Welcome, first-time user!" message
      localStorage.setItem('tour', 'false');
      setTour(true)
    } else {
      // Returning visit: display "Welcome back!" message
      setTour(false)
    }
  },[])
  return (
    <>
      <SideBarProvider>
        <Box px={"15px"} minH={"100vh"} >
          <Header className={'hero-header'}/>
          <Flex
            alignItems={"start"}
            flexWrap={{ sm: "wrap", md: "wrap", lg: "wrap", xl: "nowrap" }}
          >
            {/*{tour ? <Tour/>:""}*/}
            <Siderbar className={'sideBar'}  />
            <Box
              w={"100%"}
              ml={[0, 0, 0, 0, "207px"]}
              flex="1"
              px={[0, 0, 0, 0, "20px"]}
            >
              {children}
            </Box>
            <Box
              pos="sticky"
              top={"15px"}
              ml={"auto"}
              display={{ sm: "none", xl: "block" }}
            >
              <ProfileBar className={"profile-bar"} />
            </Box>
            <MobileProfileBar />
          </Flex>
        </Box>
      </SideBarProvider>

    </>
  );
}
