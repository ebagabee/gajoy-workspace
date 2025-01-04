/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Para desenvolvimento, você pode querer mudar para false
    ignoreBuildErrors: true,
  },
  eslint: {
    // Para desenvolvimento, você pode querer mudar para false
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['github.com'],
  },
  experimental: {
    // Desabilite isso se estiver tendo problemas com o Turbopack
    turbo: true,
  }
};

module.exports = nextConfig;