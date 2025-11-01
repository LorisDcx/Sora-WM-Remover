/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'replicate.delivery'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
