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
      {
        protocol: "https",
        hostname: "assets.website-files.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
}

export default nextConfig
