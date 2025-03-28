import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NEXT_PUBLIC_STRICT_MODE === 'true',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'lib', 'src', 'app']
  }
};

export default nextConfig;
