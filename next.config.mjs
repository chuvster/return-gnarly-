/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  allowedDevOrigins: ['*.daytona.work'],
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-left',
  },
};

export default nextConfig;
