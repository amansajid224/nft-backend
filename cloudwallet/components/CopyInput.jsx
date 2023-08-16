import { useClipboard } from "@chakra-ui/react";
import { useEffect } from "react";
import { Flex, Input, Tooltip, Button, Icon } from "@chakra-ui/react";

export const CopyInput = ({ copyText, copyValue }) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard();
  useEffect(() => {
    setValue(copyValue);
  }, [copyValue]);
  return (
    <Flex
      bg={"#140533"}
      border={"solid 1px"}
      borderColor={"#3B2864"}
      borderRadius={"6px"}
      w="100%"
    >
      <Input
        fontSize={"14px"}
        color={"#fff"}
        bg={"none"}
        border={"none"}
        isreadonly="true"
        placeholder="Wallet Address"
        type={"text"}
        value={copyText}
        istruncated="true"
        noOfLines={1}
        disabled
        mb={0}
      />
      <Tooltip hasArrow label="copied" bg="green.600" isOpen={hasCopied}>
        <Button
          h={"auto"}
          p={2}
          border={"0"}
          bg={"none"}
          _hover={{ bg: "none" }}
          _focus={{ bg: "none" }}
          onClick={onCopy}
          isDisabled={!value ? true : false}
        >
          {/*{hasCopied ? "Copied!" : "Copy"}*/}
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
          >
            <g transform="translate(-2.3 -2.3)">
              <path
                d="M15.069,12.8h6.448a2.271,2.271,0,0,1,2.269,2.269v6.448a2.271,2.271,0,0,1-2.269,2.269H15.069A2.271,2.271,0,0,1,12.8,21.516V15.069A2.271,2.271,0,0,1,15.069,12.8Zm6.448,9.313a.6.6,0,0,0,.6-.6V15.069a.6.6,0,0,0-.6-.6H15.069a.6.6,0,0,0-.6.6v6.448a.6.6,0,0,0,.6.6Z"
                transform="translate(-5.485 -5.485)"
                fill="#fff"
              />
              <path
                d="M5.285,13.285H4.569A2.271,2.271,0,0,1,2.3,11.016V4.569A2.271,2.271,0,0,1,4.569,2.3h6.448a2.271,2.271,0,0,1,2.269,2.269v.716a.836.836,0,1,1-1.672,0V4.569a.6.6,0,0,0-.6-.6H4.569a.6.6,0,0,0-.6.6v6.448a.6.6,0,0,0,.6.6h.716a.836.836,0,1,1,0,1.672Z"
                transform="translate(0 0)"
                fill="#fff"
              />
            </g>
          </Icon>
        </Button>
      </Tooltip>
    </Flex>
  );
};
