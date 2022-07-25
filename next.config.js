/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        X_API_KEY: process.env.X_API_KEY,
    },
    nextConfig: {
        reactStrictMode: true,
        swcMinify: true,
    },
}
