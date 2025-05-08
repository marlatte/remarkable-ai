import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-2 pb-24 font-(family-name:--font-archivo) text-pretty sm:pb-40">
      <h1 className="animate-pulse text-center text-5xl font-semibold">
        Welcome
      </h1>
      <div className="border-muted-foreground max-w-sm border-l-2 pl-2">
        <p className="text-xl">
          Breaking news out of London: <br />
          <strong>Coach Lasso</strong> has taken a new job as an analyst for the
          league he as come to love.
        </p>
        <p className="mt-4 text-sm">
          Sadly, they still don&apos;t trust Americans, so he&apos;s starting on
          probation, and he&apos;s a bit behind the times.{' '}
          <strong>He only has access to data from 2021-2023.</strong> But gosh
          darnit if he ain&apos;t gonna try his best to deliver!
        </p>
      </div>
      <Button
        asChild
        className="group from-foreground to-muted-foreground bg-linear-to-br text-xl shadow-lg hover:from-yellow-300 hover:to-pink-500 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-700"
        size="lg"
      >
        <Link href="/chat">
          <span>Chat with Coach</span>
          <ArrowRight className="size-5 transition group-hover:translate-x-2" />
        </Link>
      </Button>
    </div>
  );
}
