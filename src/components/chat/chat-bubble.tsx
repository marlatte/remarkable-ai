import { Ref } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

function UserCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="user-card animate-pop relative mr-2 ml-7 origin-bottom-right gap-1 self-end border-none bg-blue-500 p-3 text-white shadow-none">
      <CardHeader className="flex justify-end">
        <CardTitle>
          <div className="opacity-60">You</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

function AICard({
  children,
  ref,
  className,
}: {
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  className?: string | undefined;
}) {
  return (
    <Card
      className="ai-card animate-pop relative mr-7 origin-bottom-left scroll-m-16 gap-2 self-start border-none p-4 shadow-none"
      {...{ ref }}
    >
      <CardHeader>
        <CardTitle className="w-max">
          <div className="font-(family-name:--font-archivo) opacity-60">
            Premier League Analyst
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('p-0', className)}>{children}</CardContent>
    </Card>
  );
}

export function ChatBubble() {}

ChatBubble.User = UserCard;
ChatBubble.AI = AICard;
