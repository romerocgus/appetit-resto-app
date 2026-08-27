import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from './ui/theme-toggle';

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
        >
          <TooltipProvider>
            <ThemeToggle />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
