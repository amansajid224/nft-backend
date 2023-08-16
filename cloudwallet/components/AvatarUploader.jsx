import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { getBase64 } from "../utils";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";

export const AvatarUploader = ({ changeValue, previewImage, ...rest }) => {
  const [avatar, setAvatar] = useState(previewImage);
  const onChange = (event) => {
    getBase64(event.target.files[0], (base64Image) => {
      setAvatar(base64Image);
    });
    changeValue(event.target.files[0]);
  };
  return (
    <>
      <Avatar size="2xl" src={avatar} position="relative">
        <FormControl
          as="fieldset"
          position="absolute"
          width={"18px"}
          right={"0px"}
          bottom={"10px"}
        >
          <FormLabel
            me={"0"}
            mb={"0"}
            htmlFor="uploadAvatar"
            cursor="pointer"
            background={"#9FC131"}
            borderRadius={"6px"}
            width={"28px"}
            height={"28px"}
            textAlign={"center"}
          >
            <Icon
              _groupHover={{ fill: "#fff" }}
              fill={"#000000"}
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
            >
              <path
                d="M-1475.894,4995.686a.987.987,0,0,1-.256-.752l.122-1.469a1.025,1.025,0,0,1,.183-.5l3.823-5.461a1.02,1.02,0,0,1,.832-.436.972.972,0,0,1,.561.176l1.214.85a.989.989,0,0,1,.407.664,1.024,1.024,0,0,1-.176.735l-3.823,5.458a1.028,1.028,0,0,1-.409.343l-1.339.617a1,1,0,0,1-.42.093A.974.974,0,0,1-1475.894,4995.686Zm1.132-2.046-.075.9.82-.378,2.217-3.166-.745-.522Zm3.695-3.69.683-.976-.745-.522-.683.976Zm-15.167,6.052a2.769,2.769,0,0,1-2.766-2.766v-14.468a2.769,2.769,0,0,1,2.766-2.766h14.468a2.768,2.768,0,0,1,2.766,2.766V4986a.638.638,0,0,1-.638.638.638.638,0,0,1-.639-.638v-7.229a1.491,1.491,0,0,0-1.49-1.489h-14.468a1.491,1.491,0,0,0-1.49,1.489v14.468a1.492,1.492,0,0,0,1.49,1.49h8.506a.638.638,0,0,1,.639.638.639.639,0,0,1-.639.639Zm.437-4.278a.638.638,0,0,1-.52-.738l1.37-7.918a1.224,1.224,0,0,1,.891-.979,1.222,1.222,0,0,1,1.261.391l2.436,2.868,1.855-1.876a1.237,1.237,0,0,1,.935-.364,1.233,1.233,0,0,1,.895.453l1.654,2.033a.638.638,0,0,1-.092.9.638.638,0,0,1-.9-.092l-1.622-1.994-1.856,1.876a1.233,1.233,0,0,1-.922.364,1.234,1.234,0,0,1-.891-.434l-2.4-2.833-1.354,7.823a.638.638,0,0,1-.628.53A.653.653,0,0,1-1485.8,4991.723Zm9.86-10.877a1.97,1.97,0,0,1,1.967-1.967,1.97,1.97,0,0,1,1.968,1.967,1.971,1.971,0,0,1-1.968,1.968A1.971,1.971,0,0,1-1475.938,4980.845Zm1.277,0a.691.691,0,0,0,.69.691.691.691,0,0,0,.691-.691.692.692,0,0,0-.691-.691A.692.692,0,0,0-1474.661,4980.845Z"
                transform="translate(1489 -4976)"
              />
            </Icon>
          </FormLabel>
          <Input type="file" onChange={onChange} {...rest} />
        </FormControl>
      </Avatar>
    </>
  );
};
