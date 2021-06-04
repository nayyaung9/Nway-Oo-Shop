import React from "react";
import { SimpleGrid, Heading } from "@chakra-ui/react";
import ProductItemCard from "./ProductItemCard";
import { theme } from "@/utils/theme";

const ProductGridList = ({ products, productListName }) => {
  return (
    <React.Fragment>
      <Heading as="h4" color={theme.secondaryColor} size="md" mb="3">
        {productListName ? productListName : "Just For You"}
      </Heading>
      <SimpleGrid columns={[2, null, 4]} spacing="10px">
        {products && products.length === 0 && <div>No Products</div>}
        {Array.isArray(products) &&
          products.map((product, i) => (
            <ProductItemCard product={product} key={i} />
          ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default ProductGridList;
