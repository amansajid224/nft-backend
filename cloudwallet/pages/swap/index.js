import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Text,
  Button,
  Link,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  Circle,
  AlertDescription,
  AlertTitle,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import Header from "../../components/Header";
import Siderbar from "../../components/Siderbar";
import Head from "next/head";
import ProfileBar from "../../components/ProfileBar";
import EthereumLogo from "../../public/ethereum.svg";
import IconEthereum from "../../public/IconEthereum.svg";
import IconPolygon from "../../public/IconPolygon.svg";
import IconUsdc from "../../public/icon-usdc.png";
import IconPYR from "../../public/icon-pyr.png";
import IconGm from "../../public/icon-gm.png";
import { AddIcon, AlertIcon } from "@chakra-ui/icons";

export default function Swap() {
  const {
    isOpen: isOpenSelectToken,
    onOpen: onOpenSelectToken,
    onClose: onCloseSelectToken,
  } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showLiquidity, setShowLiquidity] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const handleLiquidityClick = () => setShowLiquidity(!showLiquidity);

  const { isOpen: isAlert, onClose: onAlertClose } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <>
      <iframe
        id="swap"
        width="100%"
        height="800px"
        src="https://swap.elysiumchain.tech/swap/#swap-page"
        frameborder="0"
        scrolling="no"
      ></iframe>

      {/* <Box maxW={"642px"} mx={"auto"}>
        <Tabs
                variant="borderVariant"
                onChange={(e) => {
                  e === 0 && currentTab === 1
                          ? setShowLiquidity(true)
                          : setShowLiquidity(false);
                }}
        >
          <TabList>
            <Tab>Swap</Tab>
            <Tab>Pool</Tab>
            <Tab>Farms</Tab>
          </TabList>
          {showLiquidity ? (
                  <>
                    <Text textAlign={"right"}>
                      <Link fontWeight={"600"} color={"#9FC131"} fontSize={"14px"}>
                        VIEW LIQUIDITY POSITIONS
                      </Link>
                    </Text>
                    <Box
                            mb={"15px"}
                            bg={"#1E0E3E"}
                            border={"1px solid"}
                            borderColor={"#35245A"}
                            color={"#ADA7B7"}
                            borderRadius={"24px"}
                            fontSize={"16px"}
                            p={"16px"}
                    >
                      <Text color={"#fff"} fontSize={"18px"} fontWeight={"600"}>
                        Tip:
                      </Text>
                      By adding liquidity you’ll earn 0.2% of all trades on this
                      pair proportional to your share of the pool. Fees are added to
                      the pool, accrue in real time and can be claimed by
                      withdrawing your liquidity.
                    </Box>
                  </>
          ) : (
                  ""
          )}
          <TabPanels>
            <TabPanel>
              <Box
                      border={"1px solid"}
                      borderColor={"#35245A"}
                      bg={"#140533"}
                      borderRadius={"26px"}
                      padding={{ sm: "30px 12px", md: "30px"}}
              >
                <Tabs
                        variant="simpleVariant"
                        onChange={(e) => {
                          setCurrentTab(e);
                          setShowLiquidity(false);
                        }}
                >
                  <TabList>
                    <Tab>Swap</Tab>
                    <Tab onClick={handleLiquidityClick}>Liquidity</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                      >
                        <Button
                                onClick={onOpenSelectToken}
                                display="flex"
                                className={"Archivo"}
                                fontWeight={"500"}
                                color={"#fff"}
                                fontSize={"14px"}
                                bg={"#140533"}
                                _hover={{ bg: "#372554" }}
                                borderRadius={"6px"}
                                p={"7px"}
                                mb={"22px"}
                                border={"solid 1px"}
                                borderColor={"#3B2864"}
                        >
                          <Image
                                  bg={"#513D7B"}
                                  h={"24px"}
                                  me={"8px"}
                                  w={"24px"}
                                  objectFit={"contain"}
                                  src={EthereumLogo.src}
                                  alt="Network Icon"
                                  p={"4px"}
                          />
                          <Text
                                  isTruncated
                                  noOfLines={1}
                                  display="block"
                                  textAlign={"left"}
                                  w={"50px"}
                          >
                            ETH
                          </Text>
                          <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                          >
                            <g transform="translate(0.409)">
                              <g transform="translate(16.611 9.001) rotate(90)">
                                <path
                                        d="M0,5.7a.685.685,0,0,1-.486-.2.688.688,0,0,1,0-.972l5.01-5.01a.687.687,0,0,1,.972,0,.688.688,0,0,1,0,.972L.486,5.5A.685.685,0,0,1,0,5.7Z"
                                        transform="translate(0 5.01)"
                                        fill="#fff"
                                />
                                <path
                                        d="M5.01,5.7a.685.685,0,0,1-.486-.2L-.486.486a.688.688,0,0,1,0-.972.687.687,0,0,1,.972,0L5.5,4.524A.688.688,0,0,1,5.01,5.7Z"
                                        fill="#fff"
                                />
                              </g>
                            </g>
                          </svg>
                        </Button>
                        <Flex>
                          <Heading size={"sm"} me={"16px"}>
                            100
                          </Heading>
                          <Text fontSize={"14px"} color={"#5C498E"}>
                            $115,974.9
                          </Text>
                          <Text
                                  ms={"auto"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            Balance: 0.00
                          </Text>
                        </Flex>
                      </Box>
                      <Circle
                              mx={"auto"}
                              my={"-10px"}
                              position={"Relative"}
                              bg={"#140533"}
                              border={"1px solid"}
                              borderColor={"#3B2864"}
                              width={"48px"}
                              height={"48px"}
                      >
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.143"
                                height="18"
                                viewBox="0 0 14.143 18"
                        >
                          <g
                                  id="transfer"
                                  transform="translate(-51.198 18) rotate(-90)"
                          >
                            <g transform="translate(0 51.198)">
                              <path
                                      d="M17.812,55.887l-4.5-4.5a.643.643,0,0,0-1.1.455V53.77h-4.5a.643.643,0,0,0,0,1.286h5.143a.643.643,0,0,0,.643-.643v-1.02l2.948,2.948L13.5,59.289V58.27a.643.643,0,0,0-.643-.643H5.785V55.7a.643.643,0,0,0-1.1-.454l-4.5,4.5a.643.643,0,0,0,0,.909l4.5,4.5a.643.643,0,0,0,.455.188.635.635,0,0,0,.246-.049.643.643,0,0,0,.4-.594V62.77h4.5a.643.643,0,0,0,0-1.286H5.143a.643.643,0,0,0-.643.643v1.02L1.551,60.2,4.5,57.25v1.02a.643.643,0,0,0,.643.643h7.072v1.929a.643.643,0,0,0,1.1.455l4.5-4.5A.643.643,0,0,0,17.812,55.887Z"
                                      transform="translate(0 -51.198)"
                                      fill="#fff"
                              />
                            </g>
                          </g>
                        </svg>
                      </Circle>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              mb={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                      >
                        <Button
                                onClick={onOpenSelectToken}
                                display="flex"
                                className={"Archivo"}
                                fontWeight={"500"}
                                color={"#fff"}
                                fontSize={"14px"}
                                bg={"#140533"}
                                _hover={{ bg: "#372554" }}
                                borderRadius={"6px"}
                                p={"7px"}
                                mb={"22px"}
                                border={"solid 1px"}
                                borderColor={"#3B2864"}
                        >
                          <Image
                                  bg={"#513D7B"}
                                  h={"24px"}
                                  me={"8px"}
                                  w={"24px"}
                                  objectFit={"contain"}
                                  src={IconPolygon.src}
                                  alt="Network Icon"
                                  p={"4px"}
                          />
                          <Text
                                  isTruncated
                                  noOfLines={1}
                                  display="block"
                                  textAlign={"left"}
                                  w={"50px"}
                          >
                            MATIC
                          </Text>
                          <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                          >
                            <g transform="translate(0.409)">
                              <g transform="translate(16.611 9.001) rotate(90)">
                                <path
                                        d="M0,5.7a.685.685,0,0,1-.486-.2.688.688,0,0,1,0-.972l5.01-5.01a.687.687,0,0,1,.972,0,.688.688,0,0,1,0,.972L.486,5.5A.685.685,0,0,1,0,5.7Z"
                                        transform="translate(0 5.01)"
                                        fill="#fff"
                                />
                                <path
                                        d="M5.01,5.7a.685.685,0,0,1-.486-.2L-.486.486a.688.688,0,0,1,0-.972.687.687,0,0,1,.972,0L5.5,4.524A.688.688,0,0,1,5.01,5.7Z"
                                        fill="#fff"
                                />
                              </g>
                            </g>
                          </svg>
                        </Button>
                        <Flex>
                          <Heading size={"sm"} me={"16px"}>
                            100
                          </Heading>
                          <Text
                                  me={"10px"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            $115,974.9
                          </Text>
                          <Text fontSize={"14px"} color={"#9FC131"}>
                            (-2.3%)
                          </Text>
                          <Text
                                  ms={"auto"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            Balance: 0.00
                          </Text>
                        </Flex>
                      </Box>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                              mb={"15px"}
                      >
                        <Flex>
                          1 MATIC = 0.0003872 ETH ($0.4405)
                          <Button
                                  ml={"auto"}
                                  variant="link"
                                  onClick={handleClick}
                          >
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                            >
                              <g transform="translate(0.409)">
                                <g transform="translate(16.611 9.001) rotate(90)">
                                  <path
                                          d="M0,5.7a.685.685,0,0,1-.486-.2.688.688,0,0,1,0-.972l5.01-5.01a.687.687,0,0,1,.972,0,.688.688,0,0,1,0,.972L.486,5.5A.685.685,0,0,1,0,5.7Z"
                                          transform="translate(0 5.01)"
                                          fill="#fff"
                                  />
                                  <path
                                          d="M5.01,5.7a.685.685,0,0,1-.486-.2L-.486.486a.688.688,0,0,1,0-.972.687.687,0,0,1,.972,0L5.5,4.524A.688.688,0,0,1,5.01,5.7Z"
                                          fill="#fff"
                                  />
                                </g>
                              </g>
                            </svg>
                          </Button>
                        </Flex>
                        {show ? (
                                <>
                                  <Flex
                                          mt={"10px"}
                                          justifyContent={"space-between"}
                                  >
                                    <Text fontSize={"14px"} color={"#5C498E"}>
                                      Expected Output
                                    </Text>
                                    <Text
                                            fontSize={"14px"}
                                            fontWeight={"bold"}
                                            color={"#fff"}
                                            align={"right"}
                                    >
                                      259076 MATIC
                                    </Text>
                                  </Flex>
                                  <Flex
                                          mb={"10px"}
                                          justifyContent={"space-between"}
                                  >
                                    <Text fontSize={"14px"} color={"#5C498E"}>
                                      Price Impact
                                    </Text>
                                    <Text
                                            fontSize={"14px"}
                                            fontWeight={"bold"}
                                            color={"#9FC131"}
                                            align={"right"}
                                    >
                                      -2.00%
                                    </Text>
                                  </Flex>
                                  <Flex justifyContent={"space-between"}>
                                    <Text fontSize={"14px"} color={"#5C498E"}>
                                      Minimum received after slippage (0.50%)
                                    </Text>
                                    <Text
                                            fontSize={"14px"}
                                            fontWeight={"bold"}
                                            color={"#fff"}
                                            align={"right"}
                                    >
                                      259076 MATIC
                                    </Text>
                                  </Flex>
                                  <Flex justifyContent={"space-between"}>
                                    <Text fontSize={"14px"} color={"#5C498E"}>
                                      Gas fee
                                    </Text>
                                    <Text
                                            fontSize={"14px"}
                                            fontWeight={"bold"}
                                            color={"#9FC131"}
                                            align={"right"}
                                    >
                                      30.00%
                                    </Text>
                                  </Flex>
                                </>
                        ) : (
                                ""
                        )}
                      </Box>
                      <Button w={"100%"} variant="solid" size="lg">
                        SWAP
                      </Button>
                    </TabPanel>
                    <TabPanel>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                      >
                        <Button
                                onClick={onOpenSelectToken}
                                display="flex"
                                className={"Archivo"}
                                fontWeight={"500"}
                                color={"#fff"}
                                fontSize={"14px"}
                                bg={"#140533"}
                                _hover={{ bg: "#372554" }}
                                borderRadius={"6px"}
                                p={"7px"}
                                mb={"22px"}
                                border={"solid 1px"}
                                borderColor={"#3B2864"}
                        >
                          <Image
                                  bg={"#513D7B"}
                                  h={"24px"}
                                  me={"8px"}
                                  w={"24px"}
                                  objectFit={"contain"}
                                  src={EthereumLogo.src}
                                  alt="Network Icon"
                                  p={"4px"}
                          />
                          <Text
                                  isTruncated
                                  noOfLines={1}
                                  display="block"
                                  textAlign={"left"}
                                  w={"50px"}
                          >
                            ETH
                          </Text>
                          <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                          >
                            <g transform="translate(0.409)">
                              <g transform="translate(16.611 9.001) rotate(90)">
                                <path
                                        d="M0,5.7a.685.685,0,0,1-.486-.2.688.688,0,0,1,0-.972l5.01-5.01a.687.687,0,0,1,.972,0,.688.688,0,0,1,0,.972L.486,5.5A.685.685,0,0,1,0,5.7Z"
                                        transform="translate(0 5.01)"
                                        fill="#fff"
                                />
                                <path
                                        d="M5.01,5.7a.685.685,0,0,1-.486-.2L-.486.486a.688.688,0,0,1,0-.972.687.687,0,0,1,.972,0L5.5,4.524A.688.688,0,0,1,5.01,5.7Z"
                                        fill="#fff"
                                />
                              </g>
                            </g>
                          </svg>
                        </Button>
                        <Flex>
                          <Heading size={"sm"} me={"16px"}>
                            100
                          </Heading>
                          <Text fontSize={"14px"} color={"#5C498E"}>
                            $115,974.9
                          </Text>
                          <Text
                                  ms={"auto"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            Balance: 0.00
                          </Text>
                        </Flex>
                      </Box>
                      <Circle
                              mx={"auto"}
                              my={"-10px"}
                              position={"Relative"}
                              bg={"#140533"}
                              border={"1px solid"}
                              borderColor={"#3B2864"}
                              width={"48px"}
                              height={"48px"}
                      >
                        <AddIcon />
                      </Circle>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              mb={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                      >
                        <Button
                                onClick={onOpenSelectToken}
                                display="flex"
                                className={"Archivo"}
                                fontWeight={"500"}
                                color={"#fff"}
                                fontSize={"14px"}
                                bg={"#140533"}
                                _hover={{ bg: "#372554" }}
                                borderRadius={"6px"}
                                p={"7px"}
                                mb={"22px"}
                                border={"solid 1px"}
                                borderColor={"#3B2864"}
                        >
                          <Image
                                  bg={"#513D7B"}
                                  h={"24px"}
                                  me={"8px"}
                                  w={"24px"}
                                  objectFit={"contain"}
                                  src={IconPolygon.src}
                                  alt="Network Icon"
                                  p={"4px"}
                          />
                          <Text
                                  isTruncated
                                  noOfLines={1}
                                  display="block"
                                  textAlign={"left"}
                                  w={"50px"}
                          >
                            MATIC
                          </Text>
                          <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                          >
                            <g transform="translate(0.409)">
                              <g transform="translate(16.611 9.001) rotate(90)">
                                <path
                                        d="M0,5.7a.685.685,0,0,1-.486-.2.688.688,0,0,1,0-.972l5.01-5.01a.687.687,0,0,1,.972,0,.688.688,0,0,1,0,.972L.486,5.5A.685.685,0,0,1,0,5.7Z"
                                        transform="translate(0 5.01)"
                                        fill="#fff"
                                />
                                <path
                                        d="M5.01,5.7a.685.685,0,0,1-.486-.2L-.486.486a.688.688,0,0,1,0-.972.687.687,0,0,1,.972,0L5.5,4.524A.688.688,0,0,1,5.01,5.7Z"
                                        fill="#fff"
                                />
                              </g>
                            </g>
                          </svg>
                        </Button>
                        <Flex>
                          <Heading size={"sm"} me={"16px"}>
                            100
                          </Heading>
                          <Text
                                  me={"10px"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            $115,974.9
                          </Text>
                          <Text fontSize={"14px"} color={"#9FC131"}>
                            (-2.3%)
                          </Text>
                          <Text
                                  ms={"auto"}
                                  fontSize={"14px"}
                                  color={"#5C498E"}
                          >
                            Balance: 0.00
                          </Text>
                        </Flex>
                      </Box>
                      <Box
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              borderRadius={"16px"}
                              padding={{ sm: "24px 12px", md: "24px"}}
                              mb={"15px"}
                      >
                        <Flex justifyContent={"space-between"}>
                          <Text fontSize={"14px"} color={"#5C498E"}>
                            343.451 MATIC per ETH
                          </Text>
                          <Text
                                  fontSize={"14px"}
                                  fontWeight={"bold"}
                                  color={"#fff"}
                                  align={"right"}
                          >
                            57.25%
                          </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                          <Text fontSize={"14px"} color={"#5C498E"}>
                            0.00291162 ETH per MAtIC
                          </Text>
                          <Text fontSize={"14px"} fontWeight={"bold"} align={"right"}>
                            Share of Pool
                          </Text>
                        </Flex>
                      </Box>
                      <Button w={"100%"} variant="solid" size="lg">
                        APPROVE TOKEN
                      </Button>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </TabPanel>
            <TabPanel>
              <Heading align={"center"} mb={"20px"} as={"h3"} size={"md"}>
                My Liquidity Positions
              </Heading>
              <Heading align={"center"} mb={"40px"} as={"h6"} size={"xs"}>
                Stake LP tokens to earn.
              </Heading>
              {isAlert && (
                      <Alert
                              mb={"15px"}
                              bg={"#1E0E3E"}
                              border={"1px solid"}
                              borderColor={"#35245A"}
                              color={"#ADA7B7"}
                              borderRadius={"24px"}
                              fontSize={"16px"}
                              p={"16px"}
                      >
                        <Box>
                          <AlertTitle mb={"10px"} fontSize={"18px"} color={"#fff"}>
                            Liquidity Provider Rewards
                          </AlertTitle>
                          <AlertDescription>
                            Liquidity providers earn a 0.2% fee on all trades
                            proportional to their share of the pool. 0.1% is sent to
                            support the growth of the project. Fees are added to the
                            pool, accrue in real time and can be claimed by
                            withdrawing your liquidity.
                          </AlertDescription>
                        </Box>
                        <CloseButton
                                alignSelf="flex-start"
                                position="relative"
                                right={-1}
                                top={-1}
                                onClick={onAlertClose}
                        />
                      </Alert>
              )}

              <Box
                      mb={"15px"}
                      bg={"#1E0E3E"}
                      border={"1px solid"}
                      borderColor={"#35245A"}
                      color={"#fff"}
                      borderRadius={"24px"}
                      fontSize={"16px"}
                      textAlign={"center"}
                      p={"16px"}
              >
                <Text my={"100px"}>No liquidity was found.</Text>
                <Flex gap={"20px"}>
                  <Button
                          w={"100%"}
                          height={"48px"}
                          variant="solid"
                          size="lg"
                  >
                    ADD
                  </Button>
                  <Button
                          w={"100%"}
                          height={"48px"}
                          variant="outline"
                          size="lg"
                  >
                    IMPORT
                  </Button>
                </Flex>
              </Box>
            </TabPanel>
            <TabPanel>
              <Heading align={"center"} mb={"20px"} as={"h3"} size={"md"}>
                Farms
              </Heading>
              <Heading align={"center"} mb={"40px"} as={"h6"} size={"xs"}>
                Stake LP tokens to earn.
              </Heading>

              <Box
                      mb={"15px"}
                      bg={"#1E0E3E"}
                      border={"1px solid"}
                      borderColor={"#35245A"}
                      color={"#fff"}
                      borderRadius={"24px"}
                      fontSize={"16px"}
                      textAlign={"center"}
                      p={{ sm: "16px 0", md: "16px"}}
              >
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex
                          p={{ sm: "15px 12px", md: "15px 20px"}}
                          borderBottom={"1px solid"}
                          borderColor={"#3B2864"}
                          gap={{ sm: "10px", md: "20px"}}
                          alignItems={"center"}
                  >
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
                <Link _hover={{ textDecoration: "none" }}>
                  <Flex p={{ sm: "15px 12px", md: "15px 20px"}} gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> PYR
                    </Flex>
                    <Text color={"#5C498E"}>-</Text>
                    <Flex gap={{ sm: "10px", md: "20px"}} alignItems={"center"}>
                      <Image src={IconPYR.src} /> MATIC
                    </Flex>
                    <Flex fontSize={"14px"} color={"#5C498E"} ms={"auto"} alignItems={"center"}>
                      No. of Pools{" "}
                      <Text fontSize={"18px"} ms={"10px"} color={"#fff"}>
                        02
                      </Text>
                    </Flex>
                  </Flex>
                </Link>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Modal */}
      {/* size={"xl"}
        isCentered
        isOpen={isOpenSelectToken}
        onClose={onCloseSelectToken}
      >
        <ModalOverlay bg={"rgba(41,25,74,0.80)"} backdropFilter="blur(10px)" />
        <ModalContent
          bg={"#241446"}
          borderRadius={"24px"}
          border={"1px solid"}
          borderColor={"#3B2864"}
          p={"25px"}
        >
          <ModalHeader
            mb={"20px"}
            p={0}
            className={"Archivo"}
            fontSize={"24px"}
            fontWeight={"bold"}
          >
            Select a Token
          </ModalHeader>
          <ModalCloseButton
            fontSize={"15px"}
            mt={2}
            _focus={{ boxShadow: "none" }}
            color={"#ada7b7"}
          />
          <ModalBody p={0}>
            <Button
              justifyContent={"start"}
              className={"Archivo"}
              as="button"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              border="1px"
              px="38px"
              height={"66px"}
              borderRadius="12px"
              fontSize="20px"
              fontWeight="500"
              textTransform="inherit"
              bg="#140533"
              borderColor="#3B2864"
              color="#fff"
              width={"100%"}
              mb={"16px"}
              _hover={{ bg: "#9FC131" }}
              _active={{
                bg: "#9FC131",
                transform: "scale(0.98)",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Image
                maxW={"35px"}
                mr={"16px"}
                src={IconEthereum.src}
                alt="Meta Mask"
              />
              MetaMask
            </Button>
            <Button
              justifyContent={"start"}
              className={"Archivo"}
              as="button"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              border="1px"
              px="38px"
              height={"66px"}
              borderRadius="12px"
              fontSize="20px"
              fontWeight="500"
              textTransform="inherit"
              bg="#140533"
              borderColor="#3B2864"
              color="#fff"
              width={"100%"}
              _hover={{ bg: "#9FC131" }}
              _active={{
                bg: "#9FC131",
                transform: "scale(0.98)",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Image
                maxW={"35px"}
                mr={"16px"}
                src={IconPolygon.src}
                alt="Meta Mask"
              />
              Polygon (Matic)
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
}
