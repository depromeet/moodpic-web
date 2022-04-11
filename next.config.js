/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     {
    //       loader: "@svgr/webpack",
    //       options: {
    //         svgoConfig: {
    //           plugins: [
    //             {
    //               // Enable figma's wrong mask-type attribute work
    //               removeRasterImages: false,
    //               removeStyleElement: false,
    //               removeUnknownsAndDefaults: false,
    //               // Enable svgr's svg to fill the size
    //               removeViewBox: false,
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   ],
    // });
    // // 절대경로
    // config.resolve.modules.push(__dirname);
    return config;
  },
};
