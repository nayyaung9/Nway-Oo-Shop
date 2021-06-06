import ProductDetailLayout from "@/components/layout/ProductDetailLayout";
import React from "react";
import Head from "next/head";
import {
  Container,
  Box,
  Heading,
  Avatar,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import {
  fetchProductById,
  fetchShopById,
  fetchProductsByShop,
} from "@/db/index";
import ProductDetailImageSlider from "@/components/products/ProductDetailImageSlider";
import { numberWithCommas, removeTags } from "@/utils/index";
import { SearchIcon } from "@chakra-ui/icons";
import { theme } from "@/utils/theme";
import RelatedProductList from "@/components/products/RelatedProductList";

const ProductDetail = ({ data }) => {
  const product = JSON.parse(data);
  console.log("ps", product);
  return (
    <ProductDetailLayout productName={product?.title}>
      <Head>
        <title>{product ? product.title : "Nweoo Snacks"}</title>
        <meta
          property="og:url"
          content={`https://nweoo-snacks.vercel.app/p/${
            product ? product._id : ""
          }/${product ? product.title?.replace(/\s/g, "-").toLowerCase() : ""}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={product ? product.title : "Nweoo Snacks"}
        />
        <meta
          property="og:description"
          content={product ? removeTags(product.content) : ""}
        />
        <meta property="og:image" content={product?.productImages[0]} />
      </Head>
      {!product ? (
        <div>Loading....</div>
      ) : (
        <React.Fragment>
          <ProductDetailImageSlider images={product?.productImages} />
          <Box w="100%" bg="#eff0f5" mb="4">
            <Box pt={4} pb={4} bg="white">
              <Container maxW="container.lg" mt="4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Heading as="h4" size="md" color={theme.secondaryColor}>
                    Ks{" "}
                    {numberWithCommas(
                      product?.estimatedPrice ? product?.estimatedPrice : 0
                    )}
                  </Heading>
                  <IconButton
                    style={{ background: "transparent" }}
                    aria-label="Call Segun"
                    size="sm"
                    icon={<SearchIcon />}
                  />
                </div>

                <Text fontSize="md" color="gray.700">
                  {product?.title}
                </Text>
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading
                  as="h4"
                  size="sm"
                  color={theme.secondaryColor}
                  size="md"
                  mb="3"
                >
                  Description
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: product?.content }} />
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading
                  as="h4"
                  size="sm"
                  color={theme.secondaryColor}
                  size="md"
                  mb="3"
                >
                  Various prices
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.price}
                </Text>
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading
                  as="h4"
                  size="sm"
                  color={theme.secondaryColor}
                  size="md"
                  mb="3"
                >
                  Delivery
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.delivery ? product?.delivery : "-"}
                </Text>{" "}
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading
                  as="h4"
                  size="sm"
                  color={theme.secondaryColor}
                  size="md"
                  mb="3"
                >
                  Payment
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.payment ? product?.payment : ""}
                </Text>{" "}
              </Container>
            </Box>

            <Box pt={4} pb={4} bg="white" mt="3">
              <Container maxW="container.lg">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      name="Ryan Florence"
                      src={
                        product?.shop?.storeProfile
                          ? product?.shop?.storeProfile
                          : "./default/logo.png"
                      }
                    />
                    <div>
                      <Text ml="3">{product?.shop?.shopname}</Text>
                      <Text ml="3">{product?.shop?.phoneNumber}</Text>
                    </div>
                  </div>
                  <Button colorScheme="orange" variant="outline" size="sm">
                    Visit Store
                  </Button>
                </div>
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading
                  as="h4"
                  size="sm"
                  color={theme.secondaryColor}
                  size="md"
                  mb="3"
                >
                  Customer Service
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.cutomerService ? product?.cutomerService : ""}
                </Text>{" "}
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <RelatedProductList
                  title={`${product?.shop?.shopname}'s Products`}
                  shopProducts={product?.shopProducts}
                />
              </Container>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </ProductDetailLayout>
  );
};

export async function getServerSideProps(context) {
  await all.run(context.req, context.res);
  const product = await fetchProductById(
    context.req.db,
    context.params.productId
  );

  if (!product) context.res.statusCode = 404;

  const shop = await fetchShopById(context.req.db, product?.shopId);
  if (!shop) context.res.statusCode = 404;

  const shopProducts = await fetchProductsByShop(context.req.db, shop?._id);
  if (!shopProducts) context.res.statusCode = 404;

  const payload = {
    ...product,
    shop,
    shopProducts,
  };

  return { props: { data: JSON.stringify(payload) } };
}

export default ProductDetail;
