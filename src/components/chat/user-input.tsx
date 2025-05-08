import { useChat } from '@ai-sdk/react';
import { Button } from '../ui/button';
import { SendHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { initialMessages } from '@/lib/init-messages';
import { RefObject } from 'react';

export default function UserInput({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const { input, handleInputChange, handleSubmit, status } = useChat({
    id: 'chat',
    initialMessages,
  });
  const isLoading = status === 'submitted';

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-1">
      <Input
        className="scroll-m-4 placeholder-shown:text-ellipsis"
        value={input}
        placeholder="Ask about Premier League teams, standings, or fixtures..."
        onChange={handleInputChange}
        disabled={isLoading}
        onFocus={scrollToInput}
        ref={inputRef}
      />
      <Button
        variant="outline"
        className="group from-background to-muted hover:text-background size-auto bg-linear-to-br text-lg font-semibold transition hover:from-yellow-300 hover:to-pink-500 focus-visible:ring-pink-400 dark:focus-visible:ring-pink-500"
        type="submit"
      >
        <SendHorizontal className="size-4" />
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}
