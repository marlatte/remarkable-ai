import Link from 'next/link';
import ThemeSwitcher from './theme-switcher';

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between p-4">
      <Link
        href="/"
        className="ring-offset-ring flex rounded-md bg-neutral-400 px-3 pb-1 text-center font-(family-name:--font-honk) ring-offset-1 transition outline-none hover:bg-neutral-400/80 focus-visible:ring-2 focus-visible:ring-pink-500 min-[385px]:pb-1.5 md:pb-2 dark:bg-neutral-700 dark:hover:bg-neutral-700/80"
      >
        <span className="text-4xl leading-9 font-bold min-[385px]:text-5xl min-[385px]:leading-12 md:text-6xl md:leading-14">
          Remarkable AI
        </span>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
