import {useState, useEffect} from "react";
import {
    Container,
    SimpleGrid,
    GridItem,
    Image,
    Box,
    Heading,
    Link,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    Input,
    Flex,
    Checkbox,
    Button,
    Icon,
    Text,
    Hide,
    FormErrorMessage,
    Divider,
    useColorModeValue,
    Img,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import Web3 from "web3";
import AppsDropdown from "../components/AppsDropdown";
//
// import NextLink from "next/link";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import Logo from "../../public/elysium-logo.svg";
// import LoginImg from "../../public/login-img.png";
import BgBodyShadow from "../public/bg-body.png";
// import Head from "next/head";
// import { FormProvider, useForm } from "react-hook-form";
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/router";
// import { loginSchema } from "../../validations/authValidations";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { getFromLocalStorage } from "../../utils";
// import {useWeb3Context} from "../../context/web3Context";
import {v4 as uuidv4} from "uuid";
import {Spinner} from "@chakra-ui/react";
import {mobileAccount, useWeb3Context} from "../context/web3Context";
import {useWeb3React} from "@web3-react/core";
// import {utils} from "ethers";
import {useAuth} from "../context/AuthContext";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from 'react-redux';
import {setMobileAccount} from "../store/slices/mobileWalletSlice";

export default function LandingPage() {
    let web3 = undefined;
    const {logInWithMetamask} = useAuth();
    const {account, activate, deactivate,provider} = useWeb3React();
    const [loading, setLoading] = useState(false);
    const {connect, disconnect, connectWalletOnPageLoad,connectMobile} = useWeb3Context();
    const dispatch = useDispatch();
    const mobileAccount = useSelector((state) => state.mobileWallet.mobileAccount);

    useEffect(() => {
        if (account) {
            const id = uuidv4();

            signWallet(id,account);
        }
    }, [account]);

   useEffect(() => {
        if (mobileAccount) {
            const id = uuidv4();
            alert(id)
            signWalletmobile(id,mobileAccount);
        }
    }, [mobileAccount]);


    const connecMetamask = async () => {
        if (!window.ethereum) {
            window.alert("Please install MetaMask first.");
            return;
        }
         await connect();
    };

    const connecMetamaskMobile = async () => {
            if (!window.ethereum) {
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                 // open the deeplink page
                    const yourWebUrl = "https://wallet.elysiumchain.tech/";
                    window.location.href = `https://metamask.app.link/dapp/${yourWebUrl}`;
                // window.location.href = "metamask://open?url=https://wallet.elysiumchain.tech/";
                return;
            }
            // MetaMask is not installed
        }
        // if (!window.ethereum) {
        //     window.alert("Please install MetaMask app and open website on metamask browser.");
        //     return;
        // }else {
        //     window.location.href = "metamask://open?url=https://wallet.elysiumchain.tech/";
        // }
      await connect();
    };
    const signWalletmobile = async (message,account) => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = window.ethereum;
                const web3 = new Web3(provider);

                const accounts = await provider.request({
                    method: 'eth_requestAccounts',
                });

                // const signedMessage = web3.eth.accounts.sign(message, account);
                // const signature = signedMessage.signature;

                await logInWithMetamask(account, message);
            } else {
                console.log('Metamask not detected');
            }
        } catch (error) {
            console.error(error);
        }

    };
    const signWallet = async (message,account) => {
        console.log("about to sign wallet....");
        if (window.ethereum) {
            try {
                web3 = new Web3(window.ethereum);
                const signature = await web3.eth.personal.sign(message, account);
                await logInWithMetamask(account, message, signature);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("Web3 provider not found");
        }
    };

    return (
        <>
            <Box
                backgroundImage={BgBodyShadow.src}
                backgroundSize={"cover"}
                backgroundAttachment={"fixed"}
                minH={"100vh"}
            >
                {/* <Head>
                <title>Login</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
              </Head> */}

                <Container maxW="1320px" minH={"inherit"} display={'flex'} flexDirection={'column'}>
                    <Flex
                        mb={["25px", "40px", "40px"]}
                        flexDirection={["column", "row", "row", "row"]}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Image
                            mb={["25px", "0px", "0px"]}
                            maxWidth={"300px"}
                            w={"100%"}
                            src="/elysium-logo-compact.svg"
                            alt="Elysium Cloud Wallet"
                        />
                        <Box display={"flex"} alignItems={"center"}>
                            <Box ml={"10px"} pl={"10px"}>
                                <AppsDropdown/>
                            </Box>
                        </Box>
                    </Flex>
                    <SimpleGrid
                        alignItems={"center"}
                        columns={[1, 1, 1, 2]}
                        p={["20px 10px", "15px", "25px", "50px"]}
                        pt={'10px'}
                        spacingX={"60px"}
                        my={'auto'}
                    >
                        <Box>
                            <Heading
                                position={"relative"}
                                fontSize={"56px"}
                                marginBottom={"24px"}
                                _before={{
                                    content: '""',
                                    background:
                                    "transparent radial-gradient(closest-side at 53% 44%, #FA45C1 0%, #CB389D 21%, #571843 62%, #32303900 100%) 0% 0% no-repeat padding-box"    ,
                                    mixBlendMode: " color-dodge",
                                    position: "absolute",
                                    top: "-85px",
                                    right: "inherit",
                                    bottom: "inherit",
                                    left: "-85px",
                                    width: "220px",
                                    height: "220px",
                                    zIndex: "-1",
                                }}
                            >
                                Elysium Cloud Wallet
                            </Heading>
                            <Text fontSize={"30px"} marginBottom={"32px"}>
                                Keep everything in one place
                            </Text>
                            <Text color={"#ADA7B7"} fontSize={"24px"} marginBottom={"48px"} lineHeight={'36px'} >
                                Unleash the power of web3 with Elysium Cloud Wallet. Seamlessly manage, secure, and explore all your digital assets.
                            </Text>
                            <Button display={{sm:'none',md:'block'}} variant="solid" size="lg" onClick={connecMetamask}>
                                {loading ? (
                                    <>
                                        <Spinner/>
                                    </>
                                ) : (
                                    "CONNECT WALLET"
                                )}
                            </Button>
                            <Button display={{sm:'block',md:'none'}} variant="solid" size="lg" onClick={connecMetamaskMobile}>
                                {loading ? (
                                    <>
                                        <Spinner/>
                                    </>
                                ) : (
                                    "CONNECT WALLET"
                                )}
                            </Button>
                        </Box>
                        <Box>
                            <Image
                                mb={["25px", "0px", "0px"]}
                                w={"100%"}
                                src="/Connect wallet – landing page.png"
                                alt="Elysium Cloud Wallet"
                            />
                        </Box>
                    </SimpleGrid>
                    <Flex
                        fontSize={"14px"}
                        fontWeight={"300"}
                        mt={'auto'}
                        py={5}
                        justifyContent={"space-between"}
                        borderTop={"1px solid #ffffff10"}
                    >
                        <Text>© 2021-23 Elysium</Text>
                        <UnorderedList display={"flex"} listStyleType={"none"} m={0}>
                            <ListItem mr={"25px"}>
                                <Link
                                    fontSize="14px"
                                    fontWeight="300"
                                    href="https://web-elysium.vulcanforged.com/TermsAndConditions/Index"
                                    target="_blank"
                                >
                                    Terms & Conditions
                                </Link>
                            </ListItem>
                            <ListItem mr={"25px"}>
                                <Link
                                    fontSize="14px"
                                    fontWeight="300"
                                    href="https://web-elysium.vulcanforged.com/PrivacyPolicy/Index"
                                    target="_blank"
                                >
                                    Privacy
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </Flex>
                </Container>
            </Box>
        </>
    );
}
