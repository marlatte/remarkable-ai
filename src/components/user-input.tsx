import { Message, useChat } from '@ai-sdk/react';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';
import { Input } from './ui/input';

export default function UserInput({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const { input, handleInputChange, handleSubmit, status } = useChat({
    id: 'chat',
    initialMessages,
  });
  const isLoading = status === 'submitted';

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-1">
      <Input
        className="placeholder-shown:text-ellipsis"
        value={input}
        placeholder="Ask about Premier League teams, standings, or fixtures..."
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <Button variant="outline" className="size-auto" type="submit">
        <SendHorizonal className="size-4" />
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}
