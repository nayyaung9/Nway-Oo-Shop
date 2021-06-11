import React from "react";
import ProductDetailHeader from "../header/ProductHeader";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import Footer from "../footer/Footer";

const ProductDetailLayout = ({ children, productName }) => {
  const [user] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  return (
    <React.Fragment>
      <ProductDetailHeader
        productName={productName}
        isAuth={Object.keys(user || {}).length > 1 ? true : false}
        shop={shop}
      />
        <div style={{ minHeight: 64 }} />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetailLayout;
