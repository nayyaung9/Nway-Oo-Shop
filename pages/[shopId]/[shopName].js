import React, { useState } from "react";
import Head from "next/head";
import { all } from "@/middlewares/index";
import { fetchShopById, fetchProductsByShop } from "@/db/index";
import {
  Stack,
  Container,
  Heading,
  Avatar,
  SimpleGrid,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/index";
import ProductGridList from "@/components/products/ProductGridList";
import ShopLayout from "@/components/layout/ShopLayout";
import moment from "moment";
import { PhoneIcon } from "@chakra-ui/icons";

const ShopName = ({ data }) => {
  const [user] = useCurrentUser();
  const shop = JSON.parse(data);
  const { products } = shop;
  const [shopTab, setShopTab] = useState(0);

  console.log(shop);

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
            <div
              style={{
                position: "relative",
                height: 150,
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${
                    shop?.storeCoverPhoto
                      ? shop?.storeCoverPhoto
                      : "/default/logo.png"
                  })`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  backgroundPosition: "50%",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",

                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,.6)",
                    height: "100%",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      position: "absolute",
                      top: ".625rem",
                      left: "1.25rem",
                      right: ".875rem",
                      bottom: ".625rem",
                    }}
                  >
                    <Avatar
                      name="Dan Abrahmov"
                      src={
                        shop?.storeProfile
                          ? shop?.storeProfile
                          : "/default/logo.png"
                      }
                    />
                    <Stack pl="4">
                      <Heading as="h4" size="md" color="white">
                        {shop.shopname}
                      </Heading>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>

            <SimpleGrid minChildWidth="120px" spacing="40px">
              <Box>
                <Heading as="h6" size="sm" mb="3">
                  Location
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
              </Box>

              <Box>
                <Heading as="h6" size="sm" mb="3">
                  Products
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {products && products.length}
                </Text>

                <Heading as="h6" size="sm" mt="3" mb="3">
                  Joined
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {moment(shop.createdAt).fromNow()}
                </Text>
              </Box>
            </SimpleGrid>
          </SimpleGrid>

          {shop && shop.orderSystem && (
            <Text fontSize="md" color="gray.700">
              {shop?.orderSystem ? shop?.orderSystem : "LoL"}
            </Text>
          )}

          <Tabs onChange={(index) => setShopTab(index)}>
            <TabList>
              <Tab>Products</Tab>
              <Tab>New</Tab>
              <Tab>Contact</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0" pt="4">
                <ProductGridList products={products} />
              </TabPanel>
              <TabPanel>No News Available</TabPanel>
              <TabPanel>
                <PhoneIcon /> {shop?.phoneNumber}
                <br />
                {shop?.fbLink ? (
                  <a href={shop?.fbLink}>
                    <Button mt="4" colorScheme="facebook" size="sm">
                      Contact Seller on Facebook
                    </Button>
                  </a>
                ) : (
                  <span>Seller does not provide facebook page yet</span>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
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
