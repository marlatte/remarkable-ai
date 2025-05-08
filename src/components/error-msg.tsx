'use client';

import Link from 'next/link';
import { ChatBubble } from './chat/chat-bubble';
import { Button } from './ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { RotateCcw } from 'lucide-react';

export default function ErrorMsg({
  reload,
}: {
  reload: () => Promise<string | null | undefined>;
}) {
  return (
    <ChatBubble.AI className="flex flex-col gap-6 font-(family-name:--font-archivo)">
      <div className="text-center">
        <p className="my-3 text-5xl">&#129300;</p>
        <p className="text-3xl font-bold">Well shoot...</p>
        <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
          Something went sideways!
        </p>
      </div>
      <div className="flex max-w-sm flex-col gap-4 dark:text-white">
        <p>
          Don&apos;t worry, it happens to the best of us. Even Coach Beard once
          lost a game of chess to a chipmunk.&nbsp;
          <span className="text-2xl leading-none">&#128063;</span>
        </p>
        <p>
          Give it another go, and if the problem sticks around, holler at your
          friendly neighborhood tech support (i.e.&nbsp;
          <Link
            href="https://github.com/marlatte/remarkable-ai"
            target="_blank"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-500 dark:text-blue-300 hover:dark:text-blue-400"
          >
            drop me an issue
          </Link>
          ).
        </p>
        <p>Believe in believe!</p>
      </div>
      <div className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-auto"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset chat
              </Button>
            </TooltipTrigger>
            <TooltipContent
              colorClasses="bg-red-300 fill-red-300 text-foreground dark:bg-red-900 dark:fill-red-900"
              side="right"
            >
              <p className="text-sm">
                <strong>Warning</strong>: Erases chat history!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          type="button"
          onClick={() => reload()}
          className="group from-foreground to-muted-foreground bg-linear-to-br text-lg font-semibold shadow-lg transition hover:from-yellow-300 hover:to-pink-500 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-700"
          size="lg"
        >
          <span>Retry</span>
          <RotateCcw className="rotate-45 transition duration-500 group-hover:-rotate-[360deg]" />
        </Button>
      </div>
    </ChatBubble.AI>
  );
}
