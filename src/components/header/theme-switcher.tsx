'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="group from-background to-muted hover:text-background bg-linear-to-br text-lg font-semibold transition hover:from-yellow-300 hover:to-pink-500 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}
