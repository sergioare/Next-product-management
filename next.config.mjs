/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.cloudlabs.us', 'cdn.dummyjson.com', 'firebasestorage.googleapis.com'],
      },
      trailingSlash: true,
};

export default nextConfig;
