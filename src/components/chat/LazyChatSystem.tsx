import React, { useState, Suspense, lazy } from 'react';
import { NewChatButton } from './NewChatButton';

// Lazy load the chat window for performance
const NewChatWindow = lazy(() => 
  import('./NewChatWindow').then(module => ({ default: module.NewChatWindow }))
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
      <NewChatButton 
        onClick={handleToggleChat}
        hasUnreadMessages={false}
      />
      
      <Suspense fallback={null}>
        <NewChatWindow 
          isOpen={isChatOpen}
          onClose={handleCloseChat}
        />
      </Suspense>
    </>
  );
};

export default LazyChatSystem;