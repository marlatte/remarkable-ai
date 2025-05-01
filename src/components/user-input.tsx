import { Message, useChat } from '@ai-sdk/react';

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
    <form onSubmit={handleSubmit}>
      <input
        className="mt-2 w-full rounded border border-zinc-300 p-2 shadow-xl placeholder-shown:text-ellipsis dark:border-zinc-800 dark:bg-zinc-900"
        value={input}
        placeholder="Ask about Premier League teams, standings, or fixtures..."
        onChange={handleInputChange}
        disabled={isLoading}
      />
    </form>
  );
}
