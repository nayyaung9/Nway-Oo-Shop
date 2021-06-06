import React from "react";
import ProductItemCard from "./ProductItemCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { theme } from "@/utils/theme";

const RelatedProductList = ({ title, shopProducts }) => {
  return (
    <React.Fragment>
      <Heading as="h4" color={theme.secondaryColor} size="md" mb="4">
        {title ? title : "Just For You"}
      </Heading>

      <SimpleGrid columns={[2, null, 4]} spacing="10px">
        {shopProducts && shopProducts.length === 0 && <div>No Products</div>}
        {Array.isArray(shopProducts) &&
          shopProducts.map((product, i) => (
            <ProductItemCard product={product} key={i} />
          ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default RelatedProductList;
