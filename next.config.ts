/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // ✅ TypeScript errors ignored
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint warnings ignored  
  },
}

module.exports = nextConfig
