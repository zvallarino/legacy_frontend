/** @type {import('next').NextConfig} */
const nextConfig = {
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