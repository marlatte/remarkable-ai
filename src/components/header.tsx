import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';

export default function Header() {
  return (
    <header className="bg-background fixed top-0 z-10 flex h-16 w-full flex-wrap items-center justify-between p-3 shadow-sm">
      <Link
        href="/"
        className="ring-offset-ring hover:bg-accent flex rounded-md px-3 py-1 text-center font-(family-name:--font-archivo) ring-offset-1 transition outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      >
        <span className="text-3xl leading-none font-bold">Remarkable AI</span>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
