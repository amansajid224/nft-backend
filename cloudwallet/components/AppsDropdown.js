import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {Box, Button, Flex, Icon, Image, Link, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AppsDropdown() {
  const [appData, setAppData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/cdn.elysiumchain.tech/elysium-apps-icons/apps.json');
        setAppData(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

      <Menu variant="HeaderDropDown">
        <MenuButton
            minWidth={"14px"}
            p={"0"}
            border={0}
            as={Button}
            variant="link"
            direction={"ltr"}
        >
          <Icon
              fill={"#ada7b7"}
              xmlns="http://www.w3.org/2000/svg"
              width="14.001px"
              height="14.001px"
              viewBox="0 0 14.001 14.001"
          >
            <circle
                cx="2.555"
                cy="2.555"
                r="2.555"
                transform="translate(0 0)"
            />
            <circle
                cx="2.555"
                cy="2.555"
                r="2.555"
                transform="translate(0 8.891)"
            />
            <circle
                cx="2.555"
                cy="2.555"
                r="2.555"
                transform="translate(8.891 0)"
            />
            <circle
                cx="2.555"
                cy="2.555"
                r="2.555"
                transform="translate(8.891 8.891)"
            />
          </Icon>
        </MenuButton>
        <MenuList
            bg={"#1E0E3E"}
            rounded="lg"
            py={2}
            minWidth="302px"
            maxWidth="302px"
            mt="8px"
            border={"1px solid #3B2864"}
        >
          <Flex flexWrap={"wrap"}>

            {
              appData.map((app,i)=>{

                return(
                    <Box width={"33%"} key={i}>
                      <MenuItem bg={"#1E0E3E"} >
                        <Link
                            href={app?.url}
                            isExternal={true}
                            style= {
                            {
                                textDecoration: "none",
                                color: "#ADA7B7",
                                fontSize: "11px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                                textTransform:'none',
                            }}
                            disabled={app?.title === 'LaunchPad' ?true:false}
                            _disabled={{color:'#707070!important',
                                pointerEvents: "none!important",
                                cursor:"not-allowed!important" ,
                            }}
                        >
                          <Image
                              maxWidth={"24px"}
                              src={app?.icon}
                              alt="Meta Mask"
                              style={{}}
                              _hover={{
                                  filter:
                                      "invert(30%) sepia(66%) saturate(446%) hue-rotate(33deg) brightness(95%) contrast(89%)",
                               }}
                          />
                          {app?.title}
                        </Link>
                      </MenuItem>
                    </Box>

                )

              })
            }

          </Flex>
        </MenuList>
      </Menu>

  );
}
