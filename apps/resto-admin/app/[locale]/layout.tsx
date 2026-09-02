import '@/app/globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@teispace/next-themes';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter, Outfit } from 'next/font/google';
import PageSettings from '../ui/page-settings';

const outfitHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Appetit Resto Manager',
    default: 'Appetit Resto Manager',
  },
  description: 'Appetit Resto Manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(outfitHeading.variable)}
      suppressHydrationWarning
    >
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storage="hybrid"
        >
          <NextIntlClientProvider>
            <TooltipProvider>
              <PageSettings />
              {children}
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
