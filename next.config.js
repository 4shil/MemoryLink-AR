/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations for mobile AR
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          mindAR: {
            test: /mind-ar/,
            name: "mind-ar",
            priority: 10,
          },
          three: {
            test: /three/,
            name: "three",
            priority: 9,
          },
        },
      },
    };
    return config;
  },

  // Headers for camera/media access
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=()",
          },
        ],
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["three", "mind-ar"],
  },
};

module.exports = nextConfig;
