import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i-glooklima.it" },
      { protocol: "https", hostname: "i-glooadvance.com" },
    ],
  },
};

export default nextConfig;
