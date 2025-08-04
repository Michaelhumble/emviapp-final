import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ChatToggleButton } from './ChatToggleButton';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatSystem = lazy(() => import('./ChatSystem').then(module => ({ default: module.ChatSystem })));

export const LazyChatSystem = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // CRITICAL: Load chat only after DOMContentLoaded + 3 seconds for performance
    const loadChat = () => {
      setTimeout(() => {
        setShouldLoad(true);
      }, 3000);
    };

    if (document.readyState === 'complete') {
      loadChat();
    } else {
      window.addEventListener('load', loadChat);
      return () => window.removeEventListener('load', loadChat);
    }

    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000); // Fallback

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