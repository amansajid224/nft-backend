import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ModalFooter,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import FileInput from "../../components/FileInput";
import profilecontact from "../../public/profile-contact.png";

const CustomModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      {/* add token modal */}
      {/* <Modal size={"3xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Add Custom Token
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Box width="100%">
                <FileInput />
                <FormControl mb={"24px"}>
                  <FormLabel>Decimals Places</FormLabel>
                  <Input
                    size="lg"
                    placeholder="0-8"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="walletAddress"
                  />
                </FormControl>
                <FormControl mb={"24px"}>
                  <FormLabel>Token Contract</FormLabel>
                  <Input
                    size="lg"
                    placeholder="Token Contract"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="email"
                  />
                </FormControl>
                <FormControl mb={"24px"}>
                  <FormLabel>Token Name</FormLabel>
                  <Input
                    size="lg"
                    placeholder="Display Token Name"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="email"
                  />
                </FormControl>
                <FormControl mb={"24px"}>
                  <FormLabel>Token Image</FormLabel>
                  <Input
                    size="lg"
                    placeholder="e.g IPFS, HASH / URL"
                    _placeholder={{ opacity: 1, color: "#5C498E" }}
                    type="text"
                    name="email"
                  />
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                ADD TOKEN
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Contact Details modal */}
      <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Contact Details
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Flex flexDirection={["column", "column", "row"]}>
                <Box width={{ xl: "20%", lg: "20%", md: "100%", sm: "100%" }}>
                  <Image src={profilecontact.src} alt="Image" mb={"20px"} />
                </Box>
                <Box width={{ xl: "60%", lg: "60%", md: "100%", sm: "100%" }}>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    Clemens Gruber
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Email
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    clemens.12@web.com
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Wallet Address
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    0xd6…ec37
                  </Box>
                </Box>
                <Box width={{ xl: "20%", lg: "20%", md: "100%", sm: "100%" }}>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Status
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    Active
                  </Box>
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                ADD TOKEN
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      {/* Show Private Key */}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Show Private Key
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Enter Your Password</FormLabel>
                <Input
                  size="lg"
                  placeholder="Password"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" variant="solid">
                SHOW KEY
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Contact Details modal */}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Contact Details
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Flex flexDirection={["column", "column", "row"]}>
                <Box width={{ xl: "20%", lg: "20%", md: "100%", sm: "100%" }}>
                  <Image src={profilecontact.src} alt="Image" mb={"20px"} />
                </Box>
                <Box width={{ xl: "60%", lg: "60%", md: "100%", sm: "100%" }}>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    Clemens Gruber
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Email
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    clemens.12@web.com
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Wallet Address
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    0xd6…ec37
                  </Box>
                </Box>
                <Box width={{ xl: "20%", lg: "20%", md: "100%", sm: "100%" }}>
                  <Box
                    mb={"16px"}
                    p={0}
                    fontFamily={"Roboto"}
                    fontSize={"16px"}
                    color={"#9EA5B4"}
                    fontWeight={"light"}
                  >
                    Status
                  </Box>
                  <Box
                    mb={"16px"}
                    p={0}
                    className={"Archivo"}
                    fontSize={"18px"}
                    fontWeight={"bold"}
                  >
                    Active
                  </Box>
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                ADD TOKEN
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Select a Network */}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Show Private Key
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Enter Your Password</FormLabel>
                <Input
                  size="lg"
                  placeholder="Password"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" variant="solid">
                SHOW KEY
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Transfer In Progress */}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Transfer In Progress
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Box
                textAlign={"center"}
                alignItems={"center"}
                justifyContent={"center"}
                bg={"#140533"}
                border={" 1px solid"}
                borderColor={"#3B2864"}
                borderRadius={"12px"}
                padding={"40px 80px"}
              >
                <Text
                  mb={"20px"}
                  p={0}
                  className={"Archivo"}SS
                  fontSize={"24px"}
                  fontWeight={"bold"}
                >
                  28291
                </Text>
                <Text
                  mb={"0px"}
                  p={0}
                  className={"Roboto"}
                  fontSize={"14px"}
                  fontWeight={"normal"}
                >
                  Token ID
                </Text>
              </Box>
              <Box textAlign={"center"} marginTop={"20px"}>
                <Text
                  mb={"20px"}
                  p={0}
                  className={"Archivo"}
                  fontSize={"24px"}
                  fontWeight={"bold"}
                >
                  Approval In Process
                </Text>
                <Text
                  mb={"0px"}
                  p={0}
                  className={"Roboto"}
                  fontSize={"14px"}
                  fontWeight={"normal"}
                >
                  Locking your META Token…
                </Text>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" variant="solid">
                SHOW KEY
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Transfer Token */}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Transfer Token
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Enter Amount</FormLabel>
                <Input
                  size="lg"
                  placeholder="0.0 PYR"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
              <FormControl mb={"24px"}>
                <FormLabel>Address</FormLabel>
                <Input
                  size="lg"
                  placeholder="Wallet Address"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Box display={"flex"} justifyContent={"start"}>
                <Text color={"#9EA5B4"}>Gas Fee </Text>
                <Text>14.3</Text>
              </Box>

              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                TRANSFER
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Receive Funds*/}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Receive Funds
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Address</FormLabel>
                <Input
                  size="lg"
                  placeholder="Wallet Address"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              

              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                CONFIRM
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
      {/* Receive Funds*/}
      {/* <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
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
              Buy PYR
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <FormControl mb={"24px"}>
                <FormLabel>Type Amount</FormLabel>
                <Input
                  size="lg"
                  placeholder="0.0 PYR"
                  _placeholder={{ opacity: 1, color: "#5C498E" }}
                  type="text"
                  name="email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                CANCEL
              </Button>
              <Button type="submit" variant="solid">
                BUY NOW
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal> */}
    </>
  );
};
export default CustomModal;
