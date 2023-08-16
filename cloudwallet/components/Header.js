import {
    Box,
    Link,
    Text,
    Icon,
    Flex,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
} from "@chakra-ui/react";
import IconEthereum from "../public/IconEthereum.svg";
import IconPolygon from "../public/IconPolygon.svg";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../store/slices/ModalSlice";
import {useSideBarContext} from "../context/sideBarContext";
import NextLink from "next/link";
import moment from "moment";
import Web3 from "web3";
import {useWeb3React} from "@web3-react/core";
import {injected} from "../utils/connector";
import {
    fetchLatestNotifications,
    hasPendingNotifications,
    selectLatestNotifications,
} from "../store/slices/NotificationSlice";
import {useWeb3Context} from "../context/web3Context";
import WalletButton from "../pages/tokens/walletButton";
import Cookies from "js-cookie";
import {useAuth} from "../context/AuthContext";
import {socket} from "../context/socket";
import io from "socket.io-client";
import { ChakraProvider, extendTheme, useToast } from "@chakra-ui/react";
import axios from 'axios';
import AppsDropdown from "./AppsDropdown";

export default function Header({event,className}) {
    const [token,setToken]=useState(Cookies.get('token'));
    const [showBtn, setShowBtn] = useState(false);
    const [notiBtn, setNotiBtn] = useState(false);
    const [userData, setUserData] = useState("");

    const [events, setEvents] = useState("");
    const {
        isOpen: isOpenNetworkToken,
        onOpen: onOpenNetworkToken,
        onClose: onCloseNetworkToken,
    } = useDisclosure();
    const dispatch = useDispatch();
    const hasUnreadNotifications = useSelector(hasPendingNotifications);
    const latestNotifications = useSelector(selectLatestNotifications);
    const {setToggleProfile, toggleProfile, setToggleSideBar} =
        useSideBarContext();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const toast = useToast();

    const {disconnect, connect, connectWalletOnPageLoad, walletConnect} =
        useWeb3Context();
    const {account, activate} = useWeb3React();
    const {
        logout
    } = useAuth();
    const [address, setAddress] = useState("");
    const getUserData = () => {
        const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));
        setUserData(user);
    };
    //connection socket.io setting done
    useEffect(() => {
        if(token){
            const socket = io(process.env.NEXT_PUBLIC_API_URL, {
                auth: {
                    token,
                },
            });
            socket.on("transferNft", function (data) {
                if (data) {
                    let message = data;
                    setEvents(message);
                    Cookies.set("hasUnreadNotif", true)
                    toast({
                        title: "You have received one new NFT",
                        isClosable: true,
                        status: "success",
                    });
                }
            });
            socket.on("transferToken", function (data) {
                    if (data) {
                      let message = data;
                        setEvents(message);
                      Cookies.set("hasUnreadNotif", true)
                      toast({
                        title: `You have received ${message?.tokenInfo?.tokenName} : ${message?.value * 1e-18}`,
                        isClosable: true,
                        status: "success",
                      });
                    }
                  });
        }
    }, [token,userData]);
    useEffect(() => {
        const clearAccount = () => {
            setAddress(null);
            logout()
        };
        window.ethereum.on('disconnect', clearAccount);
        window.ethereum.on('accountsChanged', clearAccount);
        const timeoutId = setTimeout(async () => {
            if (localStorage?.getItem("isWalletConnected") === "true") {
                try {
                    await activate(injected);
                } catch (ex) {
                    console.log(ex);
                }
            }
        }, 0);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const showNotifBtnFunc = () => {
        event && setShowBtn(true);
        typeof window !== "undefined" &&
        localStorage.getItem("showNotifIcon") &&
        setShowBtn(true);
    };

    useEffect(() => {
        showNotifBtnFunc();
    }, [event]);

    useEffect(() => {
        if (!account) {
            dispatch(closeModal());
        }
    }, [account]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://s3.amazonaws.com/cdn.elysiumchain.tech/elysium-apps-icons/apps.json');
    //             console.log("this s datt",response.data)
    //             setAppData(response.data?.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);


    useEffect(() => {
        dispatch(fetchLatestNotifications(5));
    }, []);

    useEffect(() => {
        Cookies.get("hasUnreadNotif") && setNotiBtn(true)

    }, [ Cookies.get("hasUnreadNotif")]);

    return (
        <>
            <Flex py={"25px"} color="white" alignItems={"center"} className={className}>
                <Box
                    display={{sm: "block", md: "block", lg: "block", xl: "none"}}
                    mr={"10px"}
                    onClick={() => setToggleSideBar(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="19.2"
                        viewBox="0 0 24 19.2"
                    >
                        <g id="Layer_1" transform="translate(-1 -4)">
                            <path
                                id="Path_49284"
                                data-name="Path 49284"
                                d="M23.4,7.2H2.6A1.6,1.6,0,1,1,2.6,4H23.4a1.6,1.6,0,1,1,0,3.2Z"
                                fill="#ada7b7"
                            />
                            <path
                                id="Path_49285"
                                data-name="Path 49285"
                                d="M23.4,27.2H2.6a1.6,1.6,0,0,1,0-3.2H23.4a1.6,1.6,0,1,1,0,3.2Z"
                                transform="translate(0 -4)"
                                fill="#ada7b7"
                            />
                            <path
                                id="Path_49286"
                                data-name="Path 49286"
                                d="M23.4,17.2H2.6a1.6,1.6,0,0,1,0-3.2H23.4a1.6,1.6,0,0,1,0,3.2Z"
                                transform="translate(0 -2)"
                                fill="#ada7b7"
                            />
                        </g>
                    </svg>
                </Box>
                <NextLink href="/dashboard">
                    <Image
                        pr={"10px"}
                        w={"100%"}
                        maxW={"160px"}
                        src="/elysium-logo-compact.svg"
                        alt="Elysium"
                        display={{sm: "block", md: "block", lg: "block", xl: "none"}}
                    />
                </NextLink>
                <WalletButton isHeaderBtn/>
                <Flex
                    display={{sm: "flex", xl: "none"}}
                    alignItems={"center"}
                    justifyContent={"center"}
                    postion={"relative"}
                    bg={"#513D7B"}
                    borderRadius={"full"}
                    height={{sm: "30px", md: "40px", lg: "40px"}}
                    flex={{sm: "0 0 30px", md: "0 0 40px", lg: "0 0 40px"}}
                    //ml={"auto"}
                    ml={{lg: "0", md: "auto", sm: "auto"}}
                    onClick={() => setToggleProfile(true)}
                >
                    <Icon
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 96 960 960"
                        width={{sm: "23px"}}
                        height={{sm: "23px"}}
                        fill={"#fff"}
                    >
                        <path
                            d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z"/>
                    </Icon>
                </Flex>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={"#513D7B"}
                    borderRadius={"full"}
                    height={{sm: "30px", md: "40px", lg: "40px"}}
                    width={{sm: "30px", md: "40px", lg: "40px"}}
                    ml={"10px"}
                >
                    <Menu className={"AliNaeem1"} variant="Notification">
                        <MenuButton
                            onClick={() => {
                                Cookies.remove("hasUnreadNotif");
                                setNotiBtn(false)
                                dispatch(fetchLatestNotifications(5));
                            }}
                            p={"0"}
                            border={0}
                            as={Button}
                            variant="link"
                            position={"relative"}
                        >
                            {notiBtn  ? (
                                <Box
                                    width={"10px"}
                                    height={"10px"}
                                    background={"red"}
                                    position={"absolute"}
                                    top={"-9px"}
                                    right={"-1px"}
                                    borderRadius={"50px"}
                                ></Box>
                            ) : (
                                ""
                            )}

                            <Icon
                                fill={"#fff"}
                                xmlns="http://www.w3.org/2000/svg"
                                width={{sm: "16px", md: "16px", lg: "16px"}}
                                height="20px"
                                viewBox="0 0 16.667 20"
                            >
                                <g transform="translate(-5.006 -3)">
                                    <path
                                        d="M21.618,19.63a.752.752,0,0,0-.162-.252A7.211,7.211,0,0,1,19.4,14.354V13a.758.758,0,1,0-1.516,0v1.354a8.8,8.8,0,0,0,1.438,4.8H7.362a8.679,8.679,0,0,0,1.432-4.8v-3.66a4.587,4.587,0,0,1,4.548-4.615,4.526,4.526,0,0,1,4.359,3.3.757.757,0,0,0,.943.518.77.77,0,0,0,.51-.956A6.032,6.032,0,0,0,14.1,4.6V3.769a.758.758,0,1,0-1.516,0v.822a6.129,6.129,0,0,0-5.306,6.1v3.66a7.117,7.117,0,0,1-2.051,5.026.787.787,0,0,0-.164.838.768.768,0,0,0,.7.475h4.655a3.007,3.007,0,0,0,5.848,0h4.655A.775.775,0,0,0,21.618,19.63Zm-8.277,1.832a1.507,1.507,0,0,1-1.305-.769h2.61A1.505,1.505,0,0,1,13.341,21.462Z"/>
                                </g>
                            </Icon>
                        </MenuButton>
                        <MenuList
                            p={{md: "15px 15px 0 15px", sm: "8px"}}
                            bg={"#140533"}
                            borderColor={"#3B2864"}
                            rounded="lg"
                            py={2}
                            //minWidth={["420px", "310px"]}
                            maxW={{md: "420px", sm: "310px"}}
                            mt={{md: "0", sm: "8px"}}
                        >
                            {latestNotifications && latestNotifications?.map((latestNotification, index) => {
                                return (
                                    <>
                                        <MenuItem
                                            mb={3}
                                            flexDirection={"column"}
                                            alignItems={"start"}
                                            background={
                                                !latestNotification?.isRead
                                                    ? "rgb(255 255 255 / 13%)"
                                                    : ""
                                            }
                                        >
                                            <Text
                                                className={"Archivo"}
                                                fontWeight={"700"}
                                                fontSize={"16px"}
                                            >
                                                {latestNotification?.title}
                                            </Text>
                                            <Text
                                                fontWeight={"300"}
                                                fontSize={"14px"}
                                                color={"rgba(255,255,255,0.7)"}
                                            >
                                                {(latestNotification?.title ==
                                                    "NFT transfered successfully!" ||
                                                    latestNotification?.title ==
                                                    "Token transfered successfully!") && (
                                                    <>
                                                        <Text>
                                                            {
                                                                latestNotification?.description?.split(
                                                                    " from "
                                                                )[0]
                                                            }{" "}
                                                            from:{" "}
                                                            {
                                                                latestNotification?.description
                                                                    ?.split(" from ")[1]
                                                                    ?.split(" to ")[0]
                                                            }
                                                        </Text>
                                                        <Text>
                                                            To:{" "}
                                                            {
                                                                latestNotification?.description
                                                                    ?.split(" from ")[1]
                                                                    ?.split(" to ")[1]
                                                            }
                                                        </Text>
                                                    </>
                                                )}
                                                {(latestNotification?.title == "NFT Received" ||
                                                    latestNotification?.title == "Token Received") && (
                                                    <>
                                                        <Text>
                                                            {
                                                                latestNotification?.description?.split(
                                                                    " from "
                                                                )[0]
                                                            }{" "}
                                                            from:{" "}
                                                            {
                                                                latestNotification?.description
                                                                    ?.split(" from ")[1]
                                                                    ?.split(" to ")[0]
                                                            }
                                                        </Text>
                                                    </>
                                                )}
                                            </Text>
                                            <Text
                                                fontWeight={"300"}
                                                fontSize={"12px"}
                                                color={"#8771bf"}
                                            >
                                                {moment(latestNotification?.createdAt).format(
                                                    "YY-MM-DD hh:mm"
                                                )}
                                            </Text>
                                        </MenuItem>
                                    </>
                                );
                            })}
                            <Flex
                                mb={{md: "3", sm: "0"}}
                                alignItems={"center"}
                                p={"8px 15px"}
                                borderRadius={"12px"}
                                grow={1}
                                justifyContent={"space-between"}
                                border={"solid 1px"}
                                borderColor={"#3B2864"}
                                maxH={"40px"}
                            >
                                {latestNotifications && latestNotifications?.length > 0 ?
                                    <>
                                        <NextLink
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "12px",
                                                color: "#9FC131",
                                                width: '100%'
                                            }}
                                            href="/notifications"
                                        >
                                            <MenuItem
                                                mb={0}
                                                mt={0}
                                                _hover={{bg: ""}}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                textAlign={"center"}
                                            >
                                                VIEW ALL
                                            </MenuItem>
                                        </NextLink>
                                    </> :
                                    <Text>No new notification</Text>
                                }
                            </Flex>
                        </MenuList>
                    </Menu>
                </Flex>
                <Box
                    borderLeft="1px solid"
                    borderColor="#3B2864"
                    ml={"10px"}
                    pl={"10px"}
                >
                    <AppsDropdown/>
                </Box>
            </Flex>

            <Modal
                size={"xl"}
                isCentered
                isOpen={isOpenNetworkToken}
                onClose={onCloseNetworkToken}
            >
                <ModalOverlay bg={"rgba(41,25,74,0.80)"} backdropFilter="blur(10px)"/>
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
                        Select a Network
                    </ModalHeader>
                    <ModalCloseButton
                        fontSize={"15px"}
                        mt={2}
                        _focus={{boxShadow: "none"}}
                        color={"#ada7b7"}
                    />
                    <ModalBody p={0}>
                        <Button
                            onClick={() => {
                                setShowAccount(true);
                                onCloseWallet(true);
                            }}
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
                            _hover={{bg: "#9FC131"}}
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
                            _hover={{bg: "#9FC131"}}
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
            </Modal>
        </>
    );
}
