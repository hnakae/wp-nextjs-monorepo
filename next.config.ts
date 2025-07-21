import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint checks during `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript errors during `next build`
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
