/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Mantenha isso
  images: {
    domains: ['via.placeholder.com'], // Domínios permitidos
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy para backend
      },
    ];
  },
};

export default nextConfig;