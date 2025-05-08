import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Menu } from './menu';

export default function Header() {
  return (
    <header className="bg-background fixed top-0 z-10 flex h-16 w-full flex-wrap items-center justify-between p-3 shadow-sm">
      <Link
        href="/"
        className="ring-offset-ring group flex items-center gap-3 rounded-md px-3 py-1 text-center font-(family-name:--font-archivo) ring-offset-1 transition outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      >
        <span className="text-3xl leading-none font-bold">Remarkable AI</span>
        <Sparkles className="hidden opacity-0 transition group-hover:opacity-100 group-focus:opacity-100 sm:block" />
      </Link>
      <Menu />
    </header>
  );
}
