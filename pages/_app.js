import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
