'use client';

import { AICard, UserCard } from '@/components/chat-cards';
import LeagueTable from '@/components/generative-ui/league-table';
import TopScorers from '@/components/generative-ui/top-scorers';
import ScrollButton from '@/components/scroll-btn';
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
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (status === 'ready') {
      scrollToLastMessage();
    }
  }, [messages, status]);

  const isLoading = status === 'submitted';
  const premLogoSrc = 'https://media.api-sports.io/football/leagues/39.png';

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2">
      {messagesEndRef && <ScrollButton {...{ messagesEndRef }} />}
      <div className="mb-auto flex flex-1 flex-col gap-4">
        {messages.map((message, index) => {
          if (message.role === 'user') {
            return (
              <UserCard key={message.id}>
                <p className="text-lg leading-none">{message.content}</p>
              </UserCard>
            );
          } else {
            return (
              <Fragment key={`${message.id}`}>
                <AICard
                  ref={
                    index === messages.length - 1 ? lastMessageRef : undefined
                  }
                >
                  <p className="text-lg">{message.content}</p>
                </AICard>
                {message.parts?.map((part) => {
                  if (part.type === 'tool-invocation') {
                    const generativeComponents = [];
                    const { state, toolName, args, toolCallId } =
                      part.toolInvocation;

                    if (state === 'result' && status === 'ready') {
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
                        key={`${toolCallId}-${toolName}-${JSON.stringify(args)}`}
                      >
                        <CollapsibleToolCall {...{ part }} />
                        {generativeComponents.map(({ name, value }) => (
                          <Fragment key={name}>{value}</Fragment>
                        ))}
                      </Fragment>
                    );
                  }
                })}
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
