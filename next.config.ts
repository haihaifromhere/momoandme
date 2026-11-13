import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Personal keepsake box: avoid Cache Components blocking overlays on unlock. */
  cacheComponents: false,
  // Allow phone preview through Cloudflare quick tunnels + LAN.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "hobby-mar-cartoons-abstracts.trycloudflare.com",
    "10.0.0.231",
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
