import React from "react";
import Head from 'next/head';
import ProductDetailHeader from "../header/ProductHeader";
import { useCurrentUser, useOwnShop } from "@/hooks/index";

const ProductDetailLayout = ({ children, productName }) => {
  const [user] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  return (
    <React.Fragment>
      <Head>
        <meta name="theme-color" content="#fdc830" />
      </Head>
      <ProductDetailHeader
        productName={productName}
        isAuth={Object.keys(user || {}).length > 1 ? true : false}
        shop={shop}
      />
      {children}
    </React.Fragment>
  );
};

export default ProductDetailLayout;
