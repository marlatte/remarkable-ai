import { Fragment, useEffect, useRef } from 'react';
import CollapsibleToolCall from '../tool-call';
import { ChatBubble } from './chat-bubble';
import { useChat } from '@ai-sdk/react';
import { initialMessages } from '@/lib/init-messages';
import TopScorers from '../generative-ui/top-scorers';
import LeagueTable from '../generative-ui/league-table';

export default function Chat() {
  const { messages, status } = useChat({
    id: 'chat',
    experimental_throttle: 50, // Throttle updates to prevent React errors
    initialMessages,
  });

  const lastMessageRef = useRef<HTMLDivElement>(null);

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
    <div className="mb-auto flex flex-1 flex-col gap-4">
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;

        return message.role === 'user' ? (
          <ChatBubble.User key={message.id}>
            <p className="text-lg leading-none">{message.content}</p>
          </ChatBubble.User>
        ) : (
          <Fragment key={`${message.id}`}>
            <ChatBubble.AI ref={isLastMessage ? lastMessageRef : undefined}>
              <p className="text-lg">{message.content}</p>
            </ChatBubble.AI>
            {message.parts?.map((part) => {
              if (part.type === 'tool-invocation' && status === 'ready') {
                const generativeComponents = [];
                const { state, toolName, args, toolCallId } =
                  part.toolInvocation;

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
      })}
      {isLoading && (
        <ChatBubble.AI>
          <p className="animate-pulse">Thinking...</p>
        </ChatBubble.AI>
      )}
    </div>
  );
}
