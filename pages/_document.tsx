import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
          <link
            rel="stylesheet"
            as="style"
            crossOrigin=""
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          <meta
            name="description"
            key="description"
            content="당신의 해소하고 싶은 감정들을 기록하고 공유해보세요. 마음이 한결 편안해질거예요!"
          />
          <meta name="theme-color" content="#121212" />
          {/* TODO: 임시 아이콘 */}
          <link rel="apple-touch-icon" href="/favicon.png" />
          {/* TODO: 임시 아이콘 */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
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
