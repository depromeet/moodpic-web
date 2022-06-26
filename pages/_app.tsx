import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import theme from '@/styles/theme';
import { queryClient } from '@/shared/utils/queryClient';
import { CommonAppLayout } from '@/components/Common';
import metaImage from '/public/images/meta.png';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{'오지즁'}</title>
        <meta name="description" content={'오지즁오지즁오지즁'} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={'오지쥬'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={'https://11th-5team-fe.vercel.app/'} />
        <meta property="og:image" content={metaImage.src} />
        <meta property="og:article:author" content="오지즁" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <CommonAppLayout>
              <Component {...pageProps} />
            </CommonAppLayout>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
