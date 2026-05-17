import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const outfitHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appetit Resto Manager',
  description: 'Appetit Resto Manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(outfitHeading.variable)}>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
