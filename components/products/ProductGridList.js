import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ProductItemCard from "./ProductItemCard";

const ProductGridList = ({ products }) => {
  return (
    <React.Fragment>
      <SimpleGrid minChildWidth="250px" spacing="10px">
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
