import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // para que Next no meta el metadata en un <div hidden> (daba error de hidratacion con extensiones)
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
  },
};

export default nextConfig;
