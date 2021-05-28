import React from "react";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Layout;
