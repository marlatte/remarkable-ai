'use client';

import ScrollButton from '@/components/scroll-btn';
import UserInput from '@/components/chat/user-input';
import { useRef } from 'react';
import Chat from '@/components/chat/chat';

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-2">
      {inputRef && <ScrollButton {...{ inputRef }} />}
      <Chat />
      <UserInput {...{ inputRef }} />
      <div className="mt-1 mb-3 text-center text-sm text-neutral-500">
        Data available for English Premier League seasons 2021-2023
      </div>
    </div>
  );
}
