import React from "react";
import Header from "../header/Header";
import { useCurrentUser } from "@/hooks/index";

const Layout = ({ children }) => {
  const [user] = useCurrentUser();
  return (
    <React.Fragment>
      <Header isAuth={Object.keys(user || {}).length > 1 ? true : false} />
      {children}
    </React.Fragment>
  );
};

export default Layout;
