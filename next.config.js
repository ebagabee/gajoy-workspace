/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig;