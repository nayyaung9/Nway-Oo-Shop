import React from "react";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import Link from "next/link";
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
import { textStringToUrl, capFirstWordFromString } from "@/utils/index";
import { theme } from "@/utils/theme";

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
          <Heading as="h4" color={theme.secondaryColor} size="md">
            Official Stores{" "}
          </Heading>
          <Text>
            <Link href="/stores">See All</Link>
          </Text>
        </div>

        <div className="scrolling-wrapper-flexbox">
          {Array.isArray(shops) &&
            shops.length > 1 &&
            shops.map((shop, i) => (
              <Center className="store-card" key={i}>
                <Box
                  maxW={"180px"}
                  w={"full"}
                  h="100%"
                  bg={useColorModeValue("white", "gray.800")}
                  rounded={"md"}
                  overflow={"hidden"}
                >
                  <Image
                    h={"150px"}
                    w={"full"}
                    src={
                      shop?.storeCoverPhoto
                        ? shop?.storeCoverPhoto
                        : "/default/logo.png"
                    }
                    objectFit={"cover"}
                  />
                  <Flex justify={"center"} mt={-9}>
                    <Avatar
                      size={"xl"}
                      src={
                        shop?.storeProfile
                          ? shop.storeProfile
                          : "/default/logo.png"
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
                        <Link
                          href={`/${shop && shop?._id}/${
                            shop && textStringToUrl(shop?.shopname)
                          }`}
                        >
                          <Text noOfLines="1">
                            {shop ? capFirstWordFromString(shop.shopname) : ""}
                          </Text>
                        </Link>
                      </Heading>
                      <Text color={"gray.500"} isTruncated>
                        {shop?.shortBio ? shop?.shortBio : ""}
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
