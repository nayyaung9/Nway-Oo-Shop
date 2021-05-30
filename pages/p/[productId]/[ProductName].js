import Layout from "@/components/layout/Layout";
import React from "react";
import {
  Container,
  Flex,
  Box,
  HStack,
  Text,
  Heading,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchProductById } from "@/db/index";
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

          <Container maxW="container.lg" mt="10">
            <Heading as="h4" size="md" mb="4">
              {product?.title}
            </Heading>

            <Heading as="h5" size="sm">
              Price
            </Heading>
            {product?.price}

            <Heading as="h5" size="sm">
              Description
            </Heading>
            <div dangerouslySetInnerHTML={{ __html: product?.content }} />
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

  return { props: { data: JSON.stringify(product) } };
}

export default ProductDetail;
