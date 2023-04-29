import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Script from 'next/script';
//
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
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
          {/* 폰트 CSS CDN */}

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          <style jsx global>{`
            body {
              font-family: 'Pretendard', sans-serif;
            }
          `}</style>
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer,drawing&autoload=false`}
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}
