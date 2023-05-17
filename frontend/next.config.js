/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/v1/:path*",
      destination: "https://NODE-YAD:5000/api/:path*",
    },
    {
      source: "/v1/static/:path*",
      destination: "https://NODE-YAD:5000/:path*",
    },
  ],
};

module.exports = nextConfig;
