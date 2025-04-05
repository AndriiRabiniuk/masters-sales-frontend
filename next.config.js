/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  
  // Silence API error details in production builds
  onDemandEntries: {
    // Don't show the error overlay in development
    pagesBufferLength: 2,
  },
  
  // Configure how API and runtime errors are displayed
  devIndicators: {
    buildActivity: true,
    // Disable the "unhandled error" popup in development mode
    autoPrerender: false,
  },
};

module.exports = nextConfig; 