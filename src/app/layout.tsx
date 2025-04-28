import type { Metadata } from 'next';
import { Geist, Geist_Mono, Honk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const honk = Honk({
  variable: '--font-honk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Basic AI chat app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${honk.variable} flex h-dvh flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-1 flex-col px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
