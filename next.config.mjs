/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkzjtmmjnzmcwhsjqhxf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output : "export" this is used when we want to generate complete SSG website.
};

export default nextConfig;
