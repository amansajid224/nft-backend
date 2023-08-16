import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

function FileInput() {
  onchange = () => {};
  return (
    // add token
    // <>
    //   <FormLabel>Token Symbole</FormLabel>
    //   <Flex mb={"24px"}>
    //     <Input type="text" paddingTop={"9px"}></Input>

    //     <Button
    //       htmlFor="upload"
    //       variant="solid"
    //       position="absolute"
    //       right={"51px"}
    //       top={"112px"}
    //       paddingTop={"9px"}
    //       paddingBottom={"9px"}
    //     >
    //       Upload
    //     </Button>
    //     <Input
    //       placeholder="0-8"
    //       _placeholder={{ opacity: 1, color: "#5C498E" }}
    //       type="file"
    //       variant="outline"
    //       size="lg"
    //       marginRight="2"
    //       display="none"
    //       id="upload"
    //     />
    //   </Flex>
    // </>
    <>
      <>
        <FormLabel>Token Symbole</FormLabel>
        <Flex mb={"24px"}>
          <Input type="text" paddingTop={"9px"} readOnly></Input>

          <FormLabel
            htmlFor="upload"
            variant="solid"
            position="absolute"
            right={"38px"}
            top={"113px"}
            paddingTop={"9px"}
            paddingBottom={"9px"}
            background="#9FC131"
            border="1px solid"
            borderColor="#9FC131"
            color="#140533"
            fontSize="14px"
            height="39px"
            _hover={{
              color: "#fff",
              bg: "#9FC13199",
            }}
            _active={{
              color: "#fff",
              bg: "#9FC13199",
            }}
            textTransform="uppercase"
            borderRadius="6px"
            letterSpacing="0.28px"
            padding="6px 24px"
          >
            BROWSER
          </FormLabel>
          <Input
            placeholder="0-8"
            _placeholder={{ opacity: 1, color: "#5C498E" }}
            type="file"
            variant="outline"
            size="lg"
            marginRight="2"
            display="none"
            id="upload"
          />
        </Flex>
      </>
    </>
  );
}
export default FileInput;
