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
import OgImage from 'public/images/og_image.png';
import Script from 'next/script';

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
          content="당신의 해소하고 싶은 감정들을 무드픽에 기록하고 공유해보세요. 마음이 한결 편안해질거예요!"
        />
        <meta property="og:image" content={OgImage.src} />
        <meta name="appleid-signin-client-id" content="kr.moodpic" />
        <meta name="appleid-signin-scope" content="name email" />
        <meta name="appleid-signin-redirect-uri" content="https://www.moodpic.kr/oauth/callback/apple" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        type="text/javascript"
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
