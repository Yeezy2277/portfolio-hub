import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Live-screenshot service + GitHub-hosted preview images.
    remotePatterns: [
      { protocol: "https", hostname: "s.wordpress.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
