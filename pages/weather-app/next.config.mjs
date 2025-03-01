
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Adding custom font handling
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

export default nextConfig;
