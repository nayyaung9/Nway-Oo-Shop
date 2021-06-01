import React from "react";
import Head from "next/head";
import { all } from "@/middlewares/index";
import { fetchShopById, fetchProductsByShop } from "@/db/index";
import {
  HStack,
  Stack,
  Container,
  Heading,
  Avatar,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/index";
import ProductGridList from "@/components/products/ProductGridList";
import ShopLayout from "@/components/layout/ShopLayout";

const ShopName = ({ data }) => {
  const [user] = useCurrentUser();
  const shop = JSON.parse(data);
  const { products } = shop;

  return (
    <ShopLayout shopName={shop ? shop.shopname : "-"}>
      <Head>
        <title>{shop ? shop.shopname : "Shop"}</title>

        
      </Head>
      {!shop ? (
        <div>Loading...</div>
      ) : (
        <Container mt="4" maxW="container.lg" mb="8">
          <SimpleGrid minChildWidth="180px" spacing="40px" mb="8">
            <Box>
              <HStack>
                <Avatar
                  name="Dan Abrahmov"
                  src={shop?.storeProfile ? shop?.storeProfile : "/default/logo.png"}
                />
                <Stack>
                  <Heading as="h4" size="md">
                    {shop.shopname}
                  </Heading>

                  {shop && shop.orderSystem && (
                    <Text fontSize="md" color="gray.700">
                      {shop?.orderSystem ? shop?.orderSystem : "-"}
                    </Text>
                  )}
                </Stack>
              </HStack>
            </Box>

            <Box>
              <Heading as="h6" size="sm" mb="3">
                Address
              </Heading>
              <Text fontSize="md" color="gray.700">
                {shop?.shopAddress ? shop?.shopAddress : "-"}
              </Text>

              <Heading as="h6" size="sm" mt="3" mb="3">
                Phone Number
              </Heading>
              <Text fontSize="md" color="gray.700">
                {shop?.phoneNumber ? shop?.phoneNumber : "-"}
              </Text>

              {/* {shop?.shopOwnerId === user?._id && (
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
              )} */}
            </Box>
          </SimpleGrid>

          <ProductGridList
            products={products}
            productListName="Available Foods"
          />
        </Container>
      )}
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const shop = await fetchShopById(context.req.db, context.params.shopId);
  if (!shop) context.res.statusCode = 404;

  const shopProducts = await fetchProductsByShop(context.req.db, shop?._id);
  if (!shopProducts) context.res.statusCode = 404;

  const payload = {
    ...shop,
    products: shopProducts,
  };
  return { props: { data: JSON.stringify(payload) } };
}

export default ShopName;
