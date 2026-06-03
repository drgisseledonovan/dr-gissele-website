import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /work-with-me was the original engagement page; renamed to /programs.
      // Cover all locale-prefixed and unprefixed variants.
      {
        source: "/work-with-me",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/es/work-with-me",
        destination: "/es/programs",
        permanent: true,
      },
      {
        source: "/en/work-with-me",
        destination: "/en/programs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
