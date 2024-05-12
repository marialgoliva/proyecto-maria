/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // deshabilitar la minimización en producción
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
};

export default nextConfig;
