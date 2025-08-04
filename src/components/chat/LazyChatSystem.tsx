import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ChatToggleButton } from './ChatToggleButton';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatSystem = lazy(() => import('./ChatSystem').then(module => ({ default: module.ChatSystem })));

export const LazyChatSystem = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load chat after 3 seconds or on user interaction
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3000);

    const handleUserInteraction = () => {
      setShouldLoad(true);
      clearTimeout(timer);
    };

    // Listen for user interactions
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handleToggleChat = () => {
    setShouldLoad(true);
    setIsOpen(!isOpen);
  };

  if (!shouldLoad) {
    return (
      <ChatToggleButton 
        isOpen={false} 
        onClick={handleToggleChat}
      />
    );
  }

  return (
    <Suspense fallback={
      <ChatToggleButton 
        isOpen={false} 
        onClick={handleToggleChat}
      />
    }>
      <ChatSystem />
    </Suspense>
  );
};