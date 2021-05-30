import React from "react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export function useShops() {
  return useSWRInfinite(
    () => {
      return `/api/shops`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

const ShopList = () => {
  const { data } = useShops();
  const shops = data
    ? data.reduce((acc, val) => [...acc, ...val.shops], [])
    : [];

  return (
    <React.Fragment>
      <Box p={4}>
        <div className="flex-between">
          <Heading as="h4" color="gray.600" size="md">
            Official Stores{" "}
          </Heading>
          <Text>See All</Text>
        </div>

        <div className="scrolling-wrapper-flexbox">
          {Array.isArray(shops) &&
            shops.length > 1 &&
            shops.map((shop, i) => (
              <Center className="store-card" key={i}>
                <Box
                  maxW={"180px"}
                  w={"full"}
                  bg={useColorModeValue("white", "gray.800")}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Image
                    h={"180px"}
                    w={"full"}
                    src={
                      "https://static-01.shop.com.mm/original/fbde0a9ef01c979c4063a3e4c0bc93f7.jpg"
                    }
                    objectFit={"center"}
                  />
                  <Flex justify={"center"} mt={-9}>
                    <Avatar
                      size={"lg"}
                      src={
                        "https://static-01.shop.com.mm/other/shop/b98f57c2d6b599c26ca9f1a23a36de57.jpeg"
                      }
                      alt={"Author"}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Flex>

                  <Box p={6}>
                    <Stack spacing={0} align={"center"}>
                      <Heading
                        fontSize={"md"}
                        fontWeight={500}
                        fontFamily={"body"}
                      >
                        {shop ? shop.shopname : ""}
                      </Heading>
                      <Text color={"gray.500"} isTruncated>
                        Frontend Developer
                      </Text>
                    </Stack>
                  </Box>
                </Box>
              </Center>
            ))}
        </div>
      </Box>
    </React.Fragment>
  );
};

export default ShopList;
