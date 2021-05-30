import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { all } from "@/middlewares/index";
import { fetchShopById } from "@/db/index";
import { HStack, Container, Heading, Avatar, Button } from "@chakra-ui/react";
import ProductHorizontalList from "@/components/products/ProductHorizontalList";
import { useCurrentUser } from "@/hooks/index";

const ShopName = ({ data }) => {
  const [user] = useCurrentUser();
  const shop = JSON.parse(data);

  return (
    <Layout>
      <Head>
        <title>{shop ? shop.shopname : "Shop"}</title>
      </Head>
      {!shop ? (
        <div>Loading...</div>
      ) : (
        <Container mt="4" maxW="container.xl">
          <HStack>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

            <Heading as="h4" size="md">
              {shop.shopname}
            </Heading>
          </HStack>
          {shop?.shopOwnerId === user?._id && (
            <Button
              colorScheme="blue"
              size="sm"
              as="a"
              href={`/${shop && shop._id}/${
                shop && shop.shopname.replace(/\s/g, "-").toLowerCase()
              }/setting`}
            >
              Button
            </Button>
          )}
          <ProductHorizontalList title="Available Foods" />
        </Container>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const shop = await fetchShopById(context.req.db, context.params.shopId);
  if (!shop) context.res.statusCode = 404;
  return { props: { data: JSON.stringify(shop) } };
}

export default ShopName;
