/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'headless.local',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
