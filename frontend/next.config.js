/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   newNextLinkBehavior: false,
  // },
  rewrites: async () => [
    {
      source: "/v1/:path*",
      destination: "http://localhost:5000/api/:path*",
    },
    {
      source: "/v1/static/:path*",
      destination: "http://localhost:5000/:path*",
    },
  ],
};

module.exports = nextConfig;
