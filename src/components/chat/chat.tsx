import { Fragment, RefObject, useEffect, useRef } from 'react';
import { ChatBubble } from './chat-bubble';
import { useChat } from '@ai-sdk/react';
import { initialMessages } from '@/lib/init-messages';
import GenerativeComponents from './generative';
import ErrorMsg from '../error-msg';
import { MemoizedMarkdown } from './memoized-md';

export default function Chat() {
  const { messages, status, error, reload } = useChat({
    id: 'chat',
    experimental_throttle: 50, // Throttle updates to prevent React errors
    initialMessages,
    onError(err) {
      console.error(err);
    },
  });

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isLoading =
    status === 'submitted' ||
    (status === 'streaming' &&
      messages[messages.length - 1].content.length < 1);

  useEffect(() => {
    if (status === 'ready') scrollToRef(lastMessageRef);
    if (isLoading) scrollToRef(loadingRef);
  }, [isLoading, messages, status]);

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
            {message.content.length > 1 && (
              <ChatBubble.AI ref={isLastMessage ? lastMessageRef : undefined}>
                <div className="prose prose-lg prose-strong:text-current prose-li:marker:text-current/70 prose-neutral text-current">
                  <MemoizedMarkdown id={message.id} content={message.content} />
                </div>
              </ChatBubble.AI>
            )}
            <GenerativeComponents chatStatus={status} {...{ message }} />
          </Fragment>
        );
      })}
      {isLoading && (
        <ChatBubble.AI ref={loadingRef}>
          <p className="animate-pulse">Thinking...</p>
        </ChatBubble.AI>
      )}
      {error && <ErrorMsg {...{ reload }} />}
    </div>
  );
}
