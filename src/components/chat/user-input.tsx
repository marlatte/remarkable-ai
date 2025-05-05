import { useChat } from '@ai-sdk/react';
import { Button } from '../ui/button';
import { SendHorizontal } from 'lucide-react';
import { Input } from '../ui/input';
import { initialMessages } from '@/lib/init-messages';

export default function UserInput() {
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
        <SendHorizontal className="size-4" />
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}
