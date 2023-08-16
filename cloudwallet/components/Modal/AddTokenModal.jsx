import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  Text,
  Checkbox,
  Spinner,
  Avatar,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/slices/ModalSlice";
import { SearchIcon } from "@chakra-ui/icons";
import {
  addTokens,
  fetchDefaultTokens,
  fetchTokens,
  selectDefaultSelectedToken,
  selectDefaultTokens,
  selectIsLoading,
  selectTokenMeta,
} from "../../store/slices/TokenSlice";
import { useEffect, useState } from "react";
import { removeItemFromArr } from "../../utils";

const AddTokenModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const defaultTokens = useSelector(selectDefaultTokens);
  const isLoading = useSelector(selectIsLoading);
  const defaultSelectedTokens = useSelector(selectDefaultSelectedToken);
  const [selectedTokensIds, setSelectedTokensIds] = useState(
    defaultSelectedTokens
  );
  const [selectedTokens, setSelectedTokens] = useState([]);
  const meta = useSelector(selectTokenMeta);
  const [tokenList, setTokenList] = useState(defaultTokens);

  const handleSelectToken = (e, token) => {
    e.stopPropagation();
    const index = selectedTokensIds.indexOf(token?.id);
    if (index > -1) {
      setSelectedTokensIds([
        ...selectedTokensIds.slice(0, index),
        ...selectedTokensIds.slice(index + 1),
      ]);
      setSelectedTokens((state) => removeItemFromArr(state, "key", token?.id));
    } else {
      setSelectedTokens([...selectedTokens, token]);
      setSelectedTokensIds([...selectedTokensIds, token?.id]);
    }
  };

  const handleAddToken = () => {
    dispatch(addTokens(selectedTokensIds, selectedTokens)).then((resp) => {
      if (resp) {
        dispatch(closeModal());
        dispatch(fetchTokens({ page: meta?.pageIndex, limit: meta?.pageSize }));
      }
    });
  };

  const searchToken = (e) => {
    // Access input value
    const query = e.target.value;
    // Create copy of item list

    // Include all elements which includes the search query
    let updatedList = tokenList.filter((token, index) => {
      return token.symbol.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    if (query === "") {
      setTokenList(defaultTokens);
    } else {
      setTokenList(updatedList);
    }
    // Trigger render with updated values
  };
  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={() => dispatch(closeModal())}>
      <ModalOverlay bg={"rgba(41,25,74,0.80)"} backdropFilter="blur(10px)" />
      <ModalContent
        bg={"#241446"}
        borderRadius={"24px"}
        border={"1px solid"}
        borderColor={"#3B2864"}
        p={"25px"}
        className={"ModalCentered"}
      >
        <ModalHeader
          mb={"20px"}
          p={0}
          className={"Archivo"}
          fontSize={"24px"}
          fontWeight={"bold"}
        >
          Add Token
        </ModalHeader>
        <ModalCloseButton
          fontSize={"15px"}
          mt={2}
          _focus={{ boxShadow: "none" }}
          color={"#ada7b7"}
        />
        <ModalBody p={0}>
          <FormControl
            maxW={"100%"}
            mr={"16px"}
            mb={["24px", "24px", "0", "0"]}
          >
            <InputGroup size="md">
              <Input
                pl="2.5rem"
                type="text"
                placeholder="Search"
                _placeholder={{ opacity: 1, color: "#5C498E" }}
                onChange={(e) => searchToken(e)}
              />
              <InputLeftElement width="2.5rem">
                <SearchIcon color={"#5C498E"} />
              </InputLeftElement>
            </InputGroup>
          </FormControl>
          <Tabs variant="borderVariant" my={"24px;"}>
            <TabList>
              <Tab>POPULAR</Tab>
              <Tab>ALL</Tab>
              {/* <Tab>ETHEREUM</Tab>
              <Tab>BINANCE</Tab> */}
            </TabList>

            <TabPanels>
              <TabPanel
                bg={"#1E0E3E"}
                border={"1px solid"}
                borderColor={"#35245A"}
                borderRadius={"6px"}
                padding={"24px"}
                height="300px"
                overflow="auto"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "0.25rem",
                  },
                  "&::-webkit-scrollbar-track": {
                    bg: "#35245A",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bg: "gray.500",
                  },
                }}
              >
                {isLoading && <Spinner size="md" />}
                {tokenList &&
                  tokenList.slice(0, 5).map((token) => {
                    return (
                      <Flex justifyContent={"space-between"}>
                        <Box pt={2}>
                          <Flex alignItems={"center"}>
                            <Avatar
                              borderRadius="full"
                              boxSize="40px"
                              name={token?.symbol}
                              src={token?.tokenImage}
                              alt={token?.symbol}
                              width="40px"
                              height="40px"
                            />
                            <Text ml={"10px"} fontSize={"18px"}>
                              {token?.symbol}
                            </Text>
                          </Flex>
                        </Box>

                        <Checkbox
                          isChecked={selectedTokensIds.includes(token?.id)}
                          onChange={(e) => handleSelectToken(e, token)}
                        ></Checkbox>
                      </Flex>
                    );
                  })}
              </TabPanel>
              <TabPanel
                bg={"#1E0E3E"}
                border={"1px solid"}
                borderColor={"#35245A"}
                borderRadius={"6px"}
                padding={"24px"}
                height="300px"
                overflow="auto"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "0.25rem",
                  },
                  "&::-webkit-scrollbar-track": {
                    bg: "#35245A",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bg: "gray.500",
                  },
                }}
              >
                <Box>
                  {/* <Image
                        borderRadius="full"
                        boxSize="40px"
                        src={BTCCurrency.src}
                        alt={BTCCurrency}
                      /> */}
                  {isLoading && <Spinner size="md" />}
                  {tokenList &&
                    tokenList.map((token) => {
                      return (
                        <Flex justifyContent={"space-between"}>
                          <Box pt={2}>
                            <Flex alignItems={"center"}>
                              <Avatar
                                borderRadius="full"
                                boxSize="40px"
                                name={token?.symbol}
                                src={token?.tokenImage}
                                alt={token?.symbol}
                                width="40px"
                                height="40px"
                              />
                              <Text ml={"10px"} fontSize={"18px"}>
                                {token?.symbol}
                              </Text>
                            </Flex>
                          </Box>

                          <Checkbox
                            isChecked={selectedTokensIds.includes(token?.id)}
                            onChange={(e) => handleSelectToken(e, token)}
                          ></Checkbox>
                        </Flex>
                      );
                    })}
                </Box>
              </TabPanel>
              {/* <TabPanel
                bg={"#1E0E3E"}
                border={"1px solid"}
                borderColor={"#35245A"}
                borderRadius={"6px"}
                padding={"24px"}
              >
                <p>three!</p>
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter flexWrap={'wrap'} px="0px">
          <Button
              mb={3}
            variant="link"
            mr={"auto"}
            onClick={() =>
              dispatch(
                openModal({ modal: "AddCustomTokenModal", isOpen: true })
              )
            }
          >
            ADD CUSTOM TOKEN
          </Button>
          <Button
              mb={3}
                  id='closeAllModal'
                  colorScheme="blue"
                  marginLeft={{lg:'auto',sm:'20px'}}
                  // style={{marginLeft: "118px"}}
                  onClick={() => dispatch(closeModal())}
                >
                  CANCEL
                </Button>
          <Button
            type="submit"
            variant="solid"
            ml={2}
            mb={3}
            onClick={() => {
              handleAddToken();
              dispatch(
                fetchTokens({ page: meta?.pageIndex, limit: meta?.pageSize })
              );
            }}
          >
            ADD TOKEN
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTokenModal;
