import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mctechfiji.s3.us-east-1.amazonaws.com",
        pathname: "/crumbcode/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
