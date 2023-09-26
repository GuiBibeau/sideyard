/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "vercel.com",
      "tailwindui.com",
      "us-east-1.storage.xata.sh",
      "img.clerk.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/guibibeau/sideyard",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
