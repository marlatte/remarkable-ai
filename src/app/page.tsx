'use client';

import { AICard, UserCard } from '@/components/chat-cards';
import LeagueTable from '@/components/generative-ui/league-table';
import TopScorers from '@/components/generative-ui/top-scorers';
import CollapsibleToolCall from '@/components/tool-call';
import UserInput from '@/components/user-input';
import { Message, useChat } from '@ai-sdk/react';
import { Fragment, useEffect, useRef } from 'react';

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

  // Auto-scroll to bottom when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (status === 'ready') {
      scrollToBottom();
    }
  }, [messages, status]);

  const isLoading = status === 'submitted';
  const premLogoSrc = 'https://media.api-sports.io/football/leagues/39.png';

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

                    if (state === 'result') {
                      switch (toolName) {
                        case 'getStandings':
                          {
                            const { response } = part.toolInvocation
                              .result as FootballApiStandings;

                            // API response includes a double-wrapped array
                            const { standings: standingsArray, season } =
                              response[0].league;
                            const [standings] = standingsArray;
                            generativeComponents.push({
                              name: 'getStandings',
                              value: <LeagueTable {...{ standings, season }} />,
                            });
                          }
                          break;

                        case 'getTopScorers':
                          {
                            const { response: topScorers, parameters } = part
                              .toolInvocation.result as FootballApiTopScorers;
                            const season = Number(parameters.season);

                            generativeComponents.push({
                              name: 'getTopScorers',
                              value: (
                                <TopScorers
                                  {...{ season, topScorers, premLogoSrc }}
                                />
                              ),
                            });
                          }
                          break;
                      }
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
      <div ref={messagesEndRef} />
      <UserInput {...{ initialMessages }} />
      <div className="mt-1 mb-3 text-center text-sm text-neutral-500">
        Data available for English Premier League seasons 2021-2023
      </div>
    </div>
  );
}
