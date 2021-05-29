import React from "react";
import Header from "../header/Header";
import { useCurrentUser, useOwnShop } from "@/hooks/index";

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
    </React.Fragment>
  );
};

export default Layout;