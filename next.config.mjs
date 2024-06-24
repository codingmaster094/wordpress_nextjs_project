/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'http',             
        //         hostname: 'headless.local',   
        //         port: '',
        //         pathname: '/**',
        //     }
        // ],
        // ************ Live  ******************
        remotePatterns: [
            {
                protocol: 'https',             
                hostname: 'nextjs.blog-s.de',   
                port: '',
                pathname: '/**',
            }
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN,
      },
};

export default nextConfig;
