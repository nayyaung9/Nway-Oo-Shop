import ProductDetailLayout from "@/components/layout/ProductDetailLayout";
import React from "react";
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
import { fetchProductById, fetchShopById } from "@/db/index";
import ProductDetailImageSlider from "@/components/products/ProductDetailImageSlider";
import { numberWithCommas } from "@/utils/index";
import { SearchIcon } from "@chakra-ui/icons";

const ProductDetail = ({ data }) => {
  const product = JSON.parse(data);

  return (
    <ProductDetailLayout productName={product?.title}>
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
                  <Heading as="h4" size="md">
                    Ks {numberWithCommas(product?.estimatedPrice ? product?.estimatedPrice : 0)}
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
                <Heading as="h6" size="sm" mb="3" color="gray.500">
                  Description
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: product?.content }} />
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading as="h6" size="sm" mb="3" color="gray.500">
                  Various prices
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.price}
                </Text>
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading as="h5" size="sm" mb="3" color="gray.500">
                  Delivery
                </Heading>
                <Text fontSize="md" color="gray.700">
                  {product?.delivery ? product?.delivery : "-"}
                </Text>{" "}
              </Container>
            </Box>

            <Box pt={2} pb={2} bg="white" mt="3">
              <Container maxW="container.lg">
                <Heading as="h5" size="sm" mb="3" color="gray.500">
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
                      src="https://bit.ly/ryan-florence"
                    />
                    <Text ml="3">{product?.shop?.shopname}</Text>
                  </div>
                  <Button colorScheme="orange" variant="outline" size="sm">
                    Visit Store
                  </Button>
                </div>
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

  const payload = {
    ...product,
    shop,
  };

  return { props: { data: JSON.stringify(payload) } };
}

export default ProductDetail;
