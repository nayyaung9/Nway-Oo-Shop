import React from "react";
import Head from 'next/head'
import Header from "../header/Header";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  const [user] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  return (
    <React.Fragment>
      <Head>
        <meta name="theme-color" content="#f8b735" />
      </Head>
      <Header
        isAuth={Object.keys(user || {}).length > 1 ? true : false}
        shop={shop}
      />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
