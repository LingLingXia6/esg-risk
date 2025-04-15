/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  // Add transpilePackages to handle problematic dependencies
  transpilePackages: ['@internationalized/date', '@ark-ui/react']
};

module.exports = nextConfig;
