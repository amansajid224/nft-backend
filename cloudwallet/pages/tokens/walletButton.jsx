import React, { useEffect,useState } from "react";
import {Flex, Button, Icon, Box, Spinner} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/ModalSlice";
import { messages } from "../../constants";
import { useWeb3Context } from "../../context/web3Context";
import { addWalletAddressApi, removeWalletAddressApi } from "../../api/wallet";
import Cookies from "js-cookie";

const WalletButton = ({ isHeaderBtn }) => {
  const dispatch = useDispatch();
  const { account, connect, disconnect } = useWeb3Context();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const saveWalletAddress = async () => {
    dispatch(
      openModal({
        modal: "ConfirmationModal",
        props: {
          isOpen: true,
          title: messages.confirmation_modal.title,
          message: "Do you want to disconnect wallet",
          cancelLabel: messages.confirmation_modal.cancelLabel,
          actionLabel: messages.confirmation_modal.actionLabel,
          handleAction: saveAdd,
        },
      })
    )
  }

  const saveAdd = async() => {
    try{
      const res = await removeWalletAddressApi({walletAddress : account})
    disconnect()
  }
  catch(err){
    console.log(err)
  }
  }

  const removeWalletAddress = async() => {
    try{
      setTimeout(()=>{
        connect();
      },2000)
      // const res = await addWalletAddressApi({walletAddress : account})
      // if(res){
      //
      // }
    }
  catch(err){
    connect();
    console.log(err)
  }
  };

  useEffect(()=>{
    account && removeWalletAddress()
  },[account])

  useEffect(()=>{
    Cookies.get("isWalletConnected") && removeWalletAddress()
  },[])

  const boxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "700",
  };

  const flexStyle = {
    minH: "50vh",
    alignItems: "center",
    justifyContent: "center",
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsWalletConnected(true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>

      <Flex {...(!isHeaderBtn && flexStyle)} ml={isHeaderBtn && "auto"}>
        <Box {...(!isHeaderBtn && boxStyle)}>
          {!isHeaderBtn}
          <span
            // onClick={() => {
            //   account ? saveWalletAddress() : removeWalletAddress();
            // }}
          >

             {(isWalletConnected)
                 &&(
            <Button
              display={{ lg: "flex", md: "none", sm: "none" }}
              className={"Archivo"}
              fontWeight={"500"}
              color={"#301C50"}
              fontSize={"14px"}
              bg={"#ADA7B7"}
              _hover={{ bg: "#ADA7B7" }}
              borderRadius={"6px"}
              p={"4px"}
              border={0}
              mr={"10px"}
              ml={isHeaderBtn ? "auto" : "10px"}
              w={{ lg: "160px", md: "0", sm: "0" }}
              cursor={"auto"}
            >
              {account
                  ?
                  <>

              <Icon
                me={"10px"}
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                viewBox="0 0 64 64"
              >
                <g transform="translate(-295 -842)">
                  <circle
                    cx="32"
                    cy="32"
                    r="32"
                    transform="translate(295 842)"
                    fill="#513d7b"
                  />
                  <g transform="translate(310 858)">
                    <path
                      d="M33.263,1,19.824,11l2.5-5.893Z"
                      transform="translate(-0.564 -1)"
                      fill="#e17726"
                      stroke="#e17726"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M2.663,1,15.982,11.093,13.6,5.107Z"
                      transform="translate(-0.961 -1)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M28.31,23.533l-3.576,5.493,7.656,2.12,2.193-7.493Z"
                      transform="translate(-0.45 -0.347)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M1.273,23.653l2.18,7.493,7.643-2.12L7.533,23.533Z"
                      transform="translate(-0.994 -0.347)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M10.519,14.645,8.392,17.872l7.576.347-.253-8.2Z"
                      transform="translate(-0.829 -0.739)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M25.274,14.648,20,9.928l-.173,8.293,7.576-.347Z"
                      transform="translate(-0.564 -0.741)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M10.873,29.022,15.459,26.8,11.511,23.7Z"
                      transform="translate(-0.771 -0.342)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M20.266,26.8l4.572,2.227-.625-5.32Z"
                      transform="translate(-0.554 -0.342)"
                      fill="#e27625"
                      stroke="#e27625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M24.838,28.935l-4.572-2.227.372,2.987-.04,1.267Z"
                      transform="translate(-0.554 -0.255)"
                      fill="#d5bfb2"
                      stroke="#d5bfb2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M10.873,28.935l4.254,2.027L15.1,29.695l.359-2.987Z"
                      transform="translate(-0.771 -0.255)"
                      fill="#d5bfb2"
                      stroke="#d5bfb2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M15.194,21.851l-3.8-1.12,2.685-1.24Z"
                      transform="translate(-0.759 -0.464)"
                      fill="#233447"
                      stroke="#233447"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M20.513,21.851l1.117-2.36,2.7,1.24Z"
                      transform="translate(-0.548 -0.464)"
                      fill="#233447"
                      stroke="#233447"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M10.954,29.027l.665-5.493-4.227.12Z"
                      transform="translate(-0.852 -0.347)"
                      fill="#cc6228"
                      stroke="#cc6228"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M24.1,23.533l.651,5.493,3.576-5.373Z"
                      transform="translate(-0.465 -0.347)"
                      fill="#cc6228"
                      stroke="#cc6228"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M27.4,17.651,19.824,18l.7,3.907,1.117-2.36,2.7,1.24Z"
                      transform="translate(-0.564 -0.517)"
                      fill="#cc6228"
                      stroke="#cc6228"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M11.462,20.784l2.685-1.24,1.117,2.36.7-3.907-7.576-.347Z"
                      transform="translate(-0.829 -0.517)"
                      fill="#cc6228"
                      stroke="#cc6228"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M8.392,17.651l3.177,6.227-.106-3.093Z"
                      transform="translate(-0.829 -0.517)"
                      fill="#e27525"
                      stroke="#e27525"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M24.244,20.784l-.12,3.093L27.3,17.651Z"
                      transform="translate(-0.464 -0.517)"
                      fill="#e27525"
                      stroke="#e27525"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M15.813,17.988l-.7,3.907L16,26.508l.2-6.08Z"
                      transform="translate(-0.673 -0.508)"
                      fill="#e27525"
                      stroke="#e27525"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M19.833,17.988l-.372,2.427.186,6.093.891-4.613Z"
                      transform="translate(-0.572 -0.508)"
                      fill="#e27525"
                      stroke="#e27525"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M20.533,21.816l-.891,4.613.638.453,3.948-3.093.12-3.093Z"
                      transform="translate(-0.568 -0.429)"
                      fill="#f5841f"
                      stroke="#f5841f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M11.393,20.7l.106,3.093,3.948,3.093.638-.453-.891-4.613Z"
                      transform="translate(-0.759 -0.429)"
                      fill="#f5841f"
                      stroke="#f5841f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M20.816,30.9l.04-1.267-.346-.293H15.433l-.332.293.027,1.267-4.254-2.027L12.362,30.1l3.017,2.093H20.55L23.581,30.1l1.475-1.227Z"
                      transform="translate(-0.771 -0.192)"
                      fill="#c0ac9d"
                      stroke="#c0ac9d"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M20.388,26.721l-.638-.453H16l-.638.453L15,29.708l.332-.293h5.078l.346.293Z"
                      transform="translate(-0.676 -0.268)"
                      fill="#161616"
                      stroke="#161616"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M33.824,11.653l1.13-5.52L33.252,1,20.266,10.667l5,4.24,7.058,2.067,1.555-1.827-.678-.493,1.077-.987-.824-.64,1.077-.827Z"
                      transform="translate(-0.554 -1)"
                      fill="#763e1a"
                      stroke="#763e1a"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M1,6.133l1.143,5.52-.731.547,1.09.827-.824.64,1.077.987-.678.493,1.555,1.827,7.058-2.067,5-4.24L2.7,1Z"
                      transform="translate(-1 -1)"
                      fill="#763e1a"
                      stroke="#763e1a"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M32.232,16.582l-7.058-2.067L27.3,17.742l-3.177,6.227,4.2-.053H34.6Z"
                      transform="translate(-0.464 -0.608)"
                      fill="#f5841f"
                      stroke="#f5841f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M10.683,14.515,3.625,16.582,1.273,23.915H7.533l4.2.053L8.557,17.742Z"
                      transform="translate(-0.994 -0.608)"
                      fill="#f5841f"
                      stroke="#f5841f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                    <path
                      d="M19.974,18.364l.452-7.813,2.047-5.56H13.354l2.047,5.56.452,7.813.173,2.453.013,6.067h3.748l.013-6.067Z"
                      transform="translate(-0.714 -0.884)"
                      fill="#f5841f"
                      stroke="#f5841f"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.25"
                    />
                  </g>
                </g>
              </Icon>
              {account?.slice(0, 5) + "..." + account?.slice(37, 42)}
                  </>
                :
                <>
                <Spinner/>
                </>
              }
            </Button>
             )}
          </span>{" "}
        </Box>
      </Flex>
    </>
  );
};
export default WalletButton;
