import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "datasetstorage.ams3.digitaloceanspaces.com",
      },
    ],
  },
}

export default nextConfig
