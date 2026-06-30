import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // OneDrive sync breaks Turbopack's file-system cache (ENOENT / SST errors)
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
