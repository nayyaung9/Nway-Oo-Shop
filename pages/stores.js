import Layout from "@/components/layout/Layout";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useSWRInfinite } from "swr";
import fetcher from "@/lib/fetch";
import { Center, Heading, Avatar, Text, Container } from "@chakra-ui/react";
import styled from "styled-components";
import { textStringToUrl, capFirstWordFromString } from "@/utils/index";
import StoreListBanner from "@/components/shop/StoreListBanner";

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

const StoreList = () => {
  const { data } = useShops();
  const shops = data
    ? data.reduce((acc, val) => [...acc, ...val.shops], [])
    : [];

  return (
    <Layout>
      <Head>
        <title>Nweoo - Official Stores</title>
        <meta
          property="og:url"
          content={`https://nweoo-snacks.vercel.app/stores`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nweoo - Official Stores" />
        <meta
          property="og:description"
          content="Join Nweoo Official Stores and Sell your homemade product/"
        />
        <meta property="og:image" content="https://nweoo-snacks.vercel.app/default/logo.png" />
      </Head>
      <StoreListBanner />
      <Container maxW={"7xl"} mt="4">
        <Center mb="8">
          <Heading as="h5" size="md">
            Nweoo Shop's Official Stores
          </Heading>
        </Center>
        {Array.isArray(shops) &&
          shops.length > 1 &&
          shops.map((shop, i) => (
            <Card>
              <CardHorizontal>
                <div class="img-square-wrapper">
                  <Avatar
                    size="md"
                    src={
                      shop?.storeProfile
                        ? shop.storeProfile
                        : "/default/logo.png"
                    }
                    alt={`${shop?.shopname}-profile`}
                  />
                </div>
                <CardBody>
                  <Link
                    href={`/${shop && shop?._id}/${
                      shop && textStringToUrl(shop?.shopname)
                    }`}
                  >
                    <Heading as="h6" size="sm">
                      {shop.shopname
                        ? capFirstWordFromString(shop?.shopname)
                        : ""}
                    </Heading>
                  </Link>
                  <Text color={"gray.500"} isTruncated>
                    {shop?.shortBio ? shop?.shortBio : ""}
                  </Text>{" "}
                </CardBody>
              </CardHorizontal>
            </Card>
          ))}
      </Container>
    </Layout>
  );
};

const Card = styled.div`
  margin-bottom: 20px;
`;
const CardHorizontal = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const CardBody = styled.div`
  padding-left: 12px;
`;
export default StoreList;
