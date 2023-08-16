import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Stack, Box ,Text} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { closeModal } from "../../store/slices/ModalSlice";
import { AvatarUploader } from "./../AvatarUploader";

const EditProfileModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      walletAddress: user?.walletAddress,
      twitter: user?.twitter,
      medium: user?.medium,
      telegram: user?.telegram,
    },
  });
  const { updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;
  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <Modal
      size={"3xl"}
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
              Edit Profile Details
            </ModalHeader>
            <ModalCloseButton
              fontSize={"15px"}
              mt={2}
              _focus={{ boxShadow: "none" }}
              color={"#ada7b7"}
            />
            <ModalBody>
              <Stack direction="row">
                <Box>
                  <AvatarUploader
                    name="profilePhoto"
                    id="uploadAvatar"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    changeValue={(value) => setValue("profilePhoto", value)}
                    previewImage={`data:image/png;base64, ${user?.profilePhoto}`}
                  />
                </Box>
                <Box width="100%">
                  <FormControl mb={"24px"}>
                    <FormLabel>Display Name</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Enter your display name"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="displayName"
                      {...register("displayName",{ maxLength: 25 })}
                    />
                    {errors.displayName && <Text color={"red"}>Enter Maximum 25 charachter </Text>}
                  </FormControl>
                  {/*<FormControl mb={"24px"}>*/}
                  {/*  <FormLabel>Email</FormLabel>*/}
                  {/*  <Input*/}
                  {/*    size="lg"*/}
                  {/*    placeholder="Enter you email"*/}
                  {/*    _placeholder={{ opacity: 1, color: "#5C498E" }}*/}
                  {/*    type="email"*/}
                  {/*    name="email"*/}
                  {/*    disabled*/}
                  {/*    {...register("email")}*/}
                  {/*  />*/}
                  {/*</FormControl>*/}
                  {/* <FormControl mb={"24px"}>
                    <FormLabel>Wallet Address</FormLabel>
                    <Input
                      size="lg"
                      placeholder="Enter your address"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="walletAddress"
                      {...register("walletAddress")}
                    />
                  </FormControl> */}
                  <FormControl mb={"24px"}>
                    <FormLabel>Twitter</FormLabel>
                    <Input
                      size="lg"
                      placeholder="http://"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="twitter"
                      {...register("twitter")}
                    />
                  </FormControl>
                  <FormControl mb={"24px"}>
                    <FormLabel>Medium</FormLabel>
                    <Input
                      size="lg"
                      placeholder="http://"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="medium"
                      {...register("medium")}
                    />
                  </FormControl>
                  <FormControl mb={"24px"}>
                    <FormLabel>Telegram</FormLabel>
                    <Input
                      size="lg"
                      placeholder="http://"
                      _placeholder={{ opacity: 1, color: "#5C498E" }}
                      type="text"
                      name="telegram"
                      {...register("telegram")}
                    />
                  </FormControl>
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => dispatch(closeModal())}
              >
                Close
              </Button>
              <Button type="submit" variant="solid">
                SAVE CHANGES
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditProfileModal;
