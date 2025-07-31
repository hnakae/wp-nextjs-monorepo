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
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "http://localhost:8080/wp-admin/:path*",
      },
    ];
  },
};

export default nextConfig;
