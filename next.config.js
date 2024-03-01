/** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//         domains: ['images.unsplash.com', 'res.cloudinary.com'],
//     },
// }

// module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
       {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },]
    },
  }