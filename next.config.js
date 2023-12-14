/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'image.api.playstation.com',
      'agst.prod.dl.playstation.net',
      'image.api.np.km.playstation.net',
      'static-resource.np.community.playstation.net',
      // Add any other domains you need here
    ],
  },
}

module.exports = nextConfig
