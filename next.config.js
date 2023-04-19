/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// next.config.js 파일
module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  // CSS 모듈 활성화
  cssModules: true,
};
