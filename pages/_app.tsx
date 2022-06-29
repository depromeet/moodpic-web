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

if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('service worker registration successful');
      })
      .catch((err) => {
        console.warn('service worker registration failed', err.message);
      });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>나만의 감정 기록 보관소, moodpic</title>
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
