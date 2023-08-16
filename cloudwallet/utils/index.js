import {isEmpty} from "lodash-es";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useWeb3Context} from "../context/web3Context";
import {
    selectTokens,
    setTokenBalance,
    setTokensBalances,
} from "../store/slices/TokenSlice";
import axios from "axios";

export const setToLocalStorage = (key, value) => {
    if (key !== "" && value) {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, value);
        }
    }
};

export const getFromLocalStorage = (key) => {
    if (key !== "") {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem(key);
        }
    }
};
export const removeFromLocalStorage = (key) => {
    if (key !== "") {
        if (typeof window !== "undefined") {
            return window.localStorage.removeItem(key);
        }
    }
};
export const getBase64 = (file, cb) => {
    if (file && file !== "undefined") {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }
};

export function removeItemFromArr(array, key, value) {
    const index = array.findIndex((obj) => obj[key] === value);
    return index >= 0
        ? [...array.slice(0, index), ...array.slice(index + 1)]
        : array;
}

export function generateNotification(type, payload) {
    let notification = {};
    switch (type) {
        case "tokenTransaction":
            notification = {
                title: "Transaction Completed Successfully",
                description: `Your Transaction Has Been Completed Successfully, Your Transaction hash is ${
                    payload?.transactionHash.slice(0, 5) +
                    "..." +
                    payload?.transactionHash.slice(payload?.transactionHash.length - 5)
                }`,
            };
    }
    return notification;
}

export const UseOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
export const UseTokenBalance = (tokenAddress) => {
    const tokenBalances = useSelector((state) => state.tokens.tokenBalances);
    const tokenBalance = useSelector((state) => state.tokens.tokenBalance);
    const {getTokenBalance, account} = useWeb3Context();
    const dispatch = useDispatch();
    const tokens = useSelector(selectTokens);

    useEffect(() => {
        async function fetchTokenBalances() {
            if (tokenAddress) {
                let newTokenBalance = 0;
                if (account) {
                    newTokenBalance = await getTokenBalance(tokenAddress);
                }
                dispatch(setTokenBalance({tokenBalance: newTokenBalance}));
            } else {
                const newTokenBalances = {};
                if (tokens.length > 0) {
                    for (const token of tokens) {
                        if (account) {
                            const balance = await getTokenBalance(token.contractAddress);
                            newTokenBalances[token.contractAddress] = balance;
                        } else {
                            newTokenBalances[token.contractAddress] = 0;
                        }
                    }
                }
                dispatch(setTokensBalances({tokenBalances: newTokenBalances}));
            }
        }

        fetchTokenBalances();
    }, [tokens, account]);
    return {tokenBalance, tokenBalances};
};

export const findUrlKeyInObj = (obj) => {
    const urlRegex = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && urlRegex.test(obj[key])) {
            console.log(key + " contains a URL: " + obj[key]);
            return {key, url: obj[key]};
        }
    }
};

export const genrateNftUrl = (nft) => {
    let url = "";
    if (!isEmpty(nft)) {
        if(nft) {
            url = `${process.env.NEXT_PUBLIC_IPFS_URL}/${nft}`;
            console.log("this is imageii",url)
        }
        else {
            url =
                `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoUsPtVYYwemvMubkGlX1SWJ5_JfWFRE220Q&usqp=CAU`;
        }
        return url;
    }
};

export const generateNftUrlWrapper = (imageHash, token_uri = null) => {
    let imageHash_ = imageHash.Image ? imageHash.Image : imageHash.image;
    if (!imageHash_) {
        return '/noImg.png';
    }
    let tokenURI = token_uri ? token_uri : process.env.NEXT_PUBLIC_IPFS_URL
    tokenURI +=  "/"+imageHash_;

    if (tokenURI && tokenURI.includes("elysium-marketplace")) {
        tokenURI += '?pinataGatewayToken=D733o6EvbfVkpfoYO0H1laIMSx_XibvOXgZ8S-AGYEJO0omqZ9oDZrYOWyYF73yq';
    }

    return tokenURI;
};
export const parseIpfsObject = (json) => {
    const title_ = json.Title || json.title || json.name || json.Name || ''
    return {
        title: title_.substring(0, 15)+"....",
        full_title: title_
    }
}

function renameObjKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

export function generateRandomImage() {
    const randomNumber = Math.floor(Math.random() * (8 - 1) + 1);
    const imageName = `/SlideLogo-${randomNumber}.png`;
    return imageName;
}

export const truncateFromMiddle = (fullStr = "", strLen, middleStr = "...") => {
    if (fullStr.length <= strLen) return fullStr;
    const midLen = middleStr.length;
    const charsToShow = strLen - midLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
        fullStr.substr(0, frontChars) +
        middleStr +
        fullStr.substr(fullStr.length - backChars)
    );
};
