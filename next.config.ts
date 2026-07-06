import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so a stray parent lockfile
  // doesn't get picked up during builds.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Sanity image CDN (blog cover images, author avatars, body images).
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
