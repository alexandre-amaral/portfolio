/** @type {import('next').NextConfig} */

const repoName = 'portfolio';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Export as static HTML so GitHub Pages can serve it
  output: 'export',

  // Adjust paths for GitHub Pages deployment
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  // Avoid Next.js image optimization, which requires a server
  images: {
    unoptimized: true,
  },

  // Append trailing slash to each path (e.g., /about/ -> /about/index.html)
  trailingSlash: true,

  // Put the exported build in the 'out' folder
  distDir: 'out',
};

module.exports = nextConfig;
