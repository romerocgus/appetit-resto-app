'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@teispace/next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const themeMode = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="mr-1"
      onClick={() => setTheme(themeMode)}
    >
      <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
