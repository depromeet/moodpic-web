import '@/styles/globals.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import theme from '@/styles/theme';
import { queryClient } from '@/shared/utils/queryClient';
import { CommonAppLayout } from '@/components/Common';
import * as gtag from '@/lib/gtag';

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>나만의 감정 기록 보관소, moodpic</title>
        <meta
          key="og:description"
          property="og:description"
          content="당신의 해소하고 싶은 감정들을 기록하고 공유해보세요. 마음이 한결 편안해질거예요!"
        />
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
