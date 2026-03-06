import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://test.remarkt.nl https://www.remarkt.nl;",
          }
        ],
      },
    ];
  },
};

export default nextConfig;