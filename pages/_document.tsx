import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '@/lib/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="naver-site-verification" content="c1091fb630dd7c1716d30cdae621cbbd3280f6cb" />
          <meta name="google-site-verification" content="xBuwjpCpK3qNwoG-XCrharPbtg72D75rxiTbUtGsDug" />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin=""
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          <meta
            name="description"
            key="description"
            content="당신의 해소하고 싶은 감정들을 무드픽에 기록하고 공유해보세요. 마음이 한결 편안해질거예요!"
          />
          <meta name="theme-color" content="#121212" />
          {/* 주소창 등의 웹 브라우저 UI를 표시하지 않기  */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* 상태 바의 스타일을 지정  */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#121212" />
          {/* 홈 화면에서 표시되는 앱 이름을 지정  */}
          <meta name="application-name" content="moodpic" />
          <meta name="apple-mobile-web-app-title" content="moodpic" />
          {/* 홈 화면에서 표시되는 앱 아이콘을 지정  */}
          <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link
            rel="apple-touch-startup-image"
            href="/images/splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/splash.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/splash.png"
            media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          {/* TODO: 임시 아이콘 변경 */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <div id="root-bottomsheet" />
          <div id="dropdown-menu" />
          <div id="root-dialog" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
