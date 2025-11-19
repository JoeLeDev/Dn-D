import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readonlydemo.vendure.io",
        pathname: "/assets/**",
      },
    ],
  },
}

export default nextConfig
