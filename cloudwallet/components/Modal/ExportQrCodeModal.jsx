import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useWeb3Context } from "../../context/web3Context";
import { closeModal } from "../../store/slices/ModalSlice";

const ExportQrCodeModal = ({ isOpen }) => {
  const { account } = useWeb3Context();
  const dispatch = useDispatch();
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  return (
    <>
      <Modal
        size={"xl"}
        isOpen={isOpen}
        onClose={() => dispatch(closeModal())}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <form action="" type="post">
          <ModalContent
            bg={"#241446"}
            borderRadius={"24px"}
            border={"1px solid"}
            borderColor={"#3B2864"}
            p={"25px"}
            className={"ModalCentered"}
          >
            <ModalHeader
              mb={"20px"}
              p={0}
              className={"Archivo"}
              fontSize={"24px"}
              fontWeight={"bold"}
            >
              Export QR Code
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
              onClick={() => dispatch(closeModal())}
            />
            <ModalBody>
              <Stack direction="row">
                <Box
                  borderRadius="12px"
                  bg="#140533"
                  border="1px solid #3B2864"
                  padding="5"
                  ref={qrRef}
                >
                  <QRCodeCanvas
                    id="qrCode"
                    value={account}
                    size={160}
                    level={"H"}
                  />
                </Box>
                <Box>
                  <Text textAlign="left" mt="20px">
                    Click the below button and download your QR code image.
                  </Text>
                  <Button
                    type="button"
                    variant="outline"
                    mr="15px"
                    mt="70px"
                    onClick={() => dispatch(closeModal())}
                  >
                    CANCEL
                  </Button>
                  <Button
                    mt="70px"
                    type="button"
                    variant="solid"
                    onClick={(e) => downloadQRCode(e)}
                  >
                    Download
                  </Button>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default ExportQrCodeModal;
