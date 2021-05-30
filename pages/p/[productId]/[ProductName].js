import Layout from "@/components/layout/Layout";
import React from "react";
import {
  Container,
  Box,
  Heading,
  Avatar,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchProductById, fetchShopById } from "@/db/index";
import ProductDetailImageSlider from "@/components/products/ProductDetailImageSlider";

const ProductDetail = ({ data }) => {
  const product = JSON.parse(data);
  console.log("product", product);
  return (
    <Layout>
      {!product ? (
        <div>Loading....</div>
      ) : (
        <Box w="100%">
          <ProductDetailImageSlider images={product?.productImages} />

          <HStack m="4">
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Heading as="h5" size="sm" ml="8">
              {product?.shop?.shopname}
            </Heading>
          </HStack>

          <Container maxW="container.lg" mt="10" mb="10">
            <Heading as="h4" size="md" mb="4">
              {product?.title}
            </Heading>
            <Box pt={4} pb={4}>
              <Heading as="h5" size="md" mb="3">
                Price
              </Heading>

              <Text fontSize="md" color="gray.700">
                {product?.price}
              </Text>
            </Box>
            <Divider />
            <Box pt={4} pb={4}>
              <Heading as="h5" size="md" mb="3">
                Description
              </Heading>
              <div dangerouslySetInnerHTML={{ __html: product?.content }} />
            </Box>{" "}
            <Divider />
            <Box pt={4} pb={4}>
              <Heading as="h5" size="md" mb="3">
                Delivery
              </Heading>
              <Text fontSize="md" color="gray.700">
                {product?.delivery ? product?.delivery : "-"}
              </Text>
            </Box>
            <Box pt={4} pb={4}>
              <Heading as="h5" size="md" mb="3">
                Payment
              </Heading>
              <Text fontSize="md" color="gray.700">
                {product?.payment ? product?.payment : ""}
              </Text>
            </Box>
            <Divider />
          </Container>
        </Box>
      )}
    </Layout>
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
