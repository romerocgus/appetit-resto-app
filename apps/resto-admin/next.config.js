/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //TODO: REPLACE FOR REAL IMAGE URL LINKS
    remotePatterns: [
      new URL('https://imageurl.com/**'),
      new URL('https://rczrmiqogjyibescdwwt.supabase.co/**'),
    ],
  },
};

export default nextConfig;
