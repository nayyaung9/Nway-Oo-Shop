import React from "react";
import Header from "../header/Header";
import { useCurrentUser, useOwnShop } from "@/hooks/index";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  const [user] = useCurrentUser();
  const [shop] = useOwnShop(user?._id);

  return (
    <React.Fragment>
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
