/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
