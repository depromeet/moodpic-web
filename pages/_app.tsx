import "@styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />)
      </ThemeProvider>
    </>
  );
}

export default MyApp;
