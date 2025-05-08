import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { MenuIcon } from 'lucide-react';
import ThemeSwitcher from './theme-switcher';

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Menu</span>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <ThemeSwitcher />
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 px-4">
          <Link className="hover:text-muted-foreground text-xl" href="/">
            Home
          </Link>
          <Link className="hover:text-muted-foreground text-xl" href="/chat">
            Chat
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
