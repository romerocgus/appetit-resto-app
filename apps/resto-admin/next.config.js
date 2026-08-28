import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    rootParams: true,
  },
  images: {
    //TODO: REPLACE FOR REAL IMAGE URL LINKS
    remotePatterns: [
      new URL('https://imageurl.com/**'),
      new URL('https://rczrmiqogjyibescdwwt.supabase.co/**'),
    ],
  },
};

export default withNextIntl(nextConfig);
