const intercept = require('intercept-stdout');

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

// Intercept in dev and prod
intercept(interceptStdout);

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'k.kakaocdn.net', '5gzoo.s3.ap-northeast-2.amazonaws.com'],
    deviceSizes: [360, 414, 480],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    formats: ['image/webp'],
  },
  webpack(config) {
    return config;
  },
};
