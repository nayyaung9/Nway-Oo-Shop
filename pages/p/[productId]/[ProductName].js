import Layout from "@/components/layout/Layout";
import React from "react";
import { Container, Box, HStack, Text, Heading, Image } from "@chakra-ui/react";

const ProductDetail = () => {
  return (
    <Layout>
      <Container maxW="container.lg">
        <Box w="100%" p={4}>
          <HStack>
            <div style={{ flex: 1 }}>
              <Heading as="h4" size="md">
                (md) In love with React & Next
              </Heading>
            </div>
            <div>
              <Image
                boxSize="150px"
                objectFit="cover"
                src="https://askbootstrap.com/preview/swiggiweb/img/popular2.png"
                alt="Dan Abramov"
              />
            </div>
          </HStack>
        </Box>
      </Container>
    </Layout>
  );
};

export default ProductDetail;
