/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.api.np.km.playstation.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.api.np.km.playstation.net',
        // You can leave the pathname empty or use a wildcard pattern
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
