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
