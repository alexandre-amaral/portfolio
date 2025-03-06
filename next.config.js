/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  trailingSlash: true,
};

module.exports = nextConfig; 