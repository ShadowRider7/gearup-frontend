/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.outsideonline.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
