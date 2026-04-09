import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkoxruaonaedhqixgbud.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    // Optimization for faster builds and better runtime performance
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  // Ensure we are using the latest React features correctly
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
