import { useEffect } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import NProgress from "nprogress";

import { extendTheme } from "@chakra-ui/react";
import { analytics } from "@/utils/firebase";
import { useRouter } from "next/router";
import Router from "next/router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import "../styles/product.css";
import "../styles/horizontal.css";
import "@fontsource/source-sans-pro/400.css";
import "nprogress/nprogress.css";

const theme = extendTheme({
  fonts: {
    heading: "Source Sans Pro",
    body: "Source Sans Pro",
  },
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const routers = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const logEvent = (url) => {
        analytics().setCurrentScreen(url);
        analytics().logEvent("screen_view");
      };

      routers.events.on("routeChangeComplete", logEvent);
      logEvent(window.location.pathname);

      return () => {
        routers.events.off("routeChangeComplete", logEvent);
      };
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
