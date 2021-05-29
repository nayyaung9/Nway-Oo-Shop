import React from "react";
import Head from 'next/head';
import Layout from "@/components/layout/Layout";
import { all } from "@/middlewares/index";
import { fetchShopById } from "@/db/index";
import { HStack, Container, Heading, Avatar } from "@chakra-ui/react";
import ProductHorizontalList from "@/components/products/ProductHorizontalList";

const ShopName = ({ shop }) => {
  console.log("props", shop);
  return (
    <Layout>
      <Head>
        <title>{shop ? shop.shopname : 'Shop'}</title>
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
  return { props: { shop } };
}

export default ShopName;
