import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase.config";
import { endpoints } from "../constants";
import Api from "../api";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";
import {
  solveRegistrationChallenge,
  solveLoginChallenge,
} from "@webauthn/client";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../utils";
import Cookies, { remove, set } from "js-cookie";
import { useToast } from "@chakra-ui/toast";
import { isEmpty } from "lodash-es";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../store/slices/ModalSlice";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

const MetaMaskConnectionContext = createContext({});

export const useMetaMaskConnection = () => useContext(MetaMaskConnectionContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [twoFactorData, setTwoFactorData] = useState();
  const [secret, setSecret] = useState();
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const [webauthn, setWebauthn] = useState(false);
  const localWebAuth = getFromLocalStorage("webauthn");

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (typeof window !== "undefined") {
  //         window.localStorage.setItem(
  //           "user",
  //           JSON.stringify({
  //             _id: user.uid,
  //             email: user.email,
  //           })
  //         );
  //       }
  //     } else {
  //       window.localStorage.removeItem("user");
  //     }
  //   });
  //   setLoading(false);
  //   return () => unsubscribe();
  // });
  useEffect(() => {
    const userFromCookie = Cookies.get("user");
    const tokenFromCookie = Cookies.get("token");
    const isAuthenticatedFromCookie = Cookies.get("isAuthenticated");
    if (userFromCookie && tokenFromCookie && isAuthenticatedFromCookie) {
      setUser(JSON.parse(userFromCookie));
      setToken(tokenFromCookie);
      setIsAuthenticated(isAuthenticatedFromCookie);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getUserProfilePhoto();
  }, [isAuthenticated, user?.is2FAEnabled]);
  useEffect(() => {
    if (webauthn) {
      setToLocalStorage("webauthn", true);
    } else {
      setToLocalStorage("webauthn", false);
    }
  }, [webauthn]);
  useEffect(() => {
    if (localWebAuth) {
      setWebauthn(true);
    } else {
      setWebauthn(false);
    }
  }, []);
  const signUp = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const resp = await Api.post(
        endpoints.SIGNUP,
        JSON.stringify({ email, password })
      );
      if (resp.data.status === true) {
        setIsLoading(false);
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
        setResendEmail(email);
        router.push("/account/confirmation-email");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setStatus(false);
        setMessage(error.message);
      } else {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
        toast({
          title: error.response.data.message,
          isClosable: true,
          status: "error",
        });
      }
      setIsLoading(false);
    }
  };
  const logIn = async (email, password) => {
    try {
      setIsLoading(true);
      const resp = await Api.post(endpoints.LOGIN, { email, password });
      if (resp.data.status === true) {
        setIsLoading(false);
        if (resp.data.data.is2FAEnabled) {
          Cookies.set("isAuthenticated", false);
          Cookies.set("is2FaEnabled", resp.data.data.is2FAEnabled);
          setIsAuthenticated(false);
          setSecret(resp.data.data.secret);
          router.push("/account/validate-2fa");
        } else {
          setUser(resp.data.data.user);
          setToken(resp.data.data.access_token);
          setIsAuthenticated(true);
          Cookies.set("user", JSON.stringify(resp.data.data.user));
          Cookies.set("token", resp.data.data.access_token);
          Cookies.set("is2FaEnabled", resp.data.data.user.is2FAEnabled);
          Cookies.set("token_expiry", resp.data.data.tokenExpiryTime);
          Cookies.set("isAuthenticated", true);
          router.push("/dashboard");
          return Promise.resolve(true);
        }
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
      setIsLoading(false);
    }
  };
  const googleAuthentication = async () => {
    try {
      // const provider = new GoogleAuthProvider();
      googleProvider.addScope('email');
      const resp = await signInWithPopup(auth, googleProvider).then(
        async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);          
          //   console.log("ID TOKEN", credential.idToken);
          const token = credential.idToken;
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const email = user.providerData[0].email;
          console.log(user);
          try {
            setIsLoading(true);
            const resp = await Api.post(endpoints.GOOGLE_AUTH, {
              email: email,
              googleId: user.uid,
              profilePhoto: user.photoURL,
            });
            if (resp.data.status) {
              setUser(resp.data.data.user);
              setToken(resp.data.data.access_token);
              setIsAuthenticated(true);
              setIsLoading(false);
              Cookies.set("user", JSON.stringify(resp.data.data.user));
              Cookies.set("token", resp.data.data.access_token);
              Cookies.set("token_expiry", resp.data.data.tokenExpiryTime);
              Cookies.set("isAuthenticated", true);
              router.push("/dashboard");
              toast({
                title: resp.data.message,
                isClosable: true,
                status: "success",
              });
            }
          } catch (error) {
            toast({
              title: error.response.data.message,
              isClosable: true,
              status: "error",
            });
            setUser({});
            setToken("");
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const facebookAuthentication = async () => {
    try {
      const resp = await signInWithPopup(auth, facebookProvider).then(
        async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          //   console.log("ID TOKEN", credential.idToken);
          const token = credential.idToken;
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const email = user.providerData[0].email;
          try {
            setIsLoading(true);
            const resp = await Api.post(endpoints.FACEBOOK_AUTH, {
              email:email,
              facebookId: user.uid,
              profilePhoto: user.photoURL,
            });
            if (resp.data.status) {
              setUser(resp.data.data.user);
              setToken(resp.data.access_token);
              setIsAuthenticated(true);
              setIsLoading(false);
              Cookies.set("user", JSON.stringify(resp.data.data.user));
              Cookies.set("token", resp.data.data.access_token);
              Cookies.set("isAuthenticated", true);
              Cookies.set("token_expiry", resp.data.data.tokenExpiryTime);
              router.push("/dashboard");
              toast({
                title: resp.data.message,
                isClosable: true,
                status: "success",
              });
            }
          } catch (error) {
            toast({
              title: error.response.data.message,
              isClosable: true,
              status: "error",
            });
            setIsAuthenticated(false);
            setIsLoading(false);
            setUser({});
            setToken("");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      const resp = await Api.post(endpoints.FORGOT_PASSWORD, { email: email });
      if (resp.data) {
        setStatus(resp.data.status);
        setMessage(resp.data.message);
        router.push("/account/check-email");
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
        setForgetPasswordEmail(email);
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
      setIsLoading(false);
    }
  };
  const resetPassword = async (data) => {
    try {
      setIsLoading(true);
      const resp = await Api.patch(endpoints.RESET_PASSWORD, {
        email: data.email,
        code: data.token,
        password: data.password,
      });
      if (resp.data) {
        router.push("/");
        setIsLoading(false);
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
      setIsLoading(false);
    }
  };
  const getUserProfilePhoto = async () => {
    try {
      if (!isEmpty(user) && token) {
        const resp = await Api.get(endpoints.PROFILE_PHOTO);
        if (resp.data.status) {
          setUser((user) => ({
            ...user,
            profilePhoto: resp.data.data.profilePhoto,
          }));
        }
      }
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };
  const checkResetLinkExpiry = async (data) => {
    try {
      setIsLoading(true);
      const resp = await Api.post(endpoints.RESET_LINK_EXPIRY, {
        email: data.email,
        code: data.token,
      });
      if (resp.data) {
        setIsLoading(false);
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setStatus(false);
        setMessage(error.message);
      } else {
        toast({
          title: error.response.data.message,
          isClosable: true,
          status: "error",
        });
        setIsLoading(false);
      }
      // console.log(error);
    }
  };
  const resendVerifyEmail = async () => {
    try {
      setIsLoading(true);
      const resp = await Api.post(endpoints.RESENT_VERIFY_EMAIL, {
        email: resendEmail,
      });
      if (resp.data.status === true) {
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
        setIsLoading(false);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setStatus(false);
        setMessage(error.message);
      } else {
        toast({
          title: error.response.data.message,
          isClosable: true,
          status: "error",
        });
        setIsLoading(false);
      }
    }
  };
  const logout = async () => {
    try {
      const resp = await Api.post(endpoints.LOGOUT);
      if (resp.data.status) {
        Cookies.remove("isAuthenticated");
        Cookies.remove("user");
        Cookies.remove("token");
        Cookies.remove("is2FaEnabled");
        setUser({});
        setToken("");
        setIsAuthenticated(false);
        router.push("/");
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
    }
  };
  const updateUser = async (data) => {
    try {
      const resp = await Api.patch(endpoints.PROFILE, data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      if (resp.data.data) {
        setUser({ ...user, ...resp.data.data });
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
        dispatch(closeModal());
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
    }
  };
  const getPassKey = async (email) => {
    try {
      const resp = await Api.post(endpoints.PASS_KEY, { email: email });
      if (resp.data.data) {
        try {
          const res = await solveRegistrationChallenge(
            resp.data.data.challenge
          );
          if (res.rawId) {
            try {
              const passkeyVerificationResp = await Api.post(
                endpoints.PASS_KEY_VERIFICATION,
                {
                  publicKeyCredentials: res,
                  userEmail: email,
                }
              );
              if (passkeyVerificationResp.data.status) {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(
                    "password-less-Authentication",
                    true
                  );
                } else {
                  window.localStorage.setItem(
                    "password-less-Authentication",
                    false
                  );
                }
              }
              console.log(passkeyVerificationResp.data, "resp.data");
            } catch (error) {
              console.log(error, "error");
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authenticatePassKey = async (email) => {
    try {
      setIsLoading(true);
      const resp = await Api.post(endpoints.AUTHENTICATE_PASSKEY, { email });
      const data = await resp.data;
      if (data.status) {
        const authenticatorResp = await startAuthentication(data.data);
        if (authenticatorResp) {
          try {
            const verifyResp = await Api.post(endpoints.VERIFY_AUTH_PASSKEY, {
              email: email,
              authenticatorResponse: authenticatorResp,
              challenge: resp.data.data.challenge,
            });
            const verifyRespData = await verifyResp.data;
            if (verifyRespData.status) {
              setIsLoading(false);
              setUser(verifyRespData.data.user);
              setToken(verifyRespData.data.access_token);
              setIsAuthenticated(true);
              Cookies.set("user", JSON.stringify(verifyRespData.data.user));
              Cookies.set("token", verifyRespData.data.access_token);
              Cookies.set("token_expiry", verifyRespData.data.tokenExpiryTime);
              Cookies.set("isAuthenticated", true);
              router.push("/dashboard");
            }
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      // toast({
      //   title: error.response.data.message,
      //   isClosable: true,
      //   status: "error",
      // });
    }
  };
  const generatePasskey = async () => {
    try {
      const resp = await Api.get(endpoints.GENERATE_PASSKEY);
      const data = await resp.data.data;
      if (resp.status) {
        try {
          const authenticaterResp = await startRegistration(data);
          if (authenticaterResp.rawId) {
            verifiyPasskey(authenticaterResp);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifiyPasskey = async (authenticaterResp) => {
    if (authenticaterResp) {
      try {
        const resp = await Api.post(endpoints.VERIFY_PASSKEY, {
          authenticatorResponse: authenticaterResp,
        });
        const data = await resp.data;
        if (data.status) {
          setWebauthn(true);
          setToLocalStorage("email", user?.email);
          toast({
            title: data.message,
            isClosable: true,
            status: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deletePasskey = async () => {
    if (token) {
      try {
        const resp = await Api.delete(endpoints.DELETE_PASSKEY);
        const data = await resp.data;
        if (data.status) {
          setWebauthn(false);
          removeFromLocalStorage("email");
          toast({
            title: data.message,
            isClosable: true,
            status: "success",
          });
        }
      } catch (error) {
        toast({
          title: error.response.data.message,
          isClosable: true,
          status: "error",
        });
      }
    }
  };
  const twoFaAuthenticaiton = async () => {
    try {
      const resp = await Api.get(endpoints.ENABLE_TWO_FACTOR_AUTH);
      if (resp.status) {
        setTwoFactorData(resp.data.data);
      }
    } catch (error) {}
  };
  const verifyTowFa = async (token) => {
    try {
      const resp = await Api.post(endpoints.VERIFY_TWO_FACTOR_AUTH, {
        token: token,
      });
      if (resp.data.status) {
        // Cookies.set("user", JSON.stringify(user));
        setUser((user) => {
          const { profilePhoto, ...rest } = user;

          Cookies.set("user", JSON.stringify({ ...rest, is2FAEnabled: true }));
          return { ...user, is2FAEnabled: true };
        });
        dispatch(closeModal());
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
    }
  };
  const validateTwoFa = async (code) => {
    try {
      const resp = await Api.post(endpoints.VALIDATE_TWO_FACTOR_AUTH, {
        token: code,
        secret: secret,
      });
      if (resp.data.status) {
        setUser(resp.data.data.user);
        setToken(resp.data.data.access_token);
        setIsAuthenticated(true);
        setIsLoading(false);
        Cookies.set("user", JSON.stringify(resp.data.data.user));
        Cookies.set("token", resp.data.data.access_token);
        Cookies.set("token_expiry", resp.data.data.tokenExpiryTime);
        router.push("/dashboard");
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
      setIsLoading(false);
    }
  };
  const disableTwoFa = async () => {
    try {
      const resp = await Api.patch(endpoints.DISABLE_TWO_FACTOR_AUTH);
      if (resp.data.status) {
        setUser((user) => {
          const { profilePhoto, ...rest } = user;
          Cookies.set("user", JSON.stringify({ ...rest, is2FAEnabled: false }));
          return {
            ...user,
            is2FAEnabled: false,
          };
        });
        dispatch(closeModal());
        toast({
          title: resp.data.message,
          isClosable: true,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
      });
    }
  };
  const dismissPasskey = () => {
    setWebauthn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        status,
        message,
        user,
        token,
        resendEmail,
        isLoading,
        signUp,
        logIn,
        logout,
        googleAuthentication,
        facebookAuthentication,
        forgotPassword,
        resetPassword,
        checkResetLinkExpiry,
        resendVerifyEmail,
        getPassKey,
        authenticatePassKey,
        updateUser,
        twoFactorData,
        twoFaAuthenticaiton,
        verifyTowFa,
        validateTwoFa,
        getUserProfilePhoto,
        secret,
        disableTwoFa,
        forgetPasswordEmail,
        generatePasskey,
        deletePasskey,
        webauthn,
        dismissPasskey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
