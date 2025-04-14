
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatSystem } from '@/components/chat/ChatSystem';

export const AIBookingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Chat with Little Sunshine AI"
        >
          <Sparkles size={24} />
        </Button>
      )}
      
      {isOpen && <ChatSystem onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AIBookingAssistant;
