/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
        },
        {
          protocol: 'https',
          hostname: 'b.thumbs.redditmedia.com',
        },
        {
          protocol: 'https',
          hostname: 'www.redditstatic.com',
        },
      ],
    },
  }
  
  module.exports = nextConfig;