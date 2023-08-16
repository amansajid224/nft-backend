/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "/public",
  register: true,
  skipWaiting: false,
  runtimeCaching,
});
const config = {
  warn: false,
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },
  devIndicators: {
    warn: false,
  },
  
};
const nextConfig = withPWA(config);

module.exports = nextConfig;
