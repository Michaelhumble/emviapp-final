import React, { Suspense, lazy, useState } from 'react';
import { SunshineButton } from './SunshineButton';

// Lazy load the chat window for performance
const SunshineWindow = lazy(() => 
  import('./SunshineWindow').then(module => ({ default: module.SunshineWindow }))
);

export const SunshineSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasUnreadMessages(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SunshineButton 
        onClick={handleOpenChat} 
        hasUnreadMessages={hasUnreadMessages}
      />
      
      <Suspense fallback={<div />}>
        <SunshineWindow 
          isOpen={isOpen} 
          onClose={handleCloseChat}
        />
      </Suspense>
    </>
  );
};