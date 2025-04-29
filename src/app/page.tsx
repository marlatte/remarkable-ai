'use client';

import { AICard, UserCard } from '@/components/chat-cards';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    maxSteps: 5,
    experimental_throttle: 50, // Throttle updates to prevent React errors
    initialMessages: [
      {
        id: 'init',
        role: 'assistant',
        content:
          "Hello! I'm your Premier League analyst for the 2021-2023 seasons. Ask me anything about teams, standings, fixtures, or players from those seasons!",
      },
    ],
  });

  const isLoading = status === 'submitted';

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2">
      <div className="mb-auto flex flex-1 flex-col gap-4">
        {messages.map((message) => {
          if (message.role === 'user') {
            return (
              <UserCard key={message.id}>
                <p className="text-lg leading-none">{message.content}</p>
              </UserCard>
            );
          } else {
            return (
              <AICard key={`${message.id}`}>
                <p className="text-lg">{message.content}</p>
                <div>
                  {message.parts?.map((part, i) => {
                    switch (part.type) {
                      case 'tool-invocation':
                        return (
                          <pre
                            key={`${message.id}-${i}`}
                            className="whitespace-break-spaces"
                          >
                            {JSON.stringify(part.toolInvocation, null, 2)}
                          </pre>
                        );
                    }
                  })}
                </div>
              </AICard>
            );
          }
        })}
      </div>
      {isLoading && (
        <AICard>
          <p className="animate-pulse">Thinking...</p>
        </AICard>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="mt-2 w-full rounded border border-zinc-300 p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          value={input}
          placeholder="Ask about Premier League teams, standings, or fixtures..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
      <div className="mt-1 mb-3 text-center text-sm text-neutral-500">
        Data available for English Premier League seasons 2021-2023
      </div>
    </div>
  );
}
