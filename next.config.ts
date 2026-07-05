import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so a stray parent lockfile
  // doesn't get picked up during builds.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
