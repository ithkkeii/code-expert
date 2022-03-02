/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: 'https://codeexpert.dev',
  webpack: (config) => {
    config.watchOptions.poll = 300;

    return config;
  },
};

module.exports = nextConfig;
