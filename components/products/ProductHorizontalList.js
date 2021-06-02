import React from "react";
import ProductItemCard from "./ProductItemCard";
import { Heading } from "@chakra-ui/react";
import { useCategoryProducts } from "@/hooks/index";
import { theme } from "@/utils/theme";

const ProductHorizontalList = ({ title, category }) => {
  const products = useCategoryProducts(category);

  return (
    <React.Fragment>
      <Heading as="h4" color={theme.secondaryColor} size="md" mb="4">
        {title ? title : "Just For You"}
      </Heading>
      <div className="scrolling-wrapper">
        {products &&
          products.map((product, i) => (
            <ProductItemCard key={i} product={product} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default ProductHorizontalList;
