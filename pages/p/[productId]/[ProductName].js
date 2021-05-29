import Layout from "@/components/layout/Layout";
import React from "react";
import { Container, Box, HStack, Text, Heading, Image } from "@chakra-ui/react";
import { all } from "@/middlewares/index";
import { fetchProductById } from "@/db/index";

const ProductDetail = ({ data }) => {
  const product = JSON.parse(data);
  console.log('product', product);
  return (
    <Layout>
      <Container maxW="container.lg">
        {!product ? (
          <div>Loading....</div>
        ) : (
          <Box w="100%" p={4}>
            <HStack>
              <div style={{ flex: 1 }}>
                <Heading as="h4" size="md">
                  {product?.title}
                </Heading>
              </div>
              <div>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={product?.productImages[0]}
                  alt="Dan Abramov"
                />
              </div>
            </HStack>

            <div dangerouslySetInnerHTML={{ __html: product?.content }} />
          </Box>
        )}
      </Container>
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
