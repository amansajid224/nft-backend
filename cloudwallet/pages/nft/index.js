import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  SimpleGrid,
  InputLeftElement,
  InputGroup,
  FormControl,
  Card,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Input,
  Image,
  Link as ChakraLink,
  Icon,
  Spinner
} from "@chakra-ui/react";
import Link from "next/link";
import { SearchIcon } from "@chakra-ui/icons";
import SelectTheme from "../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNfts,
  selectIsLoading,
  selectNftsList,
} from "../../store/slices/NftSlice";
import { useWeb3Context } from "../../context/web3Context";
import { openModal } from "../../store/slices/ModalSlice";
import {generateNftUrlWrapper, genrateNftUrl, parseIpfsObject} from "../../utils";
import { Pageinator } from "../../components/Paginator";
import { messages } from "../../constants";
import { ElysiumIcon } from "../../components/Common"
import WalletButton from "../tokens/walletButton";
import Cookies from "js-cookie";
import Noimage from '../../public/noImg.png'

export default function nfts() {

  const dispatch = useDispatch();
  const nfts = useSelector(selectNftsList);
  const isLoading = useSelector(selectIsLoading);
  const pagination = useSelector((state) => state?.nfts?.pagination);
  const [page, setPage] = useState(1);
  const { account, connect } = useWeb3Context();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Sort by");
  const [keyName, setKeyName] = useState('id');
  const nftId = Number(
    typeof window !== "undefined" && window.location.search?.split("?nftId=")[1]
  );
  const nftTransferId=useSelector((state)=> state.nfts.nftTransferId)
  const [nfftt,setNfftt]=useState(Cookies.get('nftId'))
  const savedFilter = typeof window !== "undefined" && window.location.search?.split("?filter=")[1]
  const filtredNft = nfts?.filter((data) => data?.id !== nftId);

  // console.log("this is filter Id",filtredNft);
  const PageLength = [
    { value: "asc", label: "Token ID (ASC)",keyName:'tokenId' },
    { value: "des", label: "Token ID (DESC)" ,keyName:'tokenId'},
    { value: "ascc", label: "Title (ASC)" ,keyName:'title'},
    { value: "dess", label: "Title (DESC)" ,keyName:'title'},
  ];

  const handleSorting = (value,keyName) => {
    // setTimeout(()=>{
      setSortBy(value);
      setKeyName(keyName);
      // }, 1000);
  };
  useEffect(() => {
    if (account) {
      dispatch(
        fetchNfts({
          walletAddress: account,
          meta: { page, limit: 8, q: search, sortBy: savedFilter ? savedFilter : sortBy, tokenId:nftTransferId== 0 ? "":nftTransferId,sortOption:keyName},
          transferredNft: { data: [] },
          tokenId:nfftt
        })
      );
    }
  }, [page, search, account, sortBy, dispatch,nftTransferId]);

  const defaultFilter = () => {
    if(savedFilter == 'des'){
      setSortBy("Descending")
    }
    else if(savedFilter == 'asc'){
      setSortBy("Ascending")
    }
    else{
      setSortBy("Sort by")
    }
  }

  useEffect(()=>{defaultFilter()},[])
  return (
    <>
      <Flex mb={"17px"} direction={{ sm: "column", md: "row" }}>
        <Heading
          mr={"auto"}
          mb={["20px", "20px", "0", "0"]}
          as={"h3"}
          size={"md"}
        >
          NFTs
        </Heading>
        <FormControl
          maxW={{ sm: "100%", md: "300px" }}
          mr={"16px"}
          mb={["24px", "24px", "0", "0"]}
        >
          <InputGroup size="md">
            <Input
              pl="2.5rem"
              type="text"
              placeholder="Search by Name"
              _placeholder={{ opacity: 1, color: "#5C498E" }}
              onChange={(e) => {
                setTimeout(setSearch(e.target.value), 5000);
              }}
            />
            <InputLeftElement width="2.5rem">
              <SearchIcon color={"#5C498E"} />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
        <Box
          me={{ sm: "0", md: "15px" }}
          mb={{ sm: "24px", md: "0" }}
          minW={"150px"}
        >
          <SelectTheme
            placeholder={sortBy}
            options={PageLength}
            onChange={(e) => handleSorting(e.value,e.keyName)}
          />
        </Box>
        <ChakraLink
          href="https://agora.elysiumchain.tech/Collections/Create"
          target="_blank"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            mb={["24px", "24px", "0", "0"]}
            variant="outline"
            size="lg"
            isDisabled={!account}
            _disabled={{
              color: "#9FC131",
              opacity: "0.4",
              cursor: "not-allowed",
            }}
          >
            MINT NEW
          </Button>
        </ChakraLink>
      </Flex>
      {nfts?.length && nfts?.length <= 0 ? (
        <Text textAlign="center" fontSize={"24px"} fontWeight={"700"}>
          Record Not Found
        </Text>
      ) : (
        ""
      )}

      <>
        {!account || !filtredNft ?
            <>
              <Box width={'100%'} display={'flex'}>
                <Spinner m={'auto'}/>
              </Box>
            </>

            :
            <>
              <SimpleGrid spacing={4} columns={[1, 1, 4, 4]}>
              {filtredNft &&
                  filtredNft?.map((nft,i)=>{
                    const img= generateNftUrlWrapper(nft?.ipfs_data_object, nft?.token_uri)
                    const parseObj = parseIpfsObject(nft.ipfs_data_object);
                return(
                    <>
                      <Card _hover={{ cursor: "pointer" }} border={'1px solid #3B2864'}>
                        <Link
                            href={{
                              pathname: "/nft/detail",
                              query: {
                                id: nft?.id,
                                nftAddress: nft?.contract_address,
                                filter: sortBy,
                              },
                            }}
                        >
                          <CardBody>
                            <Box overflow={"hidden"}>
                              {<Image
                                  minH={"277px"}
                                  maxH={"277px"}
                                  maxW={"100%"}
                                  overflow={"hidden"}
                                  objectFit={"contain"}
                                  className={"hoverImage"}
                                  src={img ? img : '/noImg.png'}
                                  alt="Image"
                                  borderRadius="lg"
                                  width={"100%"}
                                  loading={"lazy"}
                                  css={{
                                    filter: img ? 'unset' : "brightness(0) invert(1) grayscale(1) contrast(10)",
                                  }}
                              />
                              }

                            </Box>
                            <Stack mt={"16px"} spacing={"5px"}>
                              <Text
                                  fontSize={"16px"}
                                  color={"#9EA5B4"}
                                  as={"label"}
                              >
                                ID# {nft?.id}
                              </Text>
                              <Heading
                                  fontSize={"18px"}
                                  fontWeight={"600"}
                                  as={"h6"}
                                  size="xs"
                              >{parseObj.title}</Heading>
                            </Stack>
                          </CardBody>
                          </Link>
                          <CardFooter mt={'auto'}>
                            <ButtonGroup width={"100%"} spacing="2" display={"flex"}>
                              <Button
                                  flex={1}
                                  variant="solid"
                                  maxW={"142px"}
                                  m={"auto"}
                                  onClick={() =>
                                      dispatch(
                                          openModal({
                                            modal: "TransferNftModal",
                                            props: {
                                              nft: {
                                                nft,
                                                name:
                                                    nft?.ipfs_data_object?.title,
                                                image_url: generateNftUrlWrapper(nft?.ipfs_data_object,nft?.token_uri),
                                                tokenId: nft?.id,
                                                tokenAddress: nft?.contract_address,
                                              },
                                            },
                                          })
                                      )
                                  }
                              >
                                TRANSFER
                              </Button>
                            </ButtonGroup>
                          </CardFooter>
                      </Card>
                    </>
                )
              })}
              </SimpleGrid>
              {nfts.length ? (
                  <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                  >
                    <Box mt={5}>
                      {pagination ? (
                          <Pageinator
                              onPageChange={(page) => {
                                setPage(page);
                              }}
                              current={pagination?.currentPage}
                              total={pagination?.results}
                              pageSize={8}
                          />
                      ) : (
                          ""
                      )}
                    </Box>
                  </Stack>
              ) : (
                  ""
              )}
            </>
        }

      </>
      {(!isLoading && account) && nfts?.length === 0 && <>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Box textAlign="center">
      <Text>No Record Found</Text>
      </Box>
    </Box></>}
    </>
  );
}
