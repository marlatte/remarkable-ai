'use client';

import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { RefObject, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { cn } from '@/lib/utils';

export default function ScrollButton({
  inputRef,
}: {
  inputRef: RefObject<HTMLDivElement | null>;
}) {
  const [showButton, setShowButton] = useState(false);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
    setShowButton(false);
  };

  const checkScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setShowButton(
      scrollPosition + windowHeight < documentHeight - 60 &&
        documentHeight !== windowHeight,
    );
  };

  const debouncedScroll = useRef(debounce(checkScroll, 100)).current;

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  return (
    <Button
      variant="outline"
      className={cn(
        'fixed bottom-4 left-[calc(50%-36px/2)] z-10 size-9 rounded-full shadow-md backdrop-blur-sm delay-0 duration-300 ease-in-out',
        {
          'pointer-events-none translate-y-20 opacity-0': !showButton,
          'translate-y-0 opacity-100': showButton,
        },
      )}
      onClick={scrollToInput}
      tabIndex={showButton ? 0 : -1}
    >
      <ArrowDown className="size-6" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
