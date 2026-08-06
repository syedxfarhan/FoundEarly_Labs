import type { NextConfig } from "next";

/**
 * Offline-first presentation constraint (docs/01_PROJECT_SSOT.md §8.1):
 * static export is enabled so the core walkthrough can run from a local build
 * without a network dependency. Revisit only with a DECISIONS.md entry
 * (e.g. Roadmap Phase 5 hosted leave-behind).
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
