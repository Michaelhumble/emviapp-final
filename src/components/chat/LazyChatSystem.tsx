import React, { useState, Suspense, lazy } from 'react';
import { SunshineButton } from './SunshineButton';

// Lazy load the main chat component for better performance
const SunshineChat = lazy(() => 
  import('./SunshineChat').then(module => ({ default: module.SunshineChat }))
);

export const LazyChatSystem = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <SunshineButton 
        onClick={handleToggleChat}
        hasUnreadMessages={false}
      />
      
      <Suspense fallback={null}>
        <SunshineChat 
          isOpen={isChatOpen}
          onClose={handleCloseChat}
        />
      </Suspense>
    </>
  );
};

export default LazyChatSystem;