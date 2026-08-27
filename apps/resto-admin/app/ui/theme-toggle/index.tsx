'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const themeMode = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="absolute top-5 right-6 z-10"
      onClick={() => setTheme(themeMode)}
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
