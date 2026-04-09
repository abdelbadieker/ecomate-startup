import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin(
  path.resolve(__dirname, './src/i18n/request.ts')
);

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
