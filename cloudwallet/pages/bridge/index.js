import { useState } from "react";
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
  Checkbox,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  Circle,
  Stack,
  FormControl,
  Input,
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
import IconPYR from "../../public/icon-pyr.png";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

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

      <Box maxW={"642px"} mx={"auto"}>
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
              <Tab>ERC20</Tab>
              <Tab>ERC721</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                        border="1px"
                        borderColor="#35245A"
                        borderRadius="8px"
                        p={{ sm: "16px 12px", md: "16px"}}
                        bg={"rgba(30,14,62,0.65)"}
                >
                  <Box
                          borderBottomWidth="1px"
                          borderColor="#35245A"
                          pb={4}
                          mb={4}
                  >
                    <Text fontSize={"14px"} mb={1} color={"#9EA5B4"}>
                      From
                    </Text>
                    <Button
                            p={"0"}
                            color={"#fff"}
                            bg={"none"}
                            border={"0"}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            _focus={{ boxShadow: "none" }}
                    >
                      <Flex
                              me={"10px"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              borderRadius="full"
                              bg={"#35245A"}
                              w={"34px"}
                              h={"34px"}
                      >
                        <svg
                                id="Group_20917"
                                data-name="Group 20917"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.844"
                                height="19.301"
                                viewBox="0 0 11.844 19.301"
                        >
                          <g
                                  id="Group_20911"
                                  data-name="Group 20911"
                                  transform="translate(0.007)"
                          >
                            <path
                                    id="Path_44327"
                                    data-name="Path 44327"
                                    d="M101.486,171.049a.025.025,0,0,1,0,.011.862.862,0,0,1,.007.159q-.061,3.4-.122,6.808a.728.728,0,0,1-.006.118c-.008.038-.041.051-.071.065-.2.09-.4.176-.6.263l-.853.369-1.016.44-.836.363-1,.433-.847.368c-.23.1-.46.2-.69.3a.112.112,0,0,1-.057.014.023.023,0,0,1-.016-.007c.09-.142.18-.283.269-.425l1.529-2.437,1.642-2.618,1.52-2.422,1.107-1.766a.082.082,0,0,0,.021-.048h.012A.031.031,0,0,1,101.486,171.049Z"
                                    transform="translate(-95.375 -171.034)"
                                    fill="#fff"
                            />
                          </g>
                          <g
                                  id="Group_20912"
                                  data-name="Group 20912"
                                  transform="translate(5.851 7.138)"
                          >
                            <path
                                    id="Path_44328"
                                    data-name="Path 44328"
                                    d="M125.157,202.89l0,0,0,0v.012l-1.425.809-4.483,2.544-.052.027c-.028,0-.027-.025-.029-.043a.519.519,0,0,1,0-.083q.053-2.963.106-5.927a.453.453,0,0,1,.007-.1c.014-.04.041-.027.068-.015.127.059.253.12.38.18l1.117.532.962.459.973.463.839.4.839.4c.218.1.434.208.652.31A.234.234,0,0,1,125.157,202.89Z"
                                    transform="translate(-119.173 -200.101)"
                                    fill="#bfbfbf"
                            />
                          </g>
                          <g
                                  id="Group_20913"
                                  data-name="Group 20913"
                                  transform="translate(0 10.868)"
                          >
                            <path
                                    id="Path_44329"
                                    data-name="Path 44329"
                                    d="M101.122,223.7l-.012.024H101.1c0-.02-.015-.032-.024-.046l-1.74-2.548-1.78-2.606L95.834,216l-.451-.66-.035-.055a.12.12,0,0,1,.062.027l2.466,1.518,2.839,1.747.48.293a.072.072,0,0,1,.02.06c0,.027,0,.055,0,.083l-.081,4.541A.714.714,0,0,1,101.122,223.7Z"
                                    transform="translate(-95.348 -215.29)"
                                    fill="#fff"
                            />
                          </g>
                          <g
                                  id="Group_20914"
                                  data-name="Group 20914"
                                  transform="translate(0.017 7.13)"
                          >
                            <path
                                    id="Path_44330"
                                    data-name="Path 44330"
                                    d="M95.418,202.669l0-.013.917-.4,1.189-.515.912-.4,1.325-.574.907-.393.646-.28a.224.224,0,0,0,.062-.033.01.01,0,0,1,0,.015c0,.022,0,.043,0,.065q-.054,3.015-.107,6.03c0,.026-.013.055.012.079-.021.024-.036,0-.051-.007l-.252-.154-5.509-3.391Z"
                                    transform="translate(-95.418 -200.069)"
                                    fill="#dbdbdb"
                            />
                          </g>
                          <g
                                  id="Group_20915"
                                  data-name="Group 20915"
                                  transform="translate(5.762 11.077)"
                          >
                            <path
                                    id="Path_44331"
                                    data-name="Path 44331"
                                    d="M124.848,216.141a.012.012,0,0,0,.011,0c0,.024-.02.038-.032.055l-5.435,7.373-.57.772a.025.025,0,0,1-.012-.025q0-.027,0-.053.041-2.329.083-4.657c0-.03,0-.059,0-.089l1.21-.687,4.708-2.668Z"
                                    transform="translate(-118.81 -216.141)"
                                    fill="#dbdbdb"
                            />
                          </g>
                          <g
                                  id="Group_20916"
                                  data-name="Group 20916"
                                  transform="translate(5.978 0.026)"
                          >
                            <path
                                    id="Path_44332"
                                    data-name="Path 44332"
                                    d="M119.693,178.261v-.015c0-.02,0-.04,0-.059q.062-3.486.125-6.972c0-.025-.009-.052.012-.073l5.667,9.8a.332.332,0,0,1,.053.1c-.129-.053-.253-.119-.38-.178l-.465-.22-.293-.14-.486-.23-.283-.135-.625-.3-.319-.154-.454-.214-.283-.135-.624-.3-.319-.154-.454-.214-.3-.146-.549-.263A.067.067,0,0,0,119.693,178.261Z"
                                    transform="translate(-119.692 -171.141)"
                                    fill="#dbdbdb"
                            />
                          </g>
                        </svg>
                      </Flex>
                      Ethereum Chain <ChevronDownIcon ms={"10px"} />
                    </Button>
                  </Box>
                  <Box>
                    <Flex
                            mb={4}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                    >
                      <Button
                              p={2}
                              border="1px"
                              borderColor="#35245A"
                              color={"#fff"}
                              bg={"#140533"}
                              _hover={{ bg: "#29194A" }}
                              _active={{ bg: "#29194A" }}
                              _focus={{ boxShadow: "none" }}
                      >
                        <Flex
                                me={"10px"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                border="1px"
                                borderColor="#513D7B"
                                borderRadius="3px"
                                bg={"#35245A"}
                                w={"24px"}
                                h={"24px"}
                        >
                          {/*<img className={'object-contain modalButtonIcon'} src={iconEthButton.src} alt={"icon"} />*/}
                        </Flex>
                        META <ChevronDownIcon ms={"10px"} />
                      </Button>
                      <Flex fontSize={"14px"} mb={1} color={"#6C5E89"}>
                        {" "}
                        Balance:{" "}
                        <Text color={"#fff"} ps={1}>
                          1e18
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                    >
                      <FormControl
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                      >
                        <Input
                                color={"#fff"}
                                bg={"transparent"}
                                border="none"
                                _focus={{ boxShadow: "none" }}
                                ps={0}
                                pe={2}
                                fontSize={"24px"}
                                id="hello"
                                type="number"
                                step="any"
                                placeholder="Amount to Spend"
                                min="0"
                        />
                        <Text fontSize={"14px"} color={"#6C5E89"} px={2}>
                          $1331.89
                        </Text>
                        <Button
                                border={"0"}
                                borderRadius="4px"
                                h="1.75rem"
                                minW="3.75rem"
                                bg={"#513D7B"}
                                _hover={{ bg: "#513D7B" }}
                                color={"#fff"}
                        >
                          MAX
                        </Button>
                      </FormControl>
                    </Flex>
                  </Box>
                </Box>
                <Box mb={"15px"} p={{ sm: "16px 12px", md: "16px"}}>
                  <Flex
                          pos="relative"
                          my={-7}
                          alignItems={"center"}
                          justifyContent={"center"}
                          borderRadius="full"
                          border="1px"
                          borderColor="#35245A"
                          bg={"#1E0E3E"}
                          mx={"auto"}
                          w={"52px"}
                          h={"52px"}
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
                        <g
                                id="Group_22892"
                                data-name="Group 22892"
                                transform="translate(0 51.198)"
                        >
                          <path
                                  id="Path_45514"
                                  data-name="Path 45514"
                                  d="M17.812,55.887l-4.5-4.5a.643.643,0,0,0-1.1.455V53.77h-4.5a.643.643,0,0,0,0,1.286h5.143a.643.643,0,0,0,.643-.643v-1.02l2.948,2.948L13.5,59.289V58.27a.643.643,0,0,0-.643-.643H5.785V55.7a.643.643,0,0,0-1.1-.454l-4.5,4.5a.643.643,0,0,0,0,.909l4.5,4.5a.643.643,0,0,0,.455.188.635.635,0,0,0,.246-.049.643.643,0,0,0,.4-.594V62.77h4.5a.643.643,0,0,0,0-1.286H5.143a.643.643,0,0,0-.643.643v1.02L1.551,60.2,4.5,57.25v1.02a.643.643,0,0,0,.643.643h7.072v1.929a.643.643,0,0,0,1.1.455l4.5-4.5A.643.643,0,0,0,17.812,55.887Z"
                                  transform="translate(0 -51.198)"
                                  fill="#fff"
                          />
                        </g>
                      </g>
                    </svg>
                  </Flex>
                </Box>
                <Box
                        border="1px"
                        borderColor="#35245A"
                        borderRadius="8px"
                        p={{ sm: "16px 12px", md: "16px"}}
                        mb={"15px"}
                        bg={"rgba(30,14,62,0.65)"}
                >
                  <Box
                          borderBottomWidth="1px"
                          borderColor="#35245A"
                          pb={4}
                          mb={4}
                  >
                    <Text fontSize={"14px"} mb={1} color={"#9EA5B4"}>
                      To
                    </Text>
                    <Button
                            border={"0"}
                            p={"0"}
                            color={"#fff"}
                            bg={"none"}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            _focus={{ boxShadow: "none" }}
                    >
                      <Flex
                              me={"10px"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              borderRadius="full"
                              bg={"#35245A"}
                              w={"34px"}
                              h={"34px"}
                      >
                        {/*<img className={'object-contain modalButtonIcon'} src={iconPolygonWhite.src} alt={"icon"} />*/}
                      </Flex>
                      Polygon Chain <ChevronDownIcon ms={"10px"} />
                    </Button>
                  </Box>
                  <Box>
                    <FormControl mb={4} id="token">
                      <Input
                              h={"56px"}
                              bg={"#140533"}
                              borderRadius={"8px"}
                              color={"#ADA7B7"}
                              _hover={{ borderColor: "#29194A" }}
                              p={4}
                              type="text"
                              placeholder="Destination Address"
                      />
                    </FormControl>
                    <Checkbox size="md" defaultChecked>
                      Send it to your wallet address
                    </Checkbox>
                  </Box>
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
                    You will receive: 1.032045 META
                    <Button ml={"auto"} variant="link" onClick={handleClick}>
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
                            <Flex mt={"10px"} justifyContent={"space-between"}>
                              <Text fontSize={"14px"} color={"#5C498E"}>
                                Estimated Time
                              </Text>
                              <Text
                                      fontSize={"14px"}
                                      fontWeight={"bold"}
                                      color={"#fff"}
                              >
                                Est. 10-30 mins
                              </Text>
                            </Flex>
                            <Flex mb={"10px"} justifyContent={"space-between"}>
                              <Text fontSize={"14px"} color={"#5C498E"}>
                                Transaction Fee
                              </Text>
                              <Text fontSize={"14px"} fontWeight={"bold"}>
                                ~$6.71
                              </Text>
                            </Flex>
                          </>
                  ) : (
                          ""
                  )}
                </Box>
                <Button w={"100%"} variant="solid" size="lg">
                  TRANSFER
                </Button>
              </TabPanel>
              <TabPanel>
                <Box
                        border="1px"
                        borderColor="#35245A"
                        borderRadius="8px"
                        p={{ sm: "16px 12px", md: "16px"}}
                        bg={"rgba(30,14,62,0.65)"}
                >
                  <Box
                          borderBottomWidth="1px"
                          borderColor="#35245A"
                          pb={4}
                          mb={4}
                  >
                    <Text fontSize={"14px"} mb={1} color={"#9EA5B4"}>
                      From
                    </Text>
                    <Button
                            p={"0"}
                            color={"#fff"}
                            bg={"none"}
                            border={"0"}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            _focus={{ boxShadow: "none" }}
                    >
                      <Flex
                              me={"10px"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              borderRadius="full"
                              bg={"#35245A"}
                              w={"34px"}
                              h={"34px"}
                      >
                        <svg
                                id="Group_20917"
                                data-name="Group 20917"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.844"
                                height="19.301"
                                viewBox="0 0 11.844 19.301"
                        >
                          <g
                                  id="Group_20911"
                                  data-name="Group 20911"
                                  transform="translate(0.007)"
                          >
                            <path
                                    id="Path_44327"
                                    data-name="Path 44327"
                                    d="M101.486,171.049a.025.025,0,0,1,0,.011.862.862,0,0,1,.007.159q-.061,3.4-.122,6.808a.728.728,0,0,1-.006.118c-.008.038-.041.051-.071.065-.2.09-.4.176-.6.263l-.853.369-1.016.44-.836.363-1,.433-.847.368c-.23.1-.46.2-.69.3a.112.112,0,0,1-.057.014.023.023,0,0,1-.016-.007c.09-.142.18-.283.269-.425l1.529-2.437,1.642-2.618,1.52-2.422,1.107-1.766a.082.082,0,0,0,.021-.048h.012A.031.031,0,0,1,101.486,171.049Z"
                                    transform="translate(-95.375 -171.034)"
                                    fill="#fff"
                            />
                          </g>
                          <g
                                  id="Group_20912"
                                  data-name="Group 20912"
                                  transform="translate(5.851 7.138)"
                          >
                            <path
                                    id="Path_44328"
                                    data-name="Path 44328"
                                    d="M125.157,202.89l0,0,0,0v.012l-1.425.809-4.483,2.544-.052.027c-.028,0-.027-.025-.029-.043a.519.519,0,0,1,0-.083q.053-2.963.106-5.927a.453.453,0,0,1,.007-.1c.014-.04.041-.027.068-.015.127.059.253.12.38.18l1.117.532.962.459.973.463.839.4.839.4c.218.1.434.208.652.31A.234.234,0,0,1,125.157,202.89Z"
                                    transform="translate(-119.173 -200.101)"
                                    fill="#bfbfbf"
                            />
                          </g>
                          <g
                                  id="Group_20913"
                                  data-name="Group 20913"
                                  transform="translate(0 10.868)"
                          >
                            <path
                                    id="Path_44329"
                                    data-name="Path 44329"
                                    d="M101.122,223.7l-.012.024H101.1c0-.02-.015-.032-.024-.046l-1.74-2.548-1.78-2.606L95.834,216l-.451-.66-.035-.055a.12.12,0,0,1,.062.027l2.466,1.518,2.839,1.747.48.293a.072.072,0,0,1,.02.06c0,.027,0,.055,0,.083l-.081,4.541A.714.714,0,0,1,101.122,223.7Z"
                                    transform="translate(-95.348 -215.29)"
                                    fill="#fff"
                            />
                          </g>
                          <g
                                  id="Group_20914"
                                  data-name="Group 20914"
                                  transform="translate(0.017 7.13)"
                          >
                            <path
                                    id="Path_44330"
                                    data-name="Path 44330"
                                    d="M95.418,202.669l0-.013.917-.4,1.189-.515.912-.4,1.325-.574.907-.393.646-.28a.224.224,0,0,0,.062-.033.01.01,0,0,1,0,.015c0,.022,0,.043,0,.065q-.054,3.015-.107,6.03c0,.026-.013.055.012.079-.021.024-.036,0-.051-.007l-.252-.154-5.509-3.391Z"
                                    transform="translate(-95.418 -200.069)"
                                    fill="#dbdbdb"
                            />
                          </g>
                          <g
                                  id="Group_20915"
                                  data-name="Group 20915"
                                  transform="translate(5.762 11.077)"
                          >
                            <path
                                    id="Path_44331"
                                    data-name="Path 44331"
                                    d="M124.848,216.141a.012.012,0,0,0,.011,0c0,.024-.02.038-.032.055l-5.435,7.373-.57.772a.025.025,0,0,1-.012-.025q0-.027,0-.053.041-2.329.083-4.657c0-.03,0-.059,0-.089l1.21-.687,4.708-2.668Z"
                                    transform="translate(-118.81 -216.141)"
                                    fill="#dbdbdb"
                            />
                          </g>
                          <g
                                  id="Group_20916"
                                  data-name="Group 20916"
                                  transform="translate(5.978 0.026)"
                          >
                            <path
                                    id="Path_44332"
                                    data-name="Path 44332"
                                    d="M119.693,178.261v-.015c0-.02,0-.04,0-.059q.062-3.486.125-6.972c0-.025-.009-.052.012-.073l5.667,9.8a.332.332,0,0,1,.053.1c-.129-.053-.253-.119-.38-.178l-.465-.22-.293-.14-.486-.23-.283-.135-.625-.3-.319-.154-.454-.214-.283-.135-.624-.3-.319-.154-.454-.214-.3-.146-.549-.263A.067.067,0,0,0,119.693,178.261Z"
                                    transform="translate(-119.692 -171.141)"
                                    fill="#dbdbdb"
                            />
                          </g>
                        </svg>
                      </Flex>
                      Ethereum Chain <ChevronDownIcon ms={"10px"} />
                    </Button>
                  </Box>
                  <Box>
                    <Flex
                            mb={4}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                    >
                      <Button
                              p={2}
                              border="1px"
                              borderColor="#35245A"
                              color={"#fff"}
                              bg={"#140533"}
                              _hover={{ bg: "#29194A" }}
                              _active={{ bg: "#29194A" }}
                              _focus={{ boxShadow: "none" }}
                      >
                        <Flex
                                me={"10px"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                border="1px"
                                borderColor="#513D7B"
                                borderRadius="3px"
                                bg={"#35245A"}
                                w={"24px"}
                                h={"24px"}
                        >
                          {/*<img className={'object-contain modalButtonIcon'} src={iconEthButton.src} alt={"icon"} />*/}
                        </Flex>
                        META <ChevronDownIcon ms={"10px"} />
                      </Button>
                      <Flex fontSize={"14px"} mb={1} color={"#6C5E89"}>
                        {" "}
                        Available Token:{" "}
                        <Text color={"#fff"} ps={1}>
                          5
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                    >
                      <FormControl mb={4} id="token">
                        <Input
                                h={"56px"}
                                bg={"#140533"}
                                borderRadius={"8px"}
                                color={"#ADA7B7"}
                                _hover={{ borderColor: "#29194A" }}
                                p={4}
                                type="text"
                                placeholder="Token Id"
                        />
                      </FormControl>
                    </Flex>
                  </Box>
                </Box>
                <Box mb={"15px"} p={{ sm: "16px 12px", md: "16px"}}>
                  <Flex
                          pos="relative"
                          my={-7}
                          alignItems={"center"}
                          justifyContent={"center"}
                          borderRadius="full"
                          border="1px"
                          borderColor="#35245A"
                          bg={"#1E0E3E"}
                          mx={"auto"}
                          w={"52px"}
                          h={"52px"}
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
                        <g
                                id="Group_22892"
                                data-name="Group 22892"
                                transform="translate(0 51.198)"
                        >
                          <path
                                  id="Path_45514"
                                  data-name="Path 45514"
                                  d="M17.812,55.887l-4.5-4.5a.643.643,0,0,0-1.1.455V53.77h-4.5a.643.643,0,0,0,0,1.286h5.143a.643.643,0,0,0,.643-.643v-1.02l2.948,2.948L13.5,59.289V58.27a.643.643,0,0,0-.643-.643H5.785V55.7a.643.643,0,0,0-1.1-.454l-4.5,4.5a.643.643,0,0,0,0,.909l4.5,4.5a.643.643,0,0,0,.455.188.635.635,0,0,0,.246-.049.643.643,0,0,0,.4-.594V62.77h4.5a.643.643,0,0,0,0-1.286H5.143a.643.643,0,0,0-.643.643v1.02L1.551,60.2,4.5,57.25v1.02a.643.643,0,0,0,.643.643h7.072v1.929a.643.643,0,0,0,1.1.455l4.5-4.5A.643.643,0,0,0,17.812,55.887Z"
                                  transform="translate(0 -51.198)"
                                  fill="#fff"
                          />
                        </g>
                      </g>
                    </svg>
                  </Flex>
                </Box>
                <Box
                        border="1px"
                        borderColor="#35245A"
                        borderRadius="8px"
                        p={{ sm: "24px 12px", md: "24px"}}
                        mb={"15px"}
                        bg={"rgba(30,14,62,0.65)"}
                >
                  <Box
                          borderBottomWidth="1px"
                          borderColor="#35245A"
                          pb={4}
                          mb={4}
                  >
                    <Text fontSize={"14px"} mb={1} color={"#9EA5B4"}>
                      To
                    </Text>
                    <Button
                            border={"0"}
                            p={"0"}
                            color={"#fff"}
                            bg={"none"}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            _focus={{ boxShadow: "none" }}
                    >
                      <Flex
                              me={"10px"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              borderRadius="full"
                              bg={"#35245A"}
                              w={"34px"}
                              h={"34px"}
                      >
                        {/*<img className={'object-contain modalButtonIcon'} src={iconPolygonWhite.src} alt={"icon"} />*/}
                      </Flex>
                      Polygon Chain <ChevronDownIcon ms={"10px"} />
                    </Button>
                  </Box>
                  <Box>
                    <FormControl mb={4} id="token">
                      <Input
                              h={"56px"}
                              bg={"#140533"}
                              borderRadius={"8px"}
                              color={"#ADA7B7"}
                              _hover={{ borderColor: "#29194A" }}
                              p={4}
                              type="text"
                              placeholder="Destination Address"
                      />
                    </FormControl>
                    <Checkbox size="md" defaultChecked>
                      Send it to your wallet address
                    </Checkbox>
                  </Box>
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
                    You will receive: 1.032045 META
                    <Button ml={"auto"} variant="link" onClick={handleClick}>
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
                            <Flex mt={"10px"} justifyContent={"space-between"}>
                              <Text fontSize={"14px"} color={"#5C498E"}>
                                Estimated Time
                              </Text>
                              <Text
                                      fontSize={"14px"}
                                      fontWeight={"bold"}
                                      color={"#fff"}
                              >
                                Est. 10-30 mins
                              </Text>
                            </Flex>
                            <Flex mb={"10px"} justifyContent={"space-between"}>
                              <Text fontSize={"14px"} color={"#5C498E"}>
                                Transaction Fee
                              </Text>
                              <Text fontSize={"14px"} fontWeight={"bold"}>
                                ~$6.71
                              </Text>
                            </Flex>
                          </>
                  ) : (
                          ""
                  )}
                </Box>
                <Button w={"100%"} variant="solid" size="lg">
                  TRANSFER
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
