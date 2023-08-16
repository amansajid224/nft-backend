import React, { useState, useEffect } from "react";
import { ChakraProvider, extendTheme, useToast } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import selectTheme from "../components/Select";
import { cardTheme } from "../components/Card";
import { switchTheme } from "../components/Switch";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import "../styles/globals.scss";
import { tabsTheme } from "../components/Tabs";
import { AuthContextProvider } from "../context/AuthContext";
import { Provider, useDispatch } from "react-redux";
import store from "../store/store";
import ModalManager from "../components/Modal/ModalManager";
import Head from "next/head";
import Layout from "../components/layout";
import { PUBLIC_ROUTES } from "../components/Routes";
import "./../styles/sidebar.css";
import { Web3Provider } from "../context/web3Context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {useAuth} from "../context/AuthContext";
import io from 'socket.io-client';
import {socket} from "../context/socket";
const helpers = createMultiStyleConfigHelpers(["menu", "item"]);
const Menu = helpers.defineMultiStyleConfig({
  baseStyle: {
    /* menu: {
            bg: 'yellow',
            boxShadow: 'lg',
            rounded: 'lg',
            flexDirection: 'column',
            py: '0',
        },*/
    item: {
      fontFamily: "Archivo, sans-serif",
      textTransform: "uppercase",
      fontSize: "14px",
      fontWeight: "600",
      bg: "transparent",
      color: "#9FC131",
      _hover: {
        bg: "rgba(255,255,255,0.2)",
      },
    },
  },
  variants: {
    HeaderDropDown: {
      item: {
        color: "#212529",
        _hover: {
          bg: "rgba(255,255,255,0.2)",
        },
      },
    },
    Notification: {
      item: {
        textTransform: "capitalize",
        color: "#fff",
        _hover: {
          bg: "rgba(255,255,255,0.2)",
        },
      },
    },
  },
});
const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};
const theme = extendTheme({
  breakpoints,
  components: {
    Menu,
    Select: selectTheme,
    Card: cardTheme,
    Tabs: tabsTheme,
    Switch: switchTheme,
    Checkbox: {
      baseStyle: {
        icon: {
          color: "#140533",
        },
        control: {
          bg: "#140533",
          border: "1px",
          borderColor: "#3B2864",
          borderRadius: "6px",
          width: "24px",
          height: "24px",
          _checked: {
            bg: "#9FC131",
            borderColor: "#9FC131",
          },
          /*_disabled: {
                        borderColor: 'gray.300',
                        bg: 'gray.200',
                    },*/
        },
        label: {
          color: "#fff",
          fontSize: "120px",
        },
      },
    },
    Input: {
      defaultProps: {
        variant: "backgroundFix",
      },
      variants: {
        backgroundFix: {
          field: {
            bg: "#140533",
            borderRadius: "6px",
            fontSize: "16px",
          },
        },
      },
      baseStyle: {
        field: {
          color: "gray.500",
          borderColor: "#3B2864",
          borderWidth: "1px",
          borderStyle: "solid",
          caretColor: "white",
          _autofill: {
            textFillColor: "#c6c6c6",
            boxShadow: "0 0 0px 1000px #140533 inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
          _invalid: {
            borderColor: "red",
          },
          /*_hover: {
                        bg: "red",
                    },
                    _focus: {
                        bg: "green",
                    },*/
        },
      },
    },
    NumberInput: {
      defaultProps: {
        variant: "backgroundFix",
      },
      variants: {
        backgroundFix: {
          field: {
            bg: "#140533",
            borderRadius: "6px",
            fontSize: "16px",
          },
        },
      },
      baseStyle: {
        field: {
          color: "gray.500",
          borderColor: "#3B2864",
          borderWidth: "1px",
          borderStyle: "solid",
          caretColor: "white",
          _autofill: {
            textFillColor: "#c6c6c6",
            boxShadow: "0 0 0px 1000px #140533 inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
          _invalid: {
            borderColor: "red",
          },
          /*_hover: {
                        bg: "red",
                    },
                    _focus: {
                        bg: "green",
                    },*/
        },
      },
    },
    Form: {
      baseStyle: {
        container: {
          label: {
            fontSize: "18px",
            fontWeight: "400",
            color: "white",
            marginBottom: "7px",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "700",
        color: "white",
      },
      sizes: {
        xl: {
          fontSize: "48px",
        },
        lg: {
          fontSize: "40px",
        },
        md: {
          fontSize: "32px",
        },
        sm: {
          fontSize: "24px",
        },
        xs: {
          fontSize: "20px",
        },
      },
    },
    Button: {
      // The styles all button have in common
      baseStyle: {
        fontFamily: "Archivo, sans-serif",
        fontWeight: "600",
        textTransform: "uppercase",
        borderRadius: "6px",
        letterSpacing: "0.28px",
      },
      // Two sizes: sm and md
      /* sizes: {
                sm: {
                    fontSize: 'sm',
                    px: 4, // <-- px is short for paddingLeft and paddingRight
                    py: 3, // <-- py is short for paddingTop and paddingBottom
                },
                md: {
                    fontSize: 'md',
                    px: 6, // <-- these values are tokens from the design system
                    py: 4, // <-- these values are tokens from the design system
                },
            },*/
      // Two variants: outline and solid
      variants: {
        outline: {
          minW: "auto",
          border: "1px solid",
          borderColor: "#9FC131",
          color: "#9FC131",
          fontSize: "14px",
          height: "40px",
          _hover: {
            bg: "#9FC131",
            color: "#140533",
          },
          _active: {
            bg: "#9FC131",
            color: "#140533",
          },
        },
        solid: {
          border: "1px solid",
          borderColor: "#9FC131",
          color: "#140533",
          bg: "#9FC131",
          fontSize: "14px",
          height: "40px",
          _hover: {
            color: "#fff",
            bg: "#9FC13199",
          },
          _active: {
            color: "#fff",
            bg: "#9FC13199",
          },
        },
        link: {
          color: "#9FC131",
          fontSize: "14px",
          textDecoration: "none",
          _hover: {
            textDecoration: "none",
          },
          _focus: {
            color: "#9FC131",
          },
        },
      },
      // The default size and variant values
      defaultProps: {
        size: "md",
        variant: "outline",
      },
    },
    Modal: {
      baseStyle: {
        fontFamily: "Archivo, sans-serif",
        fontWeight: "600",
        textTransform: "uppercase",
        borderRadius: "6px",
        letterSpacing: "0.28px",
        dialog: {},
      },
      ModalOverlay: {
        bg: "red",
      },
    },
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Archivo, sans-serif",
    fontSize: "10px",
  },
  styles: {
    global: {
      body: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        bgImage: "../bg-body-inner.png",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        bgColor: "#140533",
        lineHeight: "26px",
        color: "white",
        fontSize: "18px",
      },
    },
  },
});
function getLibrary(provider) {
  return new Web3(provider);
}
function MyApp({ Component, pageProps, ...appProps }) {
  const {token} =useAuth()
  const [events, setEvents] = useState("");
  const [userData, setUserData] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [cookieToken,setCookieToken]=useState(Cookies.get('token'))
  const getUserData = () => {
    const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    setUserData(user);
  };

  useEffect(() => {
    Cookies.get("token") && getUserData();
  }, [Cookies.get("token")]);

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  // const socketConfigration = () => {
  //   socket.on("transferNft", function (data) {
  //     alert("thishhhhhh")
  //     if (data) {
  //       let message = data;
  //       setEvents(message);
  //       Cookies.set("hasUnreadNotif", true)
  //       toast({
  //         title: "You have received one new NFT",
  //         isClosable: true,
  //         status: "success",
  //       });
  //     }
  //   });
  //   socket.on("transferToken", function (data) {
  //     if (data) {
  //       let message = data;
  //       setEvents(message);
  //       Cookies.set("hasUnreadNotif", true)
  //       toast({
  //         title: `You have received ${message?.tokenInfo?.tokenName} : ${message?.value * 1e-18}`,
  //         isClosable: true,
  //         status: "success",
  //       });
  //     }
  //   });
  // };
  //
  // useEffect(() => {
  //   userData?.id && socketConfigration();
  // }, [userData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("password-less-Authentication", false);
    }
  }, []);

  const withoutLayout =
      PUBLIC_ROUTES.includes(appProps.router.pathname) ||
      appProps.router.pathname === "/_error";
  const LayoutComponent = withoutLayout ? React.Fragment : Layout;

  return (
      <>
        <Head>
          <title>Elysium Cloud Wallet</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Web3ReactProvider getLibrary={getLibrary}>
          <Provider store={store}>
            <AuthContextProvider>
              <Web3Provider>
                <ChakraProvider theme={theme}>
                  <LayoutComponent>
                    <Component {...pageProps} event={events} />
                    <ModalManager />
                  </LayoutComponent>
                </ChakraProvider>
              </Web3Provider>
            </AuthContextProvider>
          </Provider>
        </Web3ReactProvider>
      </>
  );
}

export default MyApp;
