import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { useToast } from "@chakra-ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "../store/slices/NotificationSlice";
import {
  fetchNfts, NftSlice,
  selectIsLoading,
  selectNftsList, updateList,

} from "../store/slices/NftSlice";
import TokenAbi from "../abis/erc20.json";
import ERC721Abi from "../abis/erc721.json";
import { injected, walletConnectConnector } from "../utils/connector";
import { removeAllNfts } from "../store/slices/NftSlice";
import { closeModal } from "../store/slices/ModalSlice";
import { setTokenBalance, setTokensBalances } from "../store/slices/TokenSlice";
import { fetchLatestNotifications } from "../store/slices/NotificationSlice";
import { transferApi } from "../api/notifications/Transfer";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {socket} from "./socket";

const Web3context = createContext({});

export const useWeb3Context = () => useContext(Web3context);

export const Web3Provider = ({ children }) => {
  const web3 = new Web3(Web3.givenProvider);
  const [error, setError] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { account, activate, deactivate } = useWeb3React();
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const [newTokenBalance, setNewTokenBalance] = useState({});
  const tokenBalances = useSelector((state) => state.tokens.tokenBalances);
  const nftId = Number(
    typeof window !== "undefined" &&
      window.location.search?.split("&nftAddress=")[0]?.split("?id=")[1]
  );

  useEffect(() => {
    getBalance();
  }, [account]);

  const getBalance = async (tokenAddress) => {
    if (!account) {
      return;
    }
    let balance = await web3.eth.getBalance(
      web3.utils.toChecksumAddress(account)
    );
    balance = web3.utils.fromWei(balance.toString(), "ether");
    setBalance(balance);
  };

  const transeferTokenFn = async (recipientAddress, amount, tokenAddress) => {
    if (recipientAddress === null && amount === null) {
      throw new Error("Fields must not be empty");
    }
    if (!tokenAddress && tokenAddress === undefined) {
      web3.eth
        .sendTransaction(
          {
            from: account,
            to: recipientAddress,
            value: Web3.utils.toWei(amount.toString(), "ether"),
          },
          (err, transacHash) => {
            setIsLoading(true);
            if (err) {
              setError(err);
                setIsLoading(false);
                dispatch(closeModal());
            } else {
              setTransactionHash(transacHash);
            }
          }
        )
        .then((result) => {
          setIsLoading(false);
          dispatch(createNotification(result?.transactionHash));
          getBalance();
        });
    } else {
      const token = new web3.eth.Contract(TokenAbi.abi, tokenAddress);
      const decimals = await token.methods.decimals().call();
      const weiAmount = (amount * Math.pow(10, decimals)).toString();
      const balance = await token.methods.balanceOf(account).call();
      if (balance < weiAmount) {
        toast({
          title: "Insufficient Balance",
          isClosable: true,
          status: "error",
        });
        dispatch(closeModal());
        // throw new Error("Insuficiant Balance");
      }else{
        try{
          token.methods
              .transfer(recipientAddress, weiAmount)
              .send({
                from: account,
              })
              .on("transactionHash", async function (hash) {
                setTransactionHash(hash);
              })
              .then(async (r) => {
                const balanceAfter = await token.methods.balanceOf(account).call();
                const updatedTokenBalances = { ...tokenBalances };
                updatedTokenBalances[tokenAddress] =
                    balanceAfter / Math.pow(10, decimals).toString();
                dispatch(setTokensBalances({ tokenBalances: updatedTokenBalances }));
                dispatch(
                    setTokenBalance({
                      tokenBalance: balanceAfter / Math.pow(10, decimals).toString(),
                    })
                );
              })
              .catch((err) => {
                setError(err);
                setIsLoading(false);
              });

        }catch (e) {
          dispatch(closeModal())
          toast({
            title: e.message,
            isClosable: true,
            status: "error",
          });

        }
      }
    }
  };

  const getTokenBalance = async (tokenAddress) => {
    const token = new web3.eth.Contract(TokenAbi.abi, tokenAddress);
    try {
      const decimals = await token.methods.decimals().call();
      const decimalBalance = await token.methods.balanceOf(account).call();
      const balance = (decimalBalance / Math.pow(10, decimals)).toString();
      return balance;
    } catch (error) {
      console.log(error);
    }
  };

  const addNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x53B",
          chainName: "Elysium",
          nativeCurrency: { name: "LAVA", symbol: "LAVA", decimals: 18 },
          rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
          blockExplorerUrls: ["https://explorer.elysiumchain.tech/"],
        },
      ],
    });
  };

  const connectWalletOnPageLoad = async () => {
    if (localStorage?.getItem("isWalletConnected") === "true") {
      try {
        await activate(injected);
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  async function connect() {
    try {
      await activate(injected).then(async () => {
        if (typeof window.ethereum === "undefined") {
          return;
        }
        if (window.ethereum.networkVersion !== 1339) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(1339) }],
            });
          } catch (e) {
            addNetwork();
          }
          Cookies.set("isWalletConnected", true);
          localStorage.setItem("isWalletConnected", true);
        }
      });
      return true;
    } catch (ex) {
      console.log(ex);
    }
  }

  const convertToEther = (ammount) => {
    return web3.utils.fromWei(ammount.toString(), "ether");
  };

  async function disconnect() {
    try {
      deactivate();
      dispatch(removeAllNfts());
      Cookies.remove("isWalletConnected");
      localStorage.setItem("isWalletConnected", false);
      router.push('/')
    } catch (ex) {
      console.log(ex);
    }
  }

  async function walletConnect() {
    try {
      await activate(walletConnectConnector);
      Cookies.set("isWalletConnected", true);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function transferNativToken(tokenAddress, amount, recipientAddress) {
    if (
      recipientAddress === null &&
      amount === null &&
      tokenAddress === undefined
    ) {
      throw new Error("Fields must not be empty");
    }
    web3.eth
      .sendTransaction(
        {
          from: account,
          to: recipientAddress,
          value: Web3.utils.toWei(amount.toString(), "ether"),
        },
        (err, transacHash) => {
          setIsLoading(true);
          if (err) {
            setError(err);
            setIsLoading(false);
          } else {
            setTransactionHash(transacHash);
          }
        }
      )
      .then((result) => {
        setIsLoading(false);
        dispatch(createNotification(result?.transactionHash));
        getBalance();
      });
  }

  async function transferNft(
    tokenId,
    tokenAddress,
    WalletAddress,
    receiverAddress
  ) {
    // Object Initialization
    const Token = new web3.eth.Contract(ERC721Abi.abi, tokenAddress);

    // Check Token Owner
    const owner = await Token.methods.ownerOf(tokenId).call();
    if (owner.toLowerCase() !== WalletAddress.toLowerCase()) {
      toast({
        title: "You are not the owner of this token.",
        isClosable: true,
        status: "error",
      });
      return;
    }
    setIsLoading(true);
    Token.methods
      .safeTransferFrom(WalletAddress, receiverAddress, tokenId)
      .send({
        from: WalletAddress,
      })
      .on("transactionHash", async function (hash) {})
      .then((r) => {
        tokenTransferNotif(WalletAddress, receiverAddress, tokenId);
        toast({
          title: "NFT Transfered successfully",
          isClosable: true,
          status: "success",
        });
        dispatch(updateList({id:tokenId}));
        // Cookies.set("nftId", tokenId);
        // router.push(`/nft?nftId=${tokenId}`);
        dispatch(fetchNfts({tokenId:tokenId}))
         router.push(`/nft`);

        dispatch(closeModal());
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "nft transfer error...")
        setIsLoading(false);
        toast({
          title: e.message,
          isClosable: true,
          status: "error",
        });
        dispatch(closeModal());
      });
  }
  const tokenTransferNotif = async (
    WalletAddress,
    receiverAddress,
    tokenId
  ) => {
    try {
      const res = await transferApi({
        title: "NFT transfered successfully!",
        description: `Token# ${tokenId} Transferred from ${WalletAddress.slice(
          0,
          5
        ).toLowerCase()}...${WalletAddress.slice(37, 42).toLowerCase()}
          to ${receiverAddress.slice(0, 5).toLowerCase()}...${receiverAddress
          .slice(37, 42)
          .toLowerCase()}
          `,
      });
      if (res) {
        dispatch(fetchLatestNotifications(5));
        Cookies.set("hasUnreadNotif", true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Web3context.Provider
      value={{
        error,
        transactionHash,
        transeferTokenFn,
        account: account,
        setError,
        setTransactionHash,
        isLoading,
        getTokenBalance,
        balance,
        disconnect,
        connect,
        connectWalletOnPageLoad,
        walletConnect,
        transferNft,
        convertToEther,
        newTokenBalance,
      }}
    >
      {children}
    </Web3context.Provider>
  );
};
