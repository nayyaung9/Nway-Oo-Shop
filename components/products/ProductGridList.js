import React from "react";
import { SimpleGrid, Heading } from "@chakra-ui/react";
import ProductItemCard from "./ProductItemCard";

const ProductGridList = ({ products, productListName }) => {
  return (
    <React.Fragment>
      <Heading as="h4" color="gray.600" size="md" mb="3">
        {productListName ? productListName : 'Just For You'}
      </Heading>
      <SimpleGrid columns={2} minChildWidth="250px" spacing="10px">
        {products && products.length === 0 && <div>No Products</div>}
        {Array.isArray(products) &&
          products.length > 1 &&
          products.map((product, i) => (
            <ProductItemCard product={product} key={i} />
          ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default ProductGridList;
