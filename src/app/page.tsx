'use client';

import { AICard, UserCard } from '@/components/chat-cards';
import { LeagueTable } from '@/components/league-table';
import CollapsibleToolCall from '@/components/tool-call';
import UserInput from '@/components/user-input';
import { Message, useChat } from '@ai-sdk/react';
import { Fragment } from 'react';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content:
      "Hello! I'm your Premier League analyst for the 2021-2023 seasons. Ask me anything about teams, standings, fixtures, or players from those seasons!",
  },
];

export default function Chat() {
  const { messages, status } = useChat({
    id: 'chat',
    experimental_throttle: 50, // Throttle updates to prevent React errors
    initialMessages,
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
              <Fragment key={`${message.id}`}>
                {message.parts?.map((part) => {
                  if (part.type === 'tool-invocation') {
                    const generativeComponents = [];
                    const { state, toolName, args } = part.toolInvocation;

                    if (state === 'result' && toolName === 'getStandings') {
                      const { response } = part.toolInvocation
                        .result as FootballApiResult;

                      // API response includes a double-wrapped array
                      const { standings: standingsArray, season } =
                        response[0].league;
                      const [standings] = standingsArray;
                      generativeComponents.push({
                        name: 'League Table',
                        value: <LeagueTable {...{ standings, season }} />,
                      });
                    }
                    return (
                      <Fragment
                        key={`${message.id}-${toolName}-${JSON.stringify(args)}`}
                      >
                        <CollapsibleToolCall {...{ part }} />
                        {generativeComponents.map(({ name, value }) => (
                          <Fragment key={name}>{value}</Fragment>
                        ))}
                      </Fragment>
                    );
                  }
                })}
                <AICard>
                  <p className="text-lg">{message.content}</p>
                </AICard>
              </Fragment>
            );
          }
        })}
      </div>
      {isLoading && (
        <AICard>
          <p className="animate-pulse">Thinking...</p>
        </AICard>
      )}
      <UserInput {...{ initialMessages }} />
      <div className="mt-1 mb-3 text-center text-sm text-neutral-500">
        Data available for English Premier League seasons 2021-2023
      </div>
    </div>
  );
}
