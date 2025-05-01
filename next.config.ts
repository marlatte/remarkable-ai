import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://media.api-sports.io/football/**')],
  },
};

export default nextConfig;
